import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import { useGetLadderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import isOddSuspended from "../../../utils/isOddSuspended";
import BetSlip from "./BetSlip";

const Fancy = ({ data }) => {
  const fancyData = data?.filter(
    (fancy) =>
      fancy.btype === "FANCY" &&
      fancy.tabGroupName === "Normal" &&
      fancy?.visible == true
  );
  const [marketName, setMarketName] = useState("");
  const [ladderData, setLadderData] = useState([]);
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { runnerId } = useSelector((state) => state.event);
  const { data: exposure } = useExposure(eventId);
  const [getLadder] = useGetLadderMutation();

  const handleBetSlip = (betType, games, runner, price, bottomValue) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposure?.pnlBySelection) {
        const obj = exposure?.pnlBySelection;
        pnlBySelection = Object?.values(obj);
      }

      if (games?.btype == "FANCY") {
        selectionId = games?.id;
        runnerId = games?.id;
        eventTypeId = games?.eventTypeId;
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === runner?.id);
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      } else {
        selectionId = runner?.selectionId;
        eventTypeId = games?.marketId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find(
            (p) => p?.RunnerId === runner?.selectionId
          );
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      }

      const betData = {
        price,
        side: betType === "back" ? 0 : 1,
        selectionId,
        btype: games?.btype,
        eventTypeId,
        betDelay: games?.betDelay,
        marketId: games?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.name,
        name: games.runners.map((runner) => runner.name),
        runnerId,
        isWeak: games?.isWeak,
        maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
        isBettable: games?.isBettable,
        maxLiabilityPerBet: games?.maxLiabilityPerBet,
        pnl: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
        bottomValue,
      };
      if (games?.btype == "FANCY") {
        dispatch(setRunnerId(games?.id));
      } else if (games?.btype && games?.btype !== "FANCY") {
        dispatch(setRunnerId(runner?.id));
      } else {
        dispatch(setRunnerId(runner?.selectionId));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      dispatch(setShowLoginModal(true));
    }
  };

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const handleGetLadder = async (pnl, marketName) => {
    if (!pnl?.MarketId) {
      return;
    }
    setMarketName(marketName);
    const res = await getLadder({ marketId: pnl?.MarketId }).unwrap();

    if (res.success) {
      setLadderData(res.result);
    }
  };
  return (
    <Fragment>
      {fancyData?.length > 0 && (
        <div className="row m-0 mx-2">
          <div className="col-12 p-0">
            <section>
              <div className="sub-tabs-container sub-tab-active-bg">
                <div className="sub-tab-content-inner-div padding-tab d-flex overflow-auto pr-3">
                  <div className="pointer ">
                    <font dir="auto" style={{ verticalAlign: "inherit" }}>
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        Fancy
                      </font>
                    </font>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      <div>
        <div className="fancy-container mx-2 rounded-top-5 rounded-bottom-5">
          <div className="selection-info rounded-bottom-5">
            {fancyData?.length > 0
              ? fancyData?.map((game) => {
                  const pnl =
                    pnlBySelection?.find((pnl) => pnl?.MarketId === game?.id) ||
                    {};

                  return (
                    <Fragment key={game?.id}>
                      <div className="row m-0 rounded-bottom-5 fancy-bet-row">
                        <div className="col-sm-5 col-7 p-0 pl-1 text-left align-self-center">
                          <span className="market-name pointer notranslate">
                            {game?.name}
                          </span>
                        </div>
                        <div className="col-sm-7 col-5 p-0">
                          <div className="row m-0">
                            <div className="col-sm-4 p-0 hidden d-md-table-cell cell-odds text-center align-middle fancy-odds-frist">
                              <div className="align-center d-flex flex-column justify-content-center mm-bet">
                                <div className="d-block min-max-bet">
                                  <div className="col-12">
                                    <font
                                      dir="auto"
                                      style={{ verticalAlign: "inherit" }}
                                    >
                                      <font
                                        dir="auto"
                                        style={{ verticalAlign: "inherit" }}
                                      >
                                        Stake Limit: 0 - 0
                                      </font>
                                    </font>
                                  </div>
                                </div>
                                <div className="value-mm-bet">
                                  <div className="col-12">
                                    <font
                                      dir="auto"
                                      style={{ verticalAlign: "inherit" }}
                                    >
                                      <font
                                        dir="auto"
                                        style={{ verticalAlign: "inherit" }}
                                      >
                                        Max Profit: 0
                                      </font>
                                    </font>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4 p-0 text-center">
                              <div className="row m-0 ml-1 p-1px">
                                <div
                                  onClick={() =>
                                    handleBetSlip(
                                      "lay",
                                      game,
                                      game?.runners?.[0],
                                      game?.runners?.[0]?.lay?.[0]?.line,
                                      game?.runners?.[0]?.lay?.[0]?.price
                                    )
                                  }
                                  className="col-6 pending-odds cell-odds cell-lay p-0 v-pink"
                                >
                                  <div>
                                    <div className="rateDiv notranslate">
                                      <p>
                                        {" "}
                                        {game?.runners?.[0]?.lay?.[0]?.line}
                                      </p>

                                      <div>
                                        {" "}
                                        {game?.runners?.[0]?.lay?.[0]?.price}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  onClick={() =>
                                    handleBetSlip(
                                      "back",
                                      game,
                                      game?.runners?.[0],
                                      game?.runners?.[0]?.back?.[0]?.line,
                                      game?.runners?.[0]?.back?.[0]?.price
                                    )
                                  }
                                  className="col-6 pending-odds cell-odds cell-back p-0 v-blue"
                                >
                                  <div>
                                    <div className="rateDiv notranslate">
                                      <p>
                                        {" "}
                                        {game?.runners?.[0]?.back?.[0]?.line}
                                      </p>

                                      <div>
                                        {" "}
                                        {game?.runners?.[0]?.back?.[0]?.price}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {isOddSuspended(game) && (
                                  <div className="ball-start-overly">
                                    <span>
                                      <font
                                        dir="auto"
                                        style={{ verticalAlign: "inherit" }}
                                      >
                                        <font
                                          dir="auto"
                                          style={{ verticalAlign: "inherit" }}
                                        >
                                          Suspended
                                        </font>
                                      </font>
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-sm-4 hidden p-0 pr-1 text-right align-self-center md:flex items-center justify-end">
                              <i className="ladder-book icon-size cursor mr-1 w-fit">
                                <svg
                                  version="1.1"
                                  id="Layer_1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 27 45"
                                  xmlSpace="preserve"
                                  style={{
                                    enableBackground: "new 0 0 27 45",
                                  }}
                                >
                                  <path
                                    d="M24.8,45c1.2,0,2.2-1,2.2-2.2V2.2C27,1,26,0,24.8,0s-2.2,1-2.2,2.2v5.5h-18V2.2C4.5,1,3.5,0,2.2,0S0,1,0,2.2
	                                v40.5C0,44,1,45,2.2,45s2.2-1,2.2-2.2v-5.5h18v5.5C22.5,44,23.5,45,24.8,45z M4.5,11.8h18v8.8h-18V11.8z M4.5,33.2v-8.8h18v8.8H4.5z"
                                  />
                                </svg>
                              </i>
                            </div>
                          </div>
                        </div>
                      </div>
                      {runnerId === game?.id && <BetSlip />}
                    </Fragment>
                  );
                })
              : null}

            <table className="table rounded-bottom-5 table-bordered table-collapse table-odds"></table>
            {/* <div className="row m-4" /> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Fancy;
