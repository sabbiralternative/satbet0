import { useDispatch } from "react-redux";
import { useLogo } from "../../../context/ApiProvider";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useForgotPasswordMutation,
  useGetOtpMutation,
} from "../../../redux/features/auth/authApi";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import toast from "react-hot-toast";
import { Settings } from "../../../api";

import {
  setShowForgotPasswordModal,
  setShowLoginModal,
} from "../../../redux/features/global/globalSlice";

const ForgotPassword = () => {
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [order, setOrder] = useState({});
  const [timer, setTimer] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [getOTP] = useGetOtpMutation();
  const [handleForgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { register, handleSubmit } = useForm();

  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    closeForgotPasswordModal();
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
    const forgotPasswordData = {
      username: mobile,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      orderId: order.orderId,
      otpMethod: order.otpMethod,
    };

    const result = await handleForgotPassword(forgotPasswordData).unwrap();
    if (result.success) {
      toast.success("Password updated successfully");
      closeForgotPasswordModal();
      dispatch(setShowLoginModal(true));
    } else {
      toast.error(result?.error?.loginName?.[0]?.description);
    }
  };

  const closeForgotPasswordModal = () => {
    dispatch(setShowForgotPasswordModal(false));
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
        <div className="login_box justify-content-center" ref={ref}>
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
                onClick={closeForgotPasswordModal}
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
                  Forgot Password
                </div>
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
                            <button
                              id="sendotp"
                              className="sendotp"
                              type="button"
                              style={{ display: "block", cursor: "auto" }}
                            >
                              Try in {timer}s
                            </button>
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
                    <span>Change Password</span>
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

export default ForgotPassword;
