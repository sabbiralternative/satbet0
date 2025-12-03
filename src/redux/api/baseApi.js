// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery,
//   endpoints: () => ({}),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import handleRandomToken from "../../utils/handleRandomToken";
import handleEncryptData from "../../utils/handleEncryptData";
import { Settings } from "../../api";

const baseQuery = async (args, api, extraOptions) => {
  const { method, body } = args;
  // const token = api.getState().auth.token;

  // Inject universal data for POST requests
  if (method === "POST") {
    const generatedToken = handleRandomToken();
    let payload = {
      ...body,
      token: generatedToken,
      site: Settings.siteUrl,
    };
    if (Settings.language) {
      payload.language = localStorage.getItem("language") || "english";
    }

    const encryptedData = handleEncryptData(payload);
    args.body = encryptedData; // Update the body with encrypted data
  }

  // Add authorization header
  // const headers = args.headers || new Headers();

  // if (token) {
  //   headers.set("Authorization", `Bearer ${token}`);
  // }
  // args.headers = headers;

  // Use fetchBaseQuery to send the request
  return fetchBaseQuery({
    baseUrl: "", // Add your base URL here
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
});
