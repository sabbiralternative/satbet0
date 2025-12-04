import { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { userToken } from "../../../redux/features/auth/authSlice";
import images from "../../../assets/images";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";

const WarningCondition = ({ setShowWarning, gameInfo }) => {
  /* Close modal click out side */
  const dispatch = useDispatch();
  const warningRef = useRef();
  const navigate = useNavigate();
  useCloseModalClickOutside(warningRef, () => {
    setShowWarning(false);
  });

  const token = useSelector(userToken);
  /* Handle navigate casino video in new tab */
  const handleNavigateNewTab = async () => {
    navigate(
      `/casino/${gameInfo?.gameName.replace(/ /g, "")}/${gameInfo?.gameId}`
    );
    /* Close warning modal */
    setShowWarning(false);
  };
  return (
    <div
      className="swal2-container swal2-bottom swal2-backdrop-show"
      style={{ overflowY: "auto" }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.1 }}
        aria-labelledby="swal2-title"
        aria-describedby="swal2-html-container"
        className="swal2-popup swal2-modal success-alert alert-dialog"
        role="dialog"
        aria-live="assertive"
        aria-modal="true"
        style={{ display: "grid" }}
        ref={warningRef}
      >
        <div className="swal2-icon swal2-icon-show" style={{ display: "flex" }}>
          <div className="swal2-icon-content">
            <img src={token ? images.defaultNotification : images.warning} />
          </div>
        </div>

        <h2
          className="swal2-title"
          id="swal2-title"
          style={{ display: "block" }}
        >
          {token && "(1 Point = ₹ 100)"}
        </h2>
        <div
          className="swal2-html-container"
          id="swal2-html-container"
          style={{ display: "block", color: "black" }}
        >
          {token
            ? "Immerse yourself in the excitement of live casino action, an array of captivating slots, and a diverse range of games."
            : "Please log in to play."}
        </div>

        <div className="swal2-actions" style={{ display: "flex" }}>
          <div className="swal2-loader"></div>
          {token ? (
            <button
              onClick={handleNavigateNewTab}
              type="button"
              className="swal2-confirm swal2-styled"
              aria-label=""
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              OK
            </button>
          ) : (
            <button
              onClick={() => {
                setShowWarning(false);
                dispatch(setShowLoginModal(true));
              }}
              type="button"
              className="swal2-confirm swal2-styled bg-primary"
              aria-label=""
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              OK
            </button>
          )}

          <button
            onClick={() => setShowWarning(false)}
            type="button"
            className="swal2-cancel swal2-styled"
            aria-label=""
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WarningCondition;
