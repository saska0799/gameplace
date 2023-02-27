import React, { useCallback, useContext } from "react";
import CartContext from "../../../Cart/cart/context/CartContext";
import commerce from "../../../../lib/commerce";
import Button from "../../../../components/ui/Button";

const ProductListItem = ({ product }) => {
  const { cartDispatch } = useContext(CartContext);

  const addToCart = useCallback(
    async (productId) => {
      const item = await commerce.cart.add(productId, 1);

      cartDispatch({ type: "ADD_TO_CART", payload: item });
    },
    [cartDispatch]
  );

  return (
    <div className="w-[18rem] h-fit bg-[#FAEDF0] mx-10 mb-10 p-5 rounded-lg hover:scale-105 shadow-md shadow-[#161853] hover:shadow-lg hover:shadow-[#161853] transition-all">
      <div className="h-10rem">
        <img
          src={product.image.url}
          alt="Product"
          className="object-cover h-[18rem] w-full rounded-lg"
        />
      </div>
      <div className="my-5">
        <h2 className="text-xl">{product.name}</h2>
        <p className="text-2xl">{product.price.formatted_with_symbol}</p>
      </div>
      <Button
        className="border-2 bg-[#292C6D] hover:bg-[#EC255A] text-white transition-all py-2 px-4 rounded-lg"
        onClick={() => addToCart(product.id)}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductListItem;
