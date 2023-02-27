import { createContext, useReducer } from "react";
import { shippingReducer } from "./ShippingReducer";

const ShippingContext = createContext();

export const ShippingProvider = ({ children }) => {
  const initialShippingInfo = {
    name: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  };

  const [shippingState, shippingDispatch] = useReducer(
    shippingReducer,
    initialShippingInfo
  );
  return (
    <ShippingContext.Provider value={{ ...shippingState, shippingDispatch }}>
      {children}
    </ShippingContext.Provider>
  );
};

export default ShippingContext;
