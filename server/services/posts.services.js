import axios from "axios";

export const addNewPost = async ({ userId, content }) => {
  try {
    const response = await axios.post("http://localhost:3000/api/user/feed", {
      userId,
      content,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
