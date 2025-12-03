import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useSBCashOut = () => {
  return useMutation({
    mutationKey: ["sb_cashout"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.sb_cashout}`, payload);
      return data;
    },
  });
};

export default useSBCashOut;
