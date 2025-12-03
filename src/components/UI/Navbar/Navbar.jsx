import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import Login from "../../modals/Login/Login";
import { useLogo } from "../../../context/ApiProvider";
import { Link } from "react-router-dom";
import Register from "../../modals/Register/Register";
import ForgotPassword from "../../modals/ForgotPassword/ForgotPassword";

const Navbar = () => {
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const { showLoginModal, showRegisterModal, showForgotPasswordModal } =
    useSelector((state) => state.global);
  return (
    <Fragment>
      {showLoginModal && <Login />}
      {showRegisterModal && <Register />}
      {showForgotPasswordModal && <ForgotPassword />}
      <div className="navbar_sec">
        <div className="container-fluid">
          <nav className="navbar navbar-expand">
            <div className="nav_logo_btngrp_align">
              <Link
                style={{ display: "block" }}
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
