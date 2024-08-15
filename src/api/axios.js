import axios from "axios";

// FOR LOCAL
// const BASE_URL = "http://127.0.0.1:8000/api";

// FOR SERVER
const BASE_URL = "https://nogaproject.onrender.com/api";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://nogaproject.onrender.com/api",
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://nogaproject.onrender.com/api",
  },
  withCredentials: true,
});

export const axiosPrivateEmployee = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "https://nogaproject.onrender.com/api",
  },
  withCredentials: true,
});
