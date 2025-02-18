import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login/`, { username, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register/`, userData);
  return response.data;
};
