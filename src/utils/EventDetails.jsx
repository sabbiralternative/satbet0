import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetEventDetailsQuery } from "../../redux/features/events/events";
import { useEffect, useState } from "react";
import { setPredictOdd } from "../../redux/features/events/eventSlice";
import RightSidebar from "../../components/modules/EventDetails/RightSidebar";
import MatchOddsBookmaker from "../../components/modules/EventDetails/MatchOddsBookmaker";
import Fancy from "../../components/modules/EventDetails/Fancy";
import img from "../../assets/img";
import { useAccessTokenMutation } from "../../redux/features/casino/casino.api";
import CurrentBets from "../../components/modals/CurrentBets/CurrentBets";
import ScoreCard from "../../components/modules/EventDetails/ScoreCard";
import HorseGreyhoundEventDetails from "../../components/modules/EventDetails/HorseGreyhoundEventDetails";
import SportsBook from "./SportsBook/SportsBook";

const EventDetails = () => {
  const [showCurrentBets, setShowCurrentBets] = useState(false);
  const [showIFrame, setShowIFrame] = useState(false);
  const [getIFrame, { data: IFrame }] = useAccessTokenMutation();
  const { eventTypeId, eventId } = useParams();
  const dispatch = useDispatch();
  const { placeBetValues, price, stake } = useSelector((state) => state.event);

  const { data } = useGetEventDetailsQuery(
    { eventTypeId, eventId },
    {
      pollingInterval: 1000,
    }
  );

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * stake - stake;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * stake - stake;
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * stake),

              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });

          dispatch(setPredictOdd(currentExposure));
        }
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * stake - stake);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * stake - stake);
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * stake),
              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });
          dispatch(setPredictOdd(currentExposure));
        }
      }
    }
  }, [price, stake, placeBetValues, dispatch]);

  useEffect(() => {
    if (showIFrame) {
      const payload = {
        eventTypeId,
        eventId,
        type: "video",
      };
      getIFrame(payload);
    }
  }, [eventId, eventTypeId, getIFrame, showIFrame]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  return (
    <>
      {showCurrentBets && (
        <CurrentBets setShowCurrentBets={setShowCurrentBets} />
      )}
      <main id="main" className="main">
        <div>
          <div>
            <div className="row">
              <div className="col-md-12 col-lg-8 detail-center-column">
                <div className="middle-page-content details-page">
                  <div className="card-header game-heading">
                    <span className="card-header-title">
                      {data?.result?.[0]?.eventName}
                    </span>

                    <span className="date-time ng-star-inserted">
                      ({data?.result?.[0]?.openDate})
                    </span>
                    <a
                      onClick={() => setShowCurrentBets(true)}
                      className="best_link d-lg-none ng-star-inserted"
                    >
                      Bets
                    </a>
                    {data?.score?.hasVideo && (
                      <a
                        onClick={() => setShowIFrame((prev) => !prev)}
                        aria-controls="collapseBasic"
                        role="button"
                        className="Television_mobile ng-star-inserted"
                        aria-expanded="true"
                      >
                        <img src={img.tv} alt="" />
                      </a>
                    )}
                  </div>

                  <div className="sr-widget-1" />
                  {data?.score?.tracker && (
                    <div
                      style={{
                        width: "100%",
                        height: "125px",
                        overflow: "hidden",
                      }}
                    >
                      {" "}
                      <iframe
                        className="premium-iframe"
                        src={data?.score?.tracker}
                      ></iframe>
                    </div>
                  )}
                  {showIFrame && IFrame?.result?.url && (
                    <div className="embed-responsive embed-responsive-16by9 ng-star-inserted">
                      <iframe
                        id="tvStr"
                        className="embed-responsive-item w-100"
                        src={IFrame?.result?.url}
                      ></iframe>
                    </div>
                  )}

                  <div>
                    {data?.result?.[0]?.score2?.length !== 0 &&
                      !Array.isArray(data?.result?.[0]?.score2) && (
                        <ScoreCard score2={data?.result?.[0]?.score2} />
                      )}
                    <MatchOddsBookmaker data={data?.result} />

                    <Fancy data={data?.result} />
                    {eventTypeId == 7 || eventTypeId == 4339 ? (
                      <HorseGreyhoundEventDetails data={data} />
                    ) : null}
                    {data && data?.sportsbook?.Result && (
                      <SportsBook sportsBook={data?.sportsbook?.Result} />
                    )}
                  </div>
                </div>
              </div>
              <RightSidebar hasVideo={data?.score?.hasVideo} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventDetails;
