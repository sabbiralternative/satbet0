import {
  setPlaceBetValues,
  setRunnerId,
} from "../redux/features/events/eventSlice";
import { setShowLoginModal } from "../redux/features/global/globalSlice";

/* handle place bet */
export const handleCashOutPlaceBet = (
  games,
  betType,
  dispatch,
  pnlBySelection,
  token,
  team
) => {
  if (token) {
    if (games?.status === "OPEN" && team?.runner?.status === "OPEN") {
      if (team && team?.profit === 0) {
        return;
      }
      const updatedPnl = [];
      games?.runners?.forEach((rnr) => {
        const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
        if (pnl) {
          updatedPnl.push({
            exposure: pnl?.pnl,
            id: pnl?.RunnerId,
            isBettingOnThisRunner: rnr?.id === team?.runner?.id,
          });
        } else {
          updatedPnl.push({
            exposure: 0,
            id: rnr?.id,
            isBettingOnThisRunner: rnr?.id === team?.runner?.id,
          });
        }
      });

      dispatch(setPlaceBetValues(null));
      dispatch(
        setPlaceBetValues({
          price:
            betType === "back"
              ? team?.runner?.back[0].price
              : team?.runner?.lay[0].price,
          side: betType === "back" ? 0 : 1,
          selectionId: team?.runner?.id,
          btype: games?.btype,
          eventTypeId: games?.eventTypeId,
          betDelay: games?.betDelay,
          marketId: games?.id,
          lay: betType === "lay",
          back: betType === "back",
          selectedBetName: team?.runner?.name,
          name: games.runners.map((runner) => runner.name),
          runnerId: games.runners.map((runner) => runner.id),
          isWeak: games?.isWeak,
          maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
          isBettable: games?.isBettable,
          maxLiabilityPerBet: games?.maxLiabilityPerBet,
          exposure: updatedPnl,
          marketName: games?.name,
          eventId: games?.eventId,
          totalSize: team?.newStakeValue,
          cashout: true,
        })
      );
      dispatch(setRunnerId(team?.runner?.id));
    }
  } else {
    dispatch(setShowLoginModal(true));
  }
};
