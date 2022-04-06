import { useState, useEffect, useReducer, createContext } from "react";
import {cart} from "../utils/coinPOSCart"

const CoinPOSCartContext = createContext();

const initialState = {
    cart: {},
}

// combine reducer function
const combineReducers = (...reducers) => (state, action) => {
    for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
    return state;
  };
  
  // context provider
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(combineReducers(cart), initialState);
    const value = { state, dispatch };
  
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  
  export { CoinPOSCartContext, Provider };