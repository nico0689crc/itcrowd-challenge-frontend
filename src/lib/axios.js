import axios from "axios";
import getToken from "./getToken.js";

export const createAxiosRequest = () => {
  const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 30000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const token = getToken();

  request.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers,
        Authorization: `Barrer ${token ? token : ""}`,
      };
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return request;
};
