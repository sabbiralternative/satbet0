import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useLotusHomeLobby = (payload) => {
  return useQuery({
    queryKey: [`lotus_lobby_home`, payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.lotusHomeLobby}`, payload);

      return data;
    },
    refetchOnWindowFocus: false,
  });
};
