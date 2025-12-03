import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useWithdrawBreakdown = () => {
  return useQuery({
    queryKey: ["withdraw-breakdown"],

    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.withdrawBreakdown}`);
      const data = res.data;
      if (data.success) {
        return data.result;
      }
    },
    gcTime: 0,
  });
};

export default useWithdrawBreakdown;
