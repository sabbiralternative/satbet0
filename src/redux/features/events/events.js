import { API } from "../../../api";
import handleDecryptData from "../../../utils/handleDecryptData";
import { baseApi } from "../../api/baseApi";

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    group: builder.query({
      query: ({ sportsType }) => {
        return {
          url: `${API.groupSportsBook}/${sportsType}`,
          method: "GET",
          headers: {
            "Cache-Control": "public",
            "max-age": 1,
          },
        };
      },
      transformResponse: (data) => {
        return handleDecryptData(JSON.stringify(data));
      },
    }),
    getEventDetails: builder.query({
      query: ({ eventTypeId, eventId }) => {
        return {
          url: `${API.eventDetails}/${eventTypeId}/${eventId}`,
          method: "GET",
          headers: {
            "Cache-Control": "public",
            "max-age": 1,
          },
        };
      },
      transformResponse: (data) => {
        return handleDecryptData(JSON.stringify(data));
      },
    }),
    mac88: builder.query({
      query: () => {
        return {
          url: `${API.mac88}`,
          method: "GET",
        };
      },
    }),
    order: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.order}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    getLadder: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.ladder}/${payload.marketId}`,
          method: "POST",
          body: payload.data,
        };
      },
    }),
    editButtonValues: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.buttonValue}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    accountStatement: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.accountStatement}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    video: builder.mutation({
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
  useGetEventDetailsQuery,
  useOrderMutation,
  useGroupQuery,
  useMac88Query,
  useGetLadderMutation,
  useEditButtonValuesMutation,
  useAccountStatementMutation,
  useVideoMutation,
} = eventsApi;
