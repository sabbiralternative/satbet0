import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useExposure = (eventId) => {
  return useQuery({
    queryKey: ["exposure"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(
        `${API.exposure}/${eventId || "sports"}`
      );

      if (data.success) {
        return data.result;
      }
    },
  });
};
