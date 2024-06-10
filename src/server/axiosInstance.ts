import axios from "axios";
// import { getSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

const api = axios.create({
  baseURL: "https://welbi.org/api",
});

api.interceptors.request.use(
  async (config) => {
    const session = await getServerAuthSession();
    if (session?.user?.token) {
      // console.log("Setting Authorization Header:", session.user.token);
      config.headers.Authorization = `Bearer ${session.user.token}`;
    } else {
      // console.log("No token found in session");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
