import toast from "react-hot-toast";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const getOtpOnWhatsapp = async (mobileNo, setOrderId, setShowRegister) => {
  const otpData = {
    mobile: mobileNo,
    type: "otpsend",
  };

  const res = await AxiosSecure.post(API.otpless, otpData);
  const data = res.data;

  if (data?.success) {
    setOrderId({
      orderId: data?.result?.orderId,
      otpMethod: "whatsapp",
    });
    toast.success(data?.result?.message);
    setShowRegister(true);
  } else {
    toast.error(data?.error?.errorMessage);
  }
};

export default getOtpOnWhatsapp;
