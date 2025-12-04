import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowAppPopUp,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import Login from "../../modals/Login/Login";
import { useLogo } from "../../../context/ApiProvider";
import { Link, useLocation } from "react-router-dom";
import Register from "../../modals/Register/Register";
import ForgotPassword from "../../modals/ForgotPassword/ForgotPassword";
import { Settings } from "../../../api";
import Notification from "./Notification";
import AppPopup from "./AppPopUp";

const Navbar = () => {
  const location = useLocation();
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const {
    showLoginModal,
    showRegisterModal,
    showForgotPasswordModal,
    showAppPopUp,
    windowWidth,
  } = useSelector((state) => state.global);

  useEffect(() => {
    const closePopupForForever = localStorage.getItem("closePopupForForever");
    if (location?.state?.pathname === "/apk" || location.pathname === "/apk") {
      localStorage.setItem("closePopupForForever", true);
      localStorage.removeItem("installPromptExpiryTime");
    } else {
      if (!closePopupForForever) {
        const expiryTime = localStorage.getItem("installPromptExpiryTime");
        const currentTime = new Date().getTime();

        if ((!expiryTime || currentTime > expiryTime) && Settings?.apkLink) {
          localStorage.removeItem("installPromptExpiryTime");

          dispatch(setShowAppPopUp(true));
        }
      }
    }
  }, [
    dispatch,
    windowWidth,
    showAppPopUp,
    location?.state?.pathname,
    location.pathname,
  ]);
  return (
    <Fragment>
      {showLoginModal && <Login />}
      {showRegisterModal && <Register />}
      {showForgotPasswordModal && <ForgotPassword />}
      <Notification />
      {Settings?.apkLink && showAppPopUp && windowWidth < 1040 && <AppPopup />}
      <div className="navbar_sec">
        <div className="container-fluid">
          <nav className="navbar navbar-expand">
            <div className="nav_logo_btngrp_align">
              <Link
                style={{ display: "block", marginLeft: "0px" }}
                className="navbar-brand"
                to="/"
              >
                <img
                  src={logo}
                  alt="logo"
                  loading="lazy"
                  width={150}
                  height={60}
                />
              </Link>
              {/* <div class="btn_grp_mob">
                            <button class="btn login_btn" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                            <button class="btn signup_btn" type="submit">Register</button>
                        </div> */}
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarTogglerDemo02"
              style={{ visibility: "visible" }}
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-dsktp-align navbar_menu_align position-relative">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/exchange"
                  >
                    <div className="nav_menus">
                      <img
                        src="https://asset.satbet.com/images/exchange.gif"
                        alt="icon"
                        width={26}
                        height={26}
                        className="exchange-gif"
                        loading="lazy"
                      />
                      <p>Exchange</p>
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/sportsbook"
                  >
                    <div className="nav_menus">
                      <img
                        src="https://asset.satbet.com/images/sports.gif"
                        alt="icon"
                        width={26}
                        height={26}
                        loading="lazy"
                      />
                      <p>Sports</p>
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/casino-games"
                  >
                    <div className="nav_menus">
                      <img
                        src="https://asset.satbet.com/images/casino.gif"
                        alt="icon"
                        width={26}
                        height={26}
                        loading="lazy"
                      />
                      <p>Casino</p>
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/live-casino-games"
                  >
                    <div className="nav_menus">
                      <img
                        src="https://asset.satbet.com/images/live.gif"
                        alt="icon"
                        width={26}
                        height={26}
                        loading="lazy"
                      />
                      <p>Live Casino</p>
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/promotions"
                  >
                    <div className="nav_menus">
                      <img
                        src="https://asset.satbet.com/images/promo.gif"
                        alt="icon"
                        width={26}
                        height={26}
                        loading="lazy"
                        style={{
                          borderRadius: "var(--sb_px15)",
                          border: "2px solid",
                        }}
                      />
                      <p>Promotions</p>
                    </div>
                  </Link>
                </li>
              </ul>
              <div className="btn_grp_dskt flex items-center">
                <button
                  onClick={() => dispatch(setShowLoginModal(true))}
                  className="btn login_btn"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </button>
                <button
                  onClick={() => dispatch(setShowRegisterModal(true))}
                  className="btn signup_btn"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#signupModal"
                >
                  Register
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
