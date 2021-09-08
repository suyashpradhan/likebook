import * as actions from "./reducer.actions";

export const initialState = {
  userLoginDetails: {
    isLoggedIn: false,
    userAuthToken: null,
  },
  userName: "",
  password: "",
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
        isLoggedIn: true,
        userAuthToken: action.payload.token,
        userDetails: {
          userName: action.payload,
          fullName: action.payload,
        },
      };
    case actions.SET_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userAuthToken: null,
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
