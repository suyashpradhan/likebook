import axios from "axios";
const baseURL = process.env.NODE_ENV === "production" ? "" : "http://localhost";

export default baseURL;

export const addPost = async (authUserId, post) => {
  const { data } = await axios.post(`/api/posts/new/${authUserId}`, post);
  return data;
};

export const likePost = async (postId) => {
  const { data } = await axios.put(`/api/posts/like`, { postId });
  return data;
};

export const unlikePost = async (postId) => {
  const { data } = await axios.put(`/api/posts/unlike`, { postId });
  return data;
};

export const getPostsByUser = async (userId) => {
  const { data } = await axios.get(`/api/posts/by/${userId}`);
  return data;
};

export const registerUser = async (user) => {
  const { data } = await axios.post("/api/auth/register", user);
  return data;
};

export const loginUser = async (user) => {
  const { data } = await axios.post("/api/auth/login", user);
  return data;
};
