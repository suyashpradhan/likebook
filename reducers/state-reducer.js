import * as actions from "./reducer.actions";
import { parseCookies } from "nookies";
const { isLoggedIn, userName, fullName, userId } = parseCookies("jwt");

// State Initial State
export const initialState = {
  isLoggedIn: false,
  userDetails: {
    userName: "",
    fullName: "",
    userId: "",
  },
  posts: [],
};

// State Reducer Function
export const stateReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_LOGIN:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
        userDetails: {
          userName: action.payload.userDetails.userName,
          fullName: action.payload.userDetails.fullName,
          userId: action.payload.userDetails.userId,
        },
      };

    case actions.SET_POSTS:
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };

    case actions.UPDATE_POST:
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, action.payload.postIndex),
          action.payload.post,
          ...state.posts.slice(action.payload.postIndex + 1),
        ],
      };

    case actions.ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };

    case actions.TOGGLE_LIKE:
      return {
        ...state,
        likesCount: action.payload.likes.length,
      };

    case actions.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    case actions.SET_LOGOUT:
      return {
        ...state,
        posts: action.payload,
        isLoggedIn: false,
        userDetails: {
          userName: "",
          fullName: "",
          userId: "",
        },
      };

    default:
      return state;
  }
};
