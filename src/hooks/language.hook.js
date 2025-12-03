import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useGetLanguage = () => {
  return useQuery({
    queryKey: ["language"],
    queryFn: async () => {
      const { data } = await AxiosSecure.get(API.language);
      return data;
    },
  });
};
