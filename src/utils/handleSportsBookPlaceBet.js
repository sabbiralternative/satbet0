import {
  setPlaceBetValues,
  setRunnerId,
} from "../redux/features/events/eventSlice";
import { setShowLoginModal } from "../redux/features/global/globalSlice";

export const handleSportsBookPlaceBet = (
  column,
  item,
  sportsBook,
  token,
  dispatch
) => {
  if (token) {
    if (item?.Status === 1 || item?.Status) {
      if (column?.IsActive === 1 || column?.IsActive) {
        dispatch(setPlaceBetValues({}));
        dispatch(setRunnerId(item?.Id));
        dispatch(
          setPlaceBetValues({
            price: column?.Price?.toFixed(2),
            back: true,
            side: 0,
            selectionId: column?.Id,
            btype: "SPORTSBOOK",
            placeName: column?.Name,
            eventTypeId: sportsBook?.EventTypeId,
            betDelay: sportsBook?.betDelay,
            marketId: item?.Id,
            maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
            maxLiabilityPerBet: item?.maxLiabilityPerBet,
            isBettable: sportsBook?.isBettable,
            isWeak: sportsBook?.isWeak,
            marketName: item?.Name,
            eventId: sportsBook?.eventId,
          })
        );
      }
    }
  } else {
    dispatch(setShowLoginModal(true));
  }
};
