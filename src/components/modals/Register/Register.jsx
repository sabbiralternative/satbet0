import { useDispatch } from "react-redux";
import { useLogo } from "../../../context/ApiProvider";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetOtpMutation,
  useRegisterMutation,
} from "../../../redux/features/auth/authApi";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import toast from "react-hot-toast";
import { Settings } from "../../../api";
import { setUser } from "../../../redux/features/auth/authSlice";
import {
  setShowBanner,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import useWhatsApp from "../../../hooks/whatsapp";

const Register = () => {
  const { data: socialLink } = useWhatsApp();
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [order, setOrder] = useState({});
  const [timer, setTimer] = useState(null);
  const referralCode = localStorage.getItem("referralCode");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [getOTP] = useGetOtpMutation();
  const [handleRegister, { isLoading }] = useRegisterMutation();
  const { register, handleSubmit } = useForm();

  const registerRef = useRef();
  useCloseModalClickOutside(registerRef, () => {
    closeModal();
  });

  const handleOTP = async () => {
    const res = await getOTP({ mobile }).unwrap();
    if (res?.success) {
      setTimer(60);
      setOrder({
        orderId: res?.result?.orderId,
        otpMethod: "sms",
      });
      toast.success(res?.result?.message);
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };

  const onSubmit = async (data) => {
    const registerData = {
      username: data?.username,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      mobile: mobile,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      referralCode: referralCode || data?.referralCode,
      orderId: order.orderId,
      otpMethod: order.otpMethod,
    };

    const result = await handleRegister(registerData).unwrap();

    if (result.success) {
      if (window?.fbq) {
        window.fbq("track", "CompleteRegistration", {
          content_name: "User Signup",
          status: "success",
        });
      }
      localStorage.removeItem("referralCode");
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const memberId = result?.result?.memberId;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;
      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("bonusToken", bonusToken);
      localStorage.setItem("token", token);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        dispatch(setShowRegisterModal(false));
        toast.success("Register successful");
      }
    } else {
      toast.error(result?.error?.description);
    }
  };

  const closeModal = () => {
    dispatch(setShowRegisterModal(false));
  };

  const showLogin = () => {
    closeModal();
    dispatch(setShowLoginModal(true));
  };

  const getWhatsAppId = (link) => {
    window.open(link, "_blank");
  };
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(null);
    }
  }, [timer]);
  return (
    <div
      className="modal fade logsign-modal in show"
      id="signupModal"
      tabIndex={-1}
      aria-labelledby="loginModalLabel"
      style={{ display: "block" }}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-custom"
        style={{ maxWidth: "100%" }}
      >
        <div className="login_box justify-content-center" ref={registerRef}>
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
          <div className="login-div signup_div d-flex align-items-center flex-column justify-content-center position-relative">
            <div
              className="close close-login position-absolute"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img
                onClick={closeModal}
                src="https://asset.satbet.com/images/close_btn.svg"
                alt="icons"
                loading="lazy"
              />
            </div>
            <div className="login_logo">
              <img
                src={logo}
                width={150}
                height={48}
                alt="logo"
                loading="lazy"
              />
            </div>
            <div className="satbet-container">
              <div className="satbet-tabs d-flex justify-content-center">
                <div
                  className="satbet-tab satbet-tab-active text-center"
                  id="login-tab"
                >
                  Signup
                </div>
              </div>
              <div className="signup_topbutton_group text-center">
                <p>Now Create an Account</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="form"
                id="registerForm"
                autoComplete="off"
                method="post"
                acceptCharset="utf-8"
                noValidate="novalidate"
                data-gtm-form-interact-id={0}
              >
                <div className="row">
                  <div className="row position-relative mobile_field_align">
                    <div style={{ paddingLeft: "0px" }} className="col-4">
                      <div className="dropdown country-flag-code-dropdown">
                        <button
                          className="btn country-flag-code-btn dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div className="phone-code phone-flag-code">
                            <img
                              src="https://asset.satbet.com/images/india-flag.png"
                              className="flag-img"
                              loading="lazy"
                            />
                            <span id="selectedCountryCode">+91</span>
                          </div>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li>
                            <a
                              className="dropdown-item country-option"
                              data-code={+91}
                              href="#"
                            >
                              {" "}
                              <img
                                src="https://asset.satbet.com/images/india-flag.png"
                                className="flag-img"
                                loading="lazy"
                              />{" "}
                              +91{" "}
                            </a>
                          </li>
                        </ul>
                        <input
                          type="hidden"
                          id="country_code"
                          name="country_code"
                          defaultValue={+91}
                        />
                      </div>
                    </div>
                    {/* Mobile Number Input */}
                    <div className="col-8 mobile_field_align">
                      <div className="input-group mb-3">
                        <div className="form-floating form-floating-custom form-floating-custom-mob-no">
                          <input
                            onChange={(e) => setMobile(e.target.value)}
                            type="text"
                            name="mobile_no"
                            value={mobile}
                            id="mobile_no"
                            className="form-control number_only"
                            autoComplete="off"
                            minLength={10}
                            maxLength={10}
                            placeholder
                            data-gtm-form-interact-field-id={4}
                          />
                          <label
                            htmlFor="floatingInputGroup1"
                            className="mobno_field"
                          >
                            Mobile Number
                          </label>
                          {timer > 0 ? (
                            <div
                              id="sendotp"
                              className="sendotp"
                              type="button"
                              style={{ display: "block" }}
                            >
                              Try in {timer}s
                            </div>
                          ) : (
                            <button
                              onClick={handleOTP}
                              id="sendotp"
                              className="sendotp"
                              type="button"
                              style={{ display: "block" }}
                            >
                              send OTP
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <label
                      id="mobile_no-error"
                      className="lebel-error error error_mob"
                      htmlFor="mobile_no"
                    />
                    <label
                      id="otp_response-error"
                      className="lebel-error error error_mob"
                      htmlFor="otp_response"
                    />
                  </div>
                  {/* OTP start here */}
                  <div
                    style={{ paddingLeft: "0px" }}
                    className="row position-relative mobile_field_align"
                    id="otp_div"
                  >
                    <div className="col-12 mobile_field_align">
                      <div className="input-group mb-3">
                        <div className="form-floating form-floating-custom form-floating-custom-mob-no">
                          <input
                            {...register("otp", { required: true })}
                            type="text"
                            name="input_otp"
                            defaultValue
                            id="input_otp"
                            className="form-control number_only"
                            autoComplete="off"
                            placeholder
                            maxLength={6}
                          />
                          <label
                            htmlFor="floatingInputGroup1"
                            className="mobno_field"
                          >
                            Enter OTP
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form_group">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <img
                            src="https://asset.satbet.com/images/loginusericon.png"
                            alt="icons"
                            loading="lazy"
                          />
                        </span>
                        <div className="form-floating form-floating-custom">
                          <input
                            {...register("username", { required: true })}
                            type="text"
                            className="form-control form-control-custom"
                            id="reg_username"
                            placeholder
                            minLength={4}
                            maxLength={13}
                            name="username"
                            autoComplete="off"
                            data-gtm-form-interact-field-id={1}
                          />
                          <label htmlFor="floatingInputGroup1">Username</label>
                        </div>
                      </div>
                      <label
                        id="reg_username-error"
                        className="lebel-error error"
                        htmlFor="reg_username"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form_group">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <img
                            src="https://asset.satbet.com/images/password_loginicon.png"
                            alt="icons"
                            loading="lazy"
                          />
                        </span>
                        <div className="form-floating form-floating-custom">
                          <input
                            {...register("password", { required: true })}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            defaultValue
                            minLength={8}
                            maxLength={20}
                            id="reg_password"
                            className="form-control form-control-custom"
                            autoComplete="off"
                            placeholder
                            data-gtm-form-interact-field-id={2}
                          />
                          <label htmlFor="floatingInputGroup1">Password</label>
                          <img
                            onClick={() => setShowPassword((prev) => !prev)}
                            src={`${
                              showPassword
                                ? "https://asset.satbet.com/images/password_eye.png"
                                : "https://asset.satbet.com/images/password_eye_close.png"
                            }`}
                            className="position-absolute password_eye"
                            alt="shwo password"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form_group">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <img
                            src="https://asset.satbet.com/images/password_loginicon.png"
                            alt="icons"
                            loading="lazy"
                          />
                        </span>
                        <div className="form-floating form-floating-custom">
                          <input
                            {...register("confirmPassword", { required: true })}
                            type={showConfirmPassword ? "text" : "password"}
                            name="c_password"
                            defaultValue
                            id="c_password"
                            minLength={8}
                            maxLength={20}
                            className="form-control form-control-custom"
                            autoComplete="off"
                            placeholder
                            data-gtm-form-interact-field-id={3}
                          />
                          <label htmlFor="floatingInputGroup1">
                            Confirm Password
                          </label>
                          <img
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            src={`${
                              showConfirmPassword
                                ? "https://asset.satbet.com/images/password_eye.png"
                                : "https://asset.satbet.com/images/password_eye_close.png"
                            }`}
                            className="position-absolute password_eye"
                            alt="shwo password"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Referral Start */}
                <div className="col-12">
                  <div className="form_group">
                    <div className="input-group mb-3">
                      <div className="form-floating form-floating-custom">
                        <input
                          readOnly={referralCode}
                          {...register("referralCode")}
                          type="text"
                          className="form-control form-control-custom"
                          autoComplete="off"
                          placeholder="Enter referral code(Optional)"
                          defaultValue={referralCode}
                        />
                        <label htmlFor="floatingInputGroup1">
                          Referral Code
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* OTP end here */}

                <div className="row position-relative mobile_field_align text-center">
                  <div className="satbet-login-help text-center">
                    <label className="unique-switch unique-switch-signup">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        data-gtm-form-interact-field-id={0}
                      />
                      <span className="unique-slider round" />
                    </label>
                    I agree to{" "}
                    <a className="need-help" href="/terms-and-conditions">
                      Terms &amp; Conditions
                    </a>
                  </div>
                  <label
                    id="terms-error"
                    className="lebel-error error error-toggle position-relative"
                    htmlFor="terms"
                  />
                </div>
                <div className="col-12 form_mob_align">
                  <div
                    className="submit-loader text-center"
                    id="signup_loader"
                    style={{ display: isLoading ? "block" : "none" }}
                  >
                    <div className="loader mt-5 loader-2">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <button type="submit" className="login-btn" id="signup_btn">
                    <span>Register</span>
                  </button>
                  <div>
                    <span>Already have an account?</span>{" "}
                    <button
                      type="button"
                      onClick={showLogin}
                      style={{ textDecoration: "underline" }}
                    >
                      Login
                    </button>
                  </div>
                  <div className="or_section">
                    <div className="signup_sepline"></div>
                    <div className="or_sepline">
                      <p className="text-center">OR</p>
                    </div>
                  </div>
                  <button
                    onClick={() => getWhatsAppId(socialLink?.whatsapplink)}
                    type="button"
                    className="login-btn"
                    id="signup_btn"
                  >
                    <span>Get ID on Whatsapp</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
