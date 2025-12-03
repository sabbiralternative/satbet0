import {
  setPlaceBetValues,
  setShowComponent,
} from "../redux/features/events/eventSlice";
import { setShowLoginModal } from "../redux/features/stateSlice";

export const handleDesktopBetSlip = (
  betType,
  games,
  runner,
  exposer,
  dispatch,
  price,
  token
) => {
  if (token) {
    let pnlBySelection;
    let selectionId;
    let runnerId;
    let eventTypeId;
    const updatedPnl = [];

    if (exposer?.pnlBySelection) {
      const obj = exposer?.pnlBySelection;
      pnlBySelection = Object?.values(obj);
    }

    if (games?.btype == "FANCY") {
      selectionId = games?.id;
      runnerId = games?.id;
      eventTypeId = games?.eventTypeId;
      const pnl = pnlBySelection?.find((p) => p?.RunnerId === games?.id);
      if (pnl) {
        updatedPnl.push(pnl?.pnl);
      }
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
      price: price,
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
    };

    dispatch(setPlaceBetValues(betData));
    dispatch(setShowComponent(true));
  } else {
    dispatch(setShowLoginModal(true));
  }
};
