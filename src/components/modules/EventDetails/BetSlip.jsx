import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCurrentBets } from "../../../hooks/currentBets";
import useBalance from "../../../hooks/balance";
import { useExposure } from "../../../hooks/exposure";
import { useOrderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setPrice,
  setRunnerId,
  setStake,
} from "../../../redux/features/events/eventSlice";
import { Settings } from "../../../api";
import toast from "react-hot-toast";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import { v4 as uuidv4 } from "uuid";
import {
  handleDecreasePrice,
  handleIncreasePrice,
} from "../../../utils/editBetSlipPrice";

const BetSlip = () => {
  const [isCashOut, setIsCashOut] = useState(false);
  const [profit, setProfit] = useState(0);
  const { eventTypeId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();
  const { refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { refetch: refetchBalance } = useBalance();
  const { refetch: refetchExposure } = useExposure(eventId);
  const { placeBetValues, price, stake } = useSelector((state) => state?.event);
  const [createOrder] = useOrderMutation();
  const buttonValues = localStorage.getItem("buttonValue");
  let parseButtonValues = [];
  if (buttonValues) {
    parseButtonValues = JSON.parse(buttonValues);
  }

  const [betDelay, setBetDelay] = useState("");

  useEffect(() => {
    dispatch(setPrice(parseFloat(placeBetValues?.price)));
    dispatch(
      setStake(
        placeBetValues?.totalSize > 0
          ? placeBetValues?.totalSize?.toFixed(2)
          : null
      )
    );
    setIsCashOut(placeBetValues?.cashout || false);
  }, [placeBetValues, dispatch]);

  let payload = {};
  if (price) {
    if (placeBetValues?.btype === "SPORTSBOOK") {
      payload = {
        price: price,
        side: placeBetValues?.side,
        selectionId: placeBetValues?.selectionId,
        btype: placeBetValues?.btype,
        placeName: placeBetValues?.placeName,
        eventTypeId: placeBetValues?.eventTypeId,
        betDelay: placeBetValues?.betDelay,
        marketId: placeBetValues?.marketId,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        totalSize: stake,
        isBettable: placeBetValues?.isBettable,
        eventId: placeBetValues?.eventId,
        cashout: isCashOut,
        b2c: Settings.b2c,
      };
    } else {
      payload = {
        betDelay: placeBetValues?.betDelay,
        btype: placeBetValues?.btype,
        eventTypeId: placeBetValues?.eventTypeId,
        marketId: placeBetValues?.marketId,
        price: price,
        selectionId: placeBetValues?.selectionId,
        side: placeBetValues?.side,
        totalSize: stake,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        isBettable: placeBetValues?.isBettable,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        eventId: placeBetValues?.eventId,
        cashout: isCashOut,
        b2c: Settings.b2c,
      };
    }
  }

  /* Handle bets */

  const handleOrderBets = async () => {
    setLoading(true);
    const payloadData = [
      {
        ...payload,
        site: Settings.siteUrl,
        nounce: uuidv4(),
        isbetDelay: Settings.betDelay,
      },
    ];
    let delay = 0;
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 3 &&
      placeBetValues?.name?.length === 2
    ) {
      delay = 9000;
    }
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 7 &&
      placeBetValues?.name?.length === 3
    ) {
      delay = 9000;
    } else {
      setBetDelay(placeBetValues?.betDelay);
      delay = Settings.betDelay ? placeBetValues?.betDelay * 1000 : 0;
    }

    // Introduce a delay before calling the API
    setTimeout(async () => {
      try {
        const res = await createOrder(payloadData).unwrap();
        if (res?.success) {
          setLoading(false);
          refetchExposure();
          refetchBalance();
          dispatch(setRunnerId(null));
          dispatch(setPlaceBetValues(null));
          refetchCurrentBets();
          setBetDelay("");
          dispatch(setStake(null));
          toast.success(res?.result?.result?.placed?.[0]?.message);
        } else {
          setLoading(false);
          toast.error(
            res?.error?.status?.[0]?.description || res?.error?.errorMessage
          );
          setBetDelay("");
          setBetDelay(false);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong. Please try again.");
        setBetDelay("");
      }
    }, delay);
  };

  useEffect(() => {
    if (
      price &&
      stake &&
      placeBetValues?.back &&
      placeBetValues?.btype === "MATCH_ODDS"
    ) {
      const multiply = price * stake;
      setProfit(formatNumber(multiply - stake));
    } else if (
      price &&
      stake &&
      placeBetValues?.back &&
      (placeBetValues?.btype === "BOOKMAKER" ||
        placeBetValues?.btype === "BOOKMAKER2")
    ) {
      const bookmaker = 1 + price / 100;
      const total = bookmaker * stake - stake;

      setProfit(formatNumber(total));
    } else if (price && stake && placeBetValues?.btype === "FANCY") {
      const profit =
        (parseFloat(placeBetValues?.bottomValue) * parseFloat(stake)) /
        parseFloat(stake);
      setProfit(profit);
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const handleCancelBet = () => {
    dispatch(setRunnerId(null));
    dispatch(setPlaceBetValues(null));
    dispatch(setStake(null));
  };
  const handleShowLoginModal = () => {
    dispatch(setShowLoginModal(true));
  };

  const handleButtonValue = (value) => {
    setIsCashOut(false);
    const buttonValue = Number(value);
    const prevStake = !stake ? null : Number(stake);

    if (prevStake === null) {
      dispatch(setStake(buttonValue));
    }
    if (prevStake >= 0) {
      dispatch(setStake(buttonValue + prevStake));
    }
  };

  return (
    <div className="w-100 bet-slip-show betslip-box">
      <div>
        <div>
          <div>
            <div className="box-header">
              <h4>
                <font dir="auto" style={{ verticalAlign: "inherit" }}>
                  <font dir="auto" style={{ verticalAlign: "inherit" }}>
                    Bet Slip
                  </font>
                </font>
              </h4>
              <img
                onClick={handleCancelBet}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADSSURBVHgBpVKBDYQgDGx+AkZgBEdgM0eQDWAj2AA30A36rQ+mIhjMX3IJgd6lPQpwhyFaYiJiZiA6ooYHKOIiRD0uufYmDgNi2dHFZHkhlp0c0PWjUgpH7nJe4OWl1hpTSuicO+/mecZt23CaptqAw77P7r1HBpuwmBFCaHWRoDdjMXkQH/xABzTGeY4xwr7vvVJYa1fZthwH2t95BHEJkQOTbRcTY0xt4CB/xeWB065nboiZuoxh4f0iWZnD36tcTEY6sS2xhIbfdkYhWrPQ1MVf12r9UarbyZsAAAAASUVORK5CYII="
                alt=""
                className="pointer"
              />
            </div>
            <div className="box-match-odds position-relative">
              <h5>
                <font dir="auto" style={{ verticalAlign: "inherit" }}>
                  <font dir="auto" style={{ verticalAlign: "inherit" }}>
                    {placeBetValues?.btype}
                  </font>
                </font>
              </h5>
              <div
                className={`amount-block ${
                  placeBetValues?.back ? "back" : "lay"
                }`}
              >
                <div className="label-box">
                  <h6 className="notranslate">
                    {placeBetValues?.selectedBetName}
                    <a className="pointer ml-1">
                      <img
                        onClick={handleCancelBet}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC8SURBVHgBfU/bDcIwDHRQ/5sN2k5ARugGwCYwAd2AEVAnaDagI2QDwgZ0ArhIF2EitZZOts8+P4wo+zg3wR3l37wJ4ZSTqiim5gsQmDvgphsqTL3Ct4o7AHvGlpvvzF9pg+HkCIwsGPqFnKN4zLd7YGBs5fdT3jAAs/7hDTSMJxRHcmeg5/RnKu6UoDRbxEsp6GTdmjw0CyJQy7ZF/YM+Id0/M/fkuryhUmqLZ3vGLflAri4FgcRD1s9JkC/YWTaquKAOKgAAAABJRU5ErkJggg=="
                        alt=""
                      />
                    </a>
                  </h6>
                  <h4 className="liability-profit notranslate txt-blue">
                    {" "}
                    Profit: 0{" "}
                  </h4>
                </div>
                <div className="amount-control">
                  <div className="plus-minus">
                    {!placeBetValues?.isWeak && (
                      <button
                        onClick={() => {
                          handleDecreasePrice(
                            price,
                            placeBetValues,
                            dispatch,
                            setPrice
                          );
                          setIsCashOut(false);
                        }}
                        className="btn-minus"
                      >
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            -
                          </font>
                        </font>
                      </button>
                    )}

                    <input
                      onChange={(e) => {
                        dispatch(setPrice(e.target.value));
                        setIsCashOut(false);
                      }}
                      type="text"
                      value={price}
                      placeholder="Rate"
                      inputMode="numeric"
                      className="form-control input-number-bet ng-untouched ng-pristine ng-valid"
                    />
                    {!placeBetValues?.isWeak && (
                      <button
                        onClick={() => {
                          handleIncreasePrice(
                            price,
                            placeBetValues,
                            dispatch,
                            setPrice
                          );
                          setIsCashOut(false);
                        }}
                        className="btn-minus"
                      >
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            +
                          </font>
                        </font>
                      </button>
                    )}
                  </div>

                  <div className="plus-minus inp-focus">
                    {/* <button className="btn-minus">
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          -
                        </font>
                      </font>
                    </button> */}
                    <input
                      onChange={(e) => {
                        dispatch(setStake(e.target.value));
                        setIsCashOut(false);
                      }}
                      placeholder={`Max bet: ${placeBetValues?.maxLiabilityPerBet}`}
                      value={stake !== null && stake}
                      type="number"
                      className="form-control input-number-bet ng-untouched ng-pristine ng-valid"
                    />
                    {/* <button className="btn-minus">
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          +
                        </font>
                      </font>
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="chip-boxes row px-2">
                {parseButtonValues?.slice(0, 6)?.map((button, i) => (
                  <div
                    key={i}
                    onClick={() => handleButtonValue(button?.value)}
                    className="col-auto"
                  >
                    <button className="btn-chip">
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          {button?.value}
                        </font>
                      </font>
                    </button>
                  </div>
                ))}

                {/* <div className="col-auto">
                  <button className="btn-chip btn-chip-edit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={10}
                      height={10}
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M2.14697 7.84741L4.51561 7.83931L9.68548 2.68864C9.88837 2.48456 10 2.21353 10 1.92522C10 1.63692 9.88837 1.36588 9.68548 1.1618L8.83421 0.305517C8.42844 -0.102649 7.72048 -0.100489 7.31792 0.303897L2.14697 5.45564V7.84741ZM8.07526 1.06894L8.92814 1.9236L8.07097 2.77773L7.2197 1.92198L8.07526 1.06894ZM3.22045 5.90592L6.45699 2.68109L7.30826 3.53737L4.07226 6.76113L3.22045 6.76382V5.90592Z"
                        fill="var(--primary-color)"
                      />
                      <path
                        d="M1.07348 9.99997H8.58784C9.17986 9.99997 9.66132 9.51568 9.66132 8.92017V4.2403L8.58784 5.3201V8.92017H2.7685C2.75455 8.92017 2.74006 8.92557 2.7261 8.92557C2.70839 8.92557 2.69068 8.92071 2.67243 8.92017H1.07348V1.36154H4.74854L5.82202 0.281738H1.07348C0.481456 0.281738 0 0.76603 0 1.36154V8.92017C0 9.51568 0.481456 9.99997 1.07348 9.99997Z"
                        fill="var(--primary-color)"
                      />
                    </svg>
                    <font dir="auto" style={{ verticalAlign: "inherit" }}>
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        Edit
                      </font>
                    </font>
                  </button>
                </div> */}
              </div>
              {/* <span className="sl-amt-title px-2">
                <font dir="auto" style={{ verticalAlign: "inherit" }}>
                  <font dir="auto" style={{ verticalAlign: "inherit" }}>
                    Select a different amount
                  </font>
                </font>
              </span>
              <div className="select-amount px-2">
                <div className="digit-block">
                  <div className="row-chip row">
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            1
                          </font>
                        </font>
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            2
                          </font>
                        </font>
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            3
                          </font>
                        </font>
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            4
                          </font>
                        </font>
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            5
                          </font>
                        </font>
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            6
                          </font>
                        </font>
                      </button>
                    </div>
                  </div>
                  <div className="row-chip row">
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            7
                          </font>
                        </font>
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            8
                          </font>
                        </font>
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            9
                          </font>
                        </font>
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            0
                          </font>
                        </font>
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            00
                          </font>
                        </font>
                      </button>
                    </div>
                    <div className="col-auto">
                      <button className="btn-digit-number">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            .
                          </font>
                        </font>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="back-button">
                  <button className="btn-digit-number">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAClSURBVHgBlZLBDcIwDEU/cIFbjxzDJh0hI7ABK2QENkBMwAiICcoGwARlA/hRG8lNnMr90pMcWfmxHQNTedKTn5F2Iy435Eb2sOuzFocTcVioZOBIUPLfSlwYBOg6kCt5jrFqckR9SB2G2UQuSj7ECt6waTWXvCvuvXg5VdLlFSQDB/3/X5lh0ULagzicHWmzyhoRb1HqIffgDPs8qvKwr3Fsyf8BBB9Ik1w8vt8AAAAASUVORK5CYII="
                      alt=""
                    />
                  </button>
                </div>
              </div> */}
            </div>
            <div className="place-bet-block">
              <div className="stake-amount">
                <h2>
                  <span>
                    <font dir="auto" style={{ verticalAlign: "inherit" }}>
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        Min/Max:
                      </font>
                    </font>
                  </span>
                  <span className="value">
                    <font dir="auto" style={{ verticalAlign: "inherit" }}>
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        {placeBetValues?.minLiabilityPerBet}/
                        {placeBetValues?.maxLiabilityPerBet}
                      </font>
                    </font>
                  </span>
                </h2>
                <h2>
                  <span>
                    <font dir="auto" style={{ verticalAlign: "inherit" }}>
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        Max Profit:
                      </font>
                    </font>
                  </span>
                  <span className="value">
                    <font dir="auto" style={{ verticalAlign: "inherit" }}>
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        {profit}
                      </font>
                    </font>
                  </span>
                </h2>
              </div>
              <div className="place-button">
                <button onClick={handleCancelBet} className="btn-clear">
                  <font dir="auto" style={{ verticalAlign: "inherit" }}>
                    <font dir="auto" style={{ verticalAlign: "inherit" }}>
                      Cancel
                    </font>
                  </font>
                </button>
                <button onClick={handleOrderBets} className="btn-place-bet">
                  <font dir="auto" style={{ verticalAlign: "inherit" }}>
                    <font dir="auto" style={{ verticalAlign: "inherit" }}>
                      Place Bet
                    </font>
                  </font>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bet-slip-backdrop offcanvas-backdrop" />
      </div>
    </div>
  );
};

export default BetSlip;
