import axios from "axios";

import { userHelper } from "../helpers/user.helper";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      userHelper.logout();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
