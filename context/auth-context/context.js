import { createContext, useContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  userDetails: {
    userName: "",
    fullName: "",
    userId: "",
  },
  error: "",
  posts: [],
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userDetails: {
          userName: action.payload.userDetails.userName,
          fullName: action.payload.userDetails.fullName,
          userId: action.payload.userDetails.userId,
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };

    case "SET_POSTS":
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
