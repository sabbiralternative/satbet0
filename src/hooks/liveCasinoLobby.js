import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

const useLiveCasinoLobby = (casinoType) => {
  return useQuery({
    queryKey: [`liveCasinoLobby/${casinoType}`],
    queryFn: async () => {
      const res = await AxiosSecure.post(
        `${API.liveCasinoLobby}/${casinoType}/ALL`
      );
      return res?.data?.gameList;
    },
    refetchOnWindowFocus: false,
  });
};

export default useLiveCasinoLobby;
