import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

const useGetIndex = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["index"],
    queryFn: async () => {
      const res = await AxiosSecure.post(API.index, {
        type: "get_referral_code",
      });
      const result = res?.data;
      if (result?.success) {
        return result?.result;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { data, refetch, isLoading };
};

export default useGetIndex;
