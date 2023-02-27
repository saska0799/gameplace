import { createContext, useReducer } from "react";

import { productsReducer } from "./ProductsReducer";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const initialState = [];

  const [productsState, productsDispatch] = useReducer(
    productsReducer,
    initialState
  );

  return (
    <ProductsContext.Provider value={{ productsState, productsDispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
