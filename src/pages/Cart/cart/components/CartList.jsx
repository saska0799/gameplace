import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import CartListItem from "./CartListItem";

const CartList = () => {
  const { cartState } = useContext(CartContext);
  return (
    <>
      {cartState &&
        cartState.line_items.map((item) => (
          <CartListItem item={item} key={item.id} />
        ))}
    </>
  );
};

export default CartList;
