import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

const useGetAllMac88 = () => {
  return useQuery({
    queryKey: ["all-mac-88"],
    queryFn: async () => {
      const res = await AxiosSecure.get(API.mac88All);

      const result = res?.data;
      if (result?.success) {
        return result?.result;
      }
    },
  });
};

export default useGetAllMac88;
