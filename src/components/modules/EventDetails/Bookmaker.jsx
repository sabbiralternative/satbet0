import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import { Settings } from "../../../api";
import { handleCashOutPlaceBet } from "../../../utils/handleCashoutPlaceBet";
import isOddSuspended from "../../../utils/isOddSuspended";
import BetSlip from "./BetSlip";

const Bookmaker = ({ data }) => {
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const dispatch = useDispatch();
  const { runnerId, stake, predictOdd } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.auth);
  const { data: exposure } = useExposure(eventId);

  const handleBetSlip = (betType, games, runner, price) => {
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
        games?.runners?.forEach((rnr) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
          if (pnl) {
            updatedPnl.push({
              exposure: pnl?.pnl,
              id: pnl?.RunnerId,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          } else {
            updatedPnl.push({
              exposure: 0,
              id: rnr?.id,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
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
        exposure: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
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

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId
  ) => {
    let runner, largerExposure, layValue, oppositeLayValue, lowerExposure;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      lowerExposure = exposureA;
    }

    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
    };
  };
  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }
  useEffect(() => {
    let results = [];
    if (
      data?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      data.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  return (
    <Fragment>
      {data?.length > 0 &&
        data?.map((game) => {
          const teamProfitForGame = teamProfit?.find(
            (profit) =>
              profit?.gameId === game?.id && profit?.isOnePositiveExposure
          );

          return (
            <div key={game?.id} className="match-odd-box">
              <div className="market-info match-odd-info">
                <div className="row m-0 f-12 justify-content-between align-items-start h-100">
                  <div className="d-flex align-items-end h-100">
                    <div className="p-0 h-100">
                      <span className="font-weight-bold uppercase-letter market-odd-name">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            {game?.name?.toUpperCase()}
                          </font>
                        </font>
                      </span>
                    </div>
                    {Settings.betFairCashOut &&
                      game?.runners?.length !== 3 &&
                      game?.status === "OPEN" &&
                      game?.name !== "toss" && (
                        <button
                          style={{
                            cursor: `${
                              !teamProfitForGame ? "not-allowed" : "pointer"
                            }`,
                            opacity: `${!teamProfitForGame ? "0.6" : "1"}`,
                          }}
                          onClick={() =>
                            handleCashOutPlaceBet(
                              game,
                              "lay",
                              dispatch,
                              pnlBySelection,
                              token,
                              teamProfitForGame
                            )
                          }
                          className="p-0 h-100 ml-2"
                        >
                          <span className="font-weight-bold uppercase-letter market-odd-name">
                            <font
                              dir="auto"
                              style={{ verticalAlign: "inherit" }}
                            >
                              <font
                                dir="auto"
                                style={{ verticalAlign: "inherit" }}
                              >
                                Cashout{" "}
                                {teamProfitForGame?.profit &&
                                  `(${teamProfitForGame.profit.toFixed(2)})`}
                              </font>
                            </font>
                          </span>
                        </button>
                      )}
                  </div>
                  <div className="p-0 justify-content-end d-flex align-items-center h-100">
                    <span className="market-rule mr-rules">
                      <span className="market-rules-span">
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          <font dir="auto" style={{ verticalAlign: "inherit" }}>
                            Rules
                          </font>
                        </font>
                      </span>
                    </span>
                    <span className="market-rule mr-stake">
                      <span className="market-rules-span">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={2}
                          height={8}
                          viewBox="0 0 2 8"
                          fill="none"
                        >
                          <path
                            d="M1.944 2.71652L0.111964 2.96899L0.0463626 3.30328L0.406369 3.37629C0.641574 3.43787 0.687975 3.53112 0.636774 3.78887L0.0463626 6.83967C-0.10884 7.62877 0.130364 8 0.692775 8C1.12878 8 1.63519 7.77832 1.8648 7.47394L1.9352 7.10798C1.7752 7.26281 1.54159 7.32439 1.38639 7.32439C1.16638 7.32439 1.08638 7.15461 1.14318 6.85551L1.944 2.71652ZM2 0.879701C2 1.11301 1.91571 1.33677 1.76568 1.50174C1.61565 1.66672 1.41216 1.7594 1.19998 1.7594C0.987807 1.7594 0.784321 1.66672 0.634289 1.50174C0.484257 1.33677 0.399969 1.11301 0.399969 0.879701C0.399969 0.64639 0.484257 0.422634 0.634289 0.257658C0.784321 0.0926825 0.987807 0 1.19998 0C1.41216 0 1.61565 0.0926825 1.76568 0.257658C1.91571 0.422634 2 0.64639 2 0.879701Z"
                            fill="var(--primary-font-color)"
                          />
                        </svg>
                      </span>
                    </span>

                    <span className="market-rule mr-collapse">
                      <i className="fa cursor d-flex align-items-center fa-minus" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="selection-info">
                <div className="row m-0">
                  <div className="col-sm-5 col-7 p-0">
                    <div className="blank-left" />
                  </div>
                </div>
                <div
                  className="backLayDiv-wraper"
                  style={{
                    backgroundColor: "var(--primary-light-color)",
                  }}
                >
                  <div className="row m-0 backLayDiv pl-2">
                    <div className="col p-0 align-self-center bet-name">
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          {/* 3 Selections */}
                        </font>
                      </font>
                    </div>
                    <div className="col match-primary-rate-box p-0">
                      <div className="row m-0 h-100 justify-content-end align-items-center">
                        <div className="col p-0 bet-value notranslate sm:block hidden" />
                        <div className="col p-0 bet-value notranslate sm:block hidden" />
                        <div className="col p-0 bet-value notranslate">
                          Back
                        </div>
                        <div className="col p-0 bet-value notranslate">Lay</div>
                        <div className="col p-0 bet-value notranslate sm:block hidden" />
                        <div className="col p-0 bet-value notranslate sm:block hidden" />
                      </div>
                    </div>
                  </div>
                </div>
                {game?.runners?.map((runner) => {
                  const pnl = pnlBySelection?.find(
                    (pnl) => pnl?.RunnerId === runner?.id
                  );
                  const predictOddValues = predictOdd?.find(
                    (val) => val?.id === runner?.id
                  );
                  return (
                    <div key={runner?.id} className="backLayDiv-wraper">
                      <div className="row m-0 backLayDiv pl-2">
                        <div className="col p-0 align-self-center bet-name">
                          <div className="d-flex line-h-1">
                            <div className="overflow-wrap notranslate">
                              <div>
                                <span> {runner?.name}</span>
                              </div>
                              <div>
                                <span className="notranslate plus">0</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col match-primary-rate-box p-0">
                          <div className="row m-0 h-100 justify-content-end align-items-center">
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  game,
                                  runner,
                                  runner?.back?.[2]?.price
                                )
                              }
                              className="col p-0 bet-value v-blue notranslate white hidden sm:block"
                            >
                              <div>
                                <div className="rateDiv notranslate">
                                  <p> {runner?.back?.[2]?.price || "-"}</p>
                                  <div> {runner?.back?.[2]?.size}</div>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  game,
                                  runner,
                                  runner?.back?.[1]?.price
                                )
                              }
                              className="col p-0 bet-value v-blue notranslate white hidden sm:block"
                            >
                              <div>
                                <div className="rateDiv notranslate">
                                  <p> {runner?.back?.[1]?.price || "-"}</p>
                                  <div>{runner?.back?.[1]?.size}</div>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  game,
                                  runner,
                                  runner?.back?.[0]?.price
                                )
                              }
                              className="col p-0 bet-value v-blue notranslate"
                            >
                              <div>
                                <div className="rateDiv notranslate">
                                  <p> {runner?.back?.[0]?.price || "-"}</p>
                                  <div>{runner?.back?.[0]?.size}</div>
                                </div>
                              </div>
                            </div>

                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  game,
                                  runner,
                                  runner?.lay?.[0]?.price
                                )
                              }
                              className="col p-0 bet-value v-pink notranslate"
                            >
                              <div>
                                <div className="rateDiv notranslate">
                                  <p> {runner?.lay?.[0]?.price || "-"}</p>
                                  <div> {runner?.lay?.[0]?.size}</div>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  game,
                                  runner,
                                  runner?.lay?.[1]?.price
                                )
                              }
                              className="col p-0 bet-value v-pink notranslate white hidden sm:block"
                            >
                              <div>
                                <div className="rateDiv notranslate">
                                  <p>{runner?.lay?.[1]?.price || "-"}</p>
                                  <div> {runner?.lay?.[1]?.size}</div>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  game,
                                  runner,
                                  runner?.lay?.[2]?.price
                                )
                              }
                              className="col p-0 bet-value v-pink notranslate white hidden sm:block"
                            >
                              <div>
                                <div className="rateDiv notranslate">
                                  <p> {runner?.lay?.[2]?.price || "-"}</p>
                                  <div> {runner?.lay?.[2]?.size}</div>
                                </div>
                              </div>
                            </div>
                            {isOddSuspended(runner) && (
                              <div className="ball-start-overly">
                                <span>Suspended</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {runner?.id === runnerId && <BetSlip />}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </Fragment>
  );
};

export default Bookmaker;
