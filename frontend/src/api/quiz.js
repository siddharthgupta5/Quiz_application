import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getQuizzes = async () => {
  const response = await axios.get(`${API_URL}/quizzes/`);
  return response.data;
};

export const getQuizDetail = async (id) => {
  const response = await axios.get(`${API_URL}/quizzes/${id}/`);
  return response.data;
};

export const submitQuiz = async (id, answers) => {
  const response = await axios.post(`${API_URL}/quizzes/${id}/submit/`, { answers });
  return response.data;
};
