import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useSingleProfitLoss = (marketId) => {
  return useQuery({
    queryKey: ["single-Passbook", marketId],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.settledBets}/${marketId}`);
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
