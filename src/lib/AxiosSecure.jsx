import axios from "axios";
import handleRandomToken from "../utils/handleRandomToken";
import { Settings } from "../api";
import handleEncryptData from "../utils/handleEncryptData";

export const AxiosSecure = axios.create({
  baseURL: "",
});

// Add a request interceptor
AxiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config?.method === "post") {
      const generatedToken = handleRandomToken();

      let payload = {
        ...config.data,
        token: generatedToken,
        site: Settings.siteUrl,
      };

      if (Settings.language) {
        payload.language = localStorage.getItem("language") || "english";
      }

      const encryptedData = handleEncryptData(payload);
      config.data = encryptedData;
    }
    return config;
  },
  async function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosSecure.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
