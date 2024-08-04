import React, { createContext, useReducer } from "react";

export const cartContext = createContext();
const cartReducer = (state, action) => {
  switch (action.type) {
    case "addToCart":
      return [...state, action.pizza];
    case "remove":
      return state.filter((p) => p.id != action.id);
    case "increase":
      const IndexI = state.findIndex((p) => p.id === action.id);
      state[IndexI].quantity += 1;
      return [...state];

    case "decrease":
      const IndexD = state.findIndex((p) => p.id === action.id);
      state[IndexD].quantity -= 1;
      return [...state];

    default:
      return state;
  }
};
function CartContex({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  console.log(cart);
  return (
    <cartContext.Provider value={{ cart, dispatch }}>
      {children}
    </cartContext.Provider>
  );
}

export default CartContex;
