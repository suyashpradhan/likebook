import axios from "axios";

export const addNewPost = async (postedBy, content, cookie) => {
  try {
    const response = await axios.post(
      `/api/posts/new/${postedBy}`,
      {
        content,
      },
      {
        headers: {
          Authorization: cookie,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllPosts = async (cookie) => {
  try {
    const response = await axios.get(`/api/posts/feed/`, {
      headers: {
        Authorization: cookie,
      },
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const likePost = async (postId) => {
  const { data } = await axios.put(`/api/posts/like`, { postId });
  return data;
};

export const unlikePost = async (postId) => {
  const { data } = await axios.put(`/api/posts/unlike`, { postId });
  return data;
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post("/api/register", user);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post("/api/login", user);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get("/api/users/all");
    return response;
  } catch (error) {
    return error.response.data;
  }
};
