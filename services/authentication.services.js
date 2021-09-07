import axios from "axios";

export const registerUser = async ({ fullName, userName, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/register",
      {
        fullName,
        userName,
        password,
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async ({ userName, password }) => {
  try {
    const response = await axios.post("http://localhost:3000/api/user/login", {
      userName,
      password,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};
