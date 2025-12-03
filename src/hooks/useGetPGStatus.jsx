import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useGetPGStatus = (orderId, method) => {
  const { data: pgStatus = [], refetch: refetchPGStatus } = useQuery({
    queryKey: ["pg-status"],
    enabled: method === "pg",
    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.pgStatus}`, { orderId });
      const data = res.data;
      return data;
    },
    refetchInterval: method === "pg" ? 10000 : null,
    gcTime: 0,
  });
  return { pgStatus, refetchPGStatus };
};

export default useGetPGStatus;
