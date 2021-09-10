import * as actions from "./reducer.actions";
import { parseCookies } from "nookies";
const { isLoggedIn, userName, fullName, userId } = parseCookies("jwt");

export const initialState = {
  userDetails: {
    isLoggedIn: isLoggedIn || false,
    userName: userName || "",
    fullName: fullName || "",
    userId: userId || "",
  },
  posts: [],
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case actions.HANDLE_INPUTS:
      return {
        ...state,
        [action.field]: action.payload,
      };

    case actions.SET_LOGIN:
      return {
        ...state,
        userDetails: {
          isLoggedIn: !state.isLoggedIn,
          userName: action.payload.userDetails.userName,
          fullName: action.payload.userDetails.fullName,
          userId: action.payload.userDetails.userId,
        },
      };

    case actions.SET_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userAuthToken: null,
      };

    case actions.SET_POSTS:
      console.log(state, action.payload);
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };

    case actions.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};
