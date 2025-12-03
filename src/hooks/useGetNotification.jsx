import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useGetNotification = () => {
  const {
    data: notification = [],
    refetch: refetchNotification,
    isFetching: isFetchingNotification,
    isFetched,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.notification}`);

      if (data.success) {
        return data?.result;
      }
    },
    gcTime: 0,
    refetchInterval: 60000,
  });

  return {
    notification,
    refetchNotification,
    isFetchingNotification,
    isFetched,
  };
};

export default useGetNotification;
