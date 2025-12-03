import { API } from "../../../api";
import { baseApi } from "../../api/baseApi";

export const casinoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLiveCasinoThumbnail: builder.query({
      query: () => {
        return {
          url: `${API.casino}`,
          method: "GET",
        };
      },
    }),
    mac88All: builder.query({
      query: () => {
        return {
          url: `${API.mac88All}`,
          method: "GET",
        };
      },
    }),
    liveCasinoIframe: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.liveCasinoIframe}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    accessToken: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.accessToken}`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useGetLiveCasinoThumbnailQuery,
  useMac88AllQuery,
  useLiveCasinoIframeMutation,
  useAccessTokenMutation,
} = casinoApi;
