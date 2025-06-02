import axios from "axios";
import { getSessionToken } from "../utils/session";

const apiClient = axios.create({
  baseURL: "https://dev.backend-api.goldady.com/user-api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getSessionToken();

    if (config.method === "get") {
      config.params = {
        ...config.params,
        token,
      };
    } else {
      if (!config.data) {
        config.data = {};
      }
      config.data = {
        ...config.data,
        token,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
