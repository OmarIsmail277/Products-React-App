import axios from "axios";

export const axiosInterceptor = axios.create({
  baseURL: "https://dummyjson.com",
  header: {},
});
