import { createContext, useReducer } from "react";

import { cartReducer } from "./CartReducer";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialCart = undefined;

  const [cartState, cartDispatch] = useReducer(cartReducer, initialCart);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
