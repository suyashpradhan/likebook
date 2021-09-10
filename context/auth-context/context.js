import { createContext, useContext, useReducer } from "react";
import {
  initialState,
  authReducer,
} from "../../reducers/auth-reducer/auth-reducer";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
