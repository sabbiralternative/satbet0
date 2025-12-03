import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../api";
import { logout } from "../redux/features/auth/authSlice";

export const useBalance = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ["balance", token],
    enabled: token ? true : false,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.balance);

      if (res?.data?.success === false && token) {
        dispatch(logout());
      } else if (res?.data?.success && token) {
        const data = res.data?.result;
        return data;
      }
    },
    refetchInterval: 6000,
  });
};

export default useBalance;
