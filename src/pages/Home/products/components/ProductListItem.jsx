import { useCallback, useContext } from "react";
import commerce from "../../../../lib/commerce";
import CartContext from "../../../Cart/cart/context/CartContext";
import ProductCard from "./ProductCard";
import Button from "../../../../components/ui/Button";

const ProductListItem = ({ product }) => {
  const { cartDispatch } = useContext(CartContext);

  const addToCart = useCallback(
    async (productId) => {
      const item = await commerce.cart.add(productId, 1);

      cartDispatch({ type: "UPDATE_CART", payload: item });
    },
    [cartDispatch]
  );

  return (
    <ProductCard>
      <div className="my-5">
        <div className="h-10rem mb-3">
          <img
            src={product.image.url}
            alt="Product"
            className="object-cover h-[18rem] w-full rounded-lg"
          />
        </div>
        <h2 className="text-xl" title={product.name}>
          {product.name.length > 20
            ? `${product.name.slice(0, 20)}...`
            : product.name}
        </h2>
        <p className="text-2xl font-semibold">
          {product.price.raw === 0
            ? "Free"
            : product.price.formatted_with_symbol}
        </p>
      </div>
      <Button
        className="border-2 bg-[#292C6D] hover:bg-[#EC255A] text-white transition-all py-2 px-4 rounded-lg"
        onClick={() => addToCart(product.id)}
      >
        Add to cart
      </Button>
    </ProductCard>
  );
};

export default ProductListItem;
