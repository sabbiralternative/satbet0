import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogo } from "../../../context/ApiProvider";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import {
  setShowBanner,
  setShowForgotPasswordModal,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import { useForm } from "react-hook-form";
import { Settings } from "../../../api";
import { setUser } from "../../../redux/features/auth/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [handleLogin, { isLoading }] = useLoginMutation();
  const loginRef = useRef();
  useCloseModalClickOutside(loginRef, () => {
    dispatch(setShowLoginModal(false));
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ username, password }) => {
    const loginData = {
      username: username,
      password: password,
      b2c: Settings.b2c,
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      console.log(result);
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const memberId = result?.result?.memberId;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);
      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (result?.result?.changePassword) {
        dispatch(setShowLoginModal(false));
        localStorage.setItem("changePassword", true);
        navigate("/change-password");
      }
      if (!result?.result?.changePassword && token && user) {
        dispatch(setShowLoginModal(false));
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  /* handle login demo user */
  const loginWithDemo = async () => {
    /* Random token generator */
    /* Encrypted the post data */
    const loginData = {
      username: "demo",
      password: "",
      b2c: Settings.b2c,
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);

      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        dispatch(setShowLoginModal(false));
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  const closeLoginModal = () => {
    dispatch(setShowLoginModal(false));
  };

  const showRegister = () => {
    closeLoginModal();
    dispatch(setShowRegisterModal(true));
  };

  const showForgotPassword = () => {
    closeLoginModal();
    dispatch(setShowForgotPasswordModal(true));
  };
  return (
    <div
      className="modal fade logsign-modal in show"
      id="loginModal"
      tabIndex={-1}
      aria-labelledby="loginModalLabel"
      style={{ display: "block", paddingLeft: "0px" }}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-custom"
        style={{ maxWidth: "100%" }}
      >
        <div className="login_box" ref={loginRef}>
          <div className="login_leftimg">
            <img
              src="https://satbet-proof.s3.amazonaws.com/login_banner.jpg"
              alt=""
            />
          </div>
          <div className="login_leftimg_mob">
            <img
              src="https://satbet-proof.s3.amazonaws.com/banner_mobile.webp"
              alt=""
            />
          </div>{" "}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="login-div d-flex align-items-center flex-column justify-content-center position-relative"
          >
            <div
              onClick={closeLoginModal}
              className="close close-login position-absolute"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="https://asset.satbet.com/images/close_btn.svg" alt="" />
            </div>
            <div className="login_logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="satbet-container">
              <div className="satbet-tabs d-flex justify-content-center">
                <div
                  className="satbet-tab satbet-tab-active text-center"
                  id="login-tab"
                >
                  Login
                </div>
              </div>
              <div
                className="form"
                id="loginForm"
                autoComplete="off"
                method="post"
                acceptCharset="utf-8"
                noValidate="novalidate"
                data-gtm-form-interact-id={0}
              >
                <input type="hidden" name="csrf_token" />
                <div className="form_group">
                  <div className="col-12 form_mob_align">
                    <label
                      className="login-error lebel-error error position-relative bottom-0"
                      htmlFor="login"
                    />
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <img
                          src="https://asset.satbet.com/images/loginusericon.png"
                          alt=""
                        />
                      </span>
                      <div className="form-floating form-floating-custom">
                        <input
                          {...register("username", { required: true })}
                          type="text"
                          className="form-control form-control-custom"
                          placeholder={"Enter Mobile Number/User Id"}
                          minLength={4}
                          maxLength={13}
                          autoComplete="off"
                        />
                        <label htmlFor="username">Username</label>
                      </div>
                      <label
                        id="username-error"
                        className="lebel-error error"
                        htmlFor="username"
                      />
                    </div>
                  </div>
                </div>
                <div className="form_group">
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <img
                        src="https://asset.satbet.com/images/password_loginicon.png"
                        alt=""
                      />
                    </span>
                    <div className="form-floating form-floating-custom">
                      <input
                        {...register("password", { required: true })}
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-custom"
                        id="password"
                        placeholder
                        name="password"
                        minLength={8}
                        maxLength={20}
                      />
                      <label htmlFor="floatingInputGroup1">Password</label>
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword((prev) => !prev)}
                        src={`${
                          showPassword
                            ? "https://asset.satbet.com/images/password_eye.png"
                            : "https://asset.satbet.com/images/password_eye_close.png"
                        }`}
                        className="position-absolute password_eye"
                        alt="shwo password"
                      />
                    </div>
                  </div>

                  <button
                    onClick={showForgotPassword}
                    style={{
                      color: "black",
                      right: "0px",
                      textDecoration: "underline",
                    }}
                    type="button"
                    className="lebel-error error"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            </div>

            <div className="satbet-login-help text-center mt-2">
              <div>
                Assistance for resolving login issues.{" "}
                <button className="need-help" type="button">
                  <a href="https://linkli.in/Help">Need Help?</a>
                </button>
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                                      .need-help {\n                                        background: #ffffff;\n                                        color: #28a745;\n                                        font-weight: bold;\n                                        font-size: var(--fontsize_12);\n                                      }\n                                      .need-help:hover {\n                                        color: #ffab06;\n                                      }\n                                    ",
                }}
              />
            </div>
            <div className="col-12 form_mob_align" style={{ flex: "0 0 auto" }}>
              <div
                className="submit-loader text-center"
                id="login_loader"
                style={{ display: isLoading ? "block" : "none" }}
              >
                <div className="loader mt-5 loader-2">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <button
                type="submit"
                className="login-btn login-btn-form"
                id="login_btn"
              >
                <span>Login</span>
              </button>

              <button
                onClick={loginWithDemo}
                type="button"
                className="login-btn login-btn-form"
                id="login_btn"
              >
                <span>Demo</span>
              </button>
              <div>
                <span>New user?</span>{" "}
                <button
                  onClick={showRegister}
                  style={{ textDecoration: "underline" }}
                >
                  Create an account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
