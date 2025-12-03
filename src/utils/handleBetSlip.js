import {
  setPlaceBetValues,
  setRunnerId,
} from "../redux/features/events/eventSlice";
import { setShowLoginModal } from "../redux/features/global/globalSlice";

export const handleBetSlip = (
  betType,
  games,
  runner,
  exposer,
  dispatch,
  token
) => {
  if (token) {
    let selectionId;
    let runnerId;
    let eventTypeId;
    let price;
    if (games?.btype && betType === "back" && !runner?.back[0].price) {
      return;
    }
    if (games?.btype && betType === "lay" && !runner?.lay[0].price) {
      return;
    }
    let pnlBySelection;
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

    if (games?.btype == "FANCY") {
      price =
        betType === "back" ? runner?.back?.[0]?.line : runner?.lay?.[0]?.line;
    } else if (games?.btype && games?.btype !== "FANCY") {
      price = betType === "back" ? runner?.back[0].price : runner?.lay[0].price;
    } else {
      price =
        betType === "back"
          ? runner?.ex?.availableToBack?.[0]?.price
          : runner?.ex?.availableToLay?.[0]?.price;
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
