import { useParams } from "react-router-dom";
import Bookmaker from "./Bookmaker";
import EventName from "./EventName";
import Fancy from "./Fancy";
import MatchOdds from "./MatchOdds";
import RightSidebar from "./RightSidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetEventDetailsQuery } from "../../../redux/features/events/events";
import { setPredictOdd } from "../../../redux/features/events/eventSlice";

const MainContent = () => {
  const { eventTypeId, eventId } = useParams();
  const [profit, setProfit] = useState(0);
  const dispatch = useDispatch();
  const { placeBetValues, price, stake } = useSelector((state) => state.event);

  const { data } = useGetEventDetailsQuery(
    { eventTypeId, eventId },
    {
      pollingInterval: 1000,
    }
  );

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
      setProfit(formatNumber(1 + price / stake));
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

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

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const matchOdds = data?.result?.filter(
    (game) =>
      game.btype === "MATCH_ODDS" &&
      game?.visible == true &&
      game?.name !== "tied match"
  );
  const bookmaker = data?.result?.filter(
    (game) =>
      game.btype === "BOOKMAKER" &&
      game?.visible == true &&
      game?.name !== "tied match"
  );

  const tiedMatch = data?.result?.filter(
    (game) =>
      (game.btype === "MATCH_ODDS" || game.btype === "BOOKMAKER") &&
      game?.visible == true &&
      game?.name === "tied match"
  );

  return (
    <div>
      <div className="row m-0 div-scroll" style={{ overflow: "scroll" }}>
        <div className="col-12 col-lg-12 p-0">
          <div className="row m-0 no-gutters">
            <div className="col-lg-8 col-md-12">
              <div className="highlight-page market">
                <div className="list-market">
                  <div className="match-box">
                    <EventName data={data} />
                    <div className="position-relative web-tvscoreboard mx-2"></div>

                    <div>
                      <div className="market-inPlay market-NoInPlay pl-2 pr-2">
                        {matchOdds?.length > 0 && (
                          <MatchOdds data={matchOdds} />
                        )}
                        {bookmaker?.length > 0 && (
                          <Bookmaker data={bookmaker} />
                        )}
                      </div>
                    </div>

                    {data?.result?.length > 0 && <Fancy data={data?.result} />}
                    {tiedMatch?.length > 0 && <MatchOdds data={tiedMatch} />}
                  </div>
                </div>
              </div>
            </div>
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
