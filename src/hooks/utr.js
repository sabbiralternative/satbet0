import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../api";

const useUTR = () => {
  return useMutation({
    mutationKey: ["utr"],
    mutationFn: async (filePath) => {
      const { data } = await axios.post(`${API.utr}`, { filePath });
      return data;
    },
    gcTime: 0,
  });
};

export default useUTR;
