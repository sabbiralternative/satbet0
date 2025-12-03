import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useWhatsApp = () => {
  return useQuery({
    queryKey: ["whatsapp"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.whatsapp);

      return data?.result;
    },
  });
};

export default useWhatsApp;
