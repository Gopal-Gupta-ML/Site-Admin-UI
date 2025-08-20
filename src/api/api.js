import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * Simple GET request
 * @param {string} url - API endpoint
 * @param {object} params - Optional query params
 */
export const apiGet = async (url, params = {} , headers={}) => {
  try {
    const cookie = localStorage.getItem("Session_Code");
    const response = await axios.get(`${BASE_URL}${url}`, { params , headers: {
      Cookie: `JSESSIONID=${cookie}`, 
      ...headers,
    }, });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Simple POST request
 * @param {string} url - API endpoint
 * @param {object} data - Request body
 */
export const apiPost = async (url, data = {}) => {
  try {
    const response = await axios.post(`${BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Simple PUT request
 * @param {string} url - API endpoint
 * @param {object} data - Request body
 */
export const apiPut = async (url, data = {}) => {
  try {
    const response = await axios.put(`${BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Simple DELETE request
 * @param {string} url - API endpoint
 */
export const apiDelete = async (url) => {
  try {
    const response = await axios.delete(`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
