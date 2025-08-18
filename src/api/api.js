import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic GET
export const get = (url, params = {}) => {
  return axiosInstance.get(url, { params });
};

// Generic POST
export const post = (url, data) => {
  return axiosInstance.post(url, data);
};

// Generic PUT
export const put = (url, data) => {
  return axiosInstance.put(url, data);
};

// Generic DELETE
export const del = (url) => {
  return axiosInstance.delete(url);
};

export default axiosInstance;
