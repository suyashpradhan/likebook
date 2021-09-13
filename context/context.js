import { createContext, useContext, useReducer } from "react";
import { initialState, stateReducer } from "../reducers/auth-reducer";

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
