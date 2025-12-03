import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

const useBannerImage = () => {
  return useQuery({
    queryKey: ["bannerImage"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.banner);
      if (data?.success) {
        return data?.result?.homepage;
      }
    },
    refetchOnWindowFocus: false,
  });
};

export default useBannerImage;
