import { API } from "../../../api";
import { baseApi } from "../../api/baseApi";

export const depositApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bankAccount: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.bankAccount}`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const { useBankAccountMutation } = depositApi;
