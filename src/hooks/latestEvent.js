import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useLatestEvent = () => {
  return useQuery({
    queryKey: ["latestEvent"],
    queryFn: async () => {
      const res = await AxiosSecure.post(API.latestEvents, { type: "cup" });
      const data = res.data;

      if (data?.success) {
        return data?.result;
      }
    },
  });
};
