import { useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import commerce from "../../lib/commerce";
import CartContext from "./cart/context/CartContext";
import CartList from "./cart/components/CartList";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Cart = () => {
  const { cartDispatch, cartState } = useContext(CartContext);

  const emptyCart = async () => {
    const response = await commerce.cart.empty();
    cartDispatch({ type: "UPDATE_CART", payload: response });
  };

  const getCart = useCallback(async () => {
    const cart = await commerce.cart.retrieve();
    cartDispatch({ type: "UPDATE_CART", payload: cart });
  }, [cartDispatch]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <section className="2xl:w-[60%] xl:w-[70%] lg:w-[85%] md:w-full mx-auto my-10">
      {cartState && cartState.total_items === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {!cartState && <LoadingSpinner />}
          {cartState && (
            <div className="flex lg:flex-row flex-col-reverse justify-between items-center lg:items-start">
              <div>
                <div className="flex justify-between w-full my-10 lg:my-0">
                  <Button onClick={emptyCart}>Empty cart</Button>
                </div>
                <CartList />
              </div>
              <div className="flex flex-col items-center justify-between text-2xl bg-slate-200 py-2 px-4 mx-10 rounded-lg h-fit w-fit">
                <div className="flex flex-col justify-center my-7">
                  <h3 className="mb-7">
                    <span className="text-slate-500">Subtotal:</span>{" "}
                    {cartState && cartState.subtotal.formatted_with_symbol}
                  </h3>
                  <Link
                    to="/checkout"
                    className="border-2 bg-[#292C6D] hover:bg-[#EC255A] text-white transition-all py-2 px-4 rounded-lg text-center"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="flex w-full justify-center items-center">
                  <span className="w-full h-[1px] bg-slate-500" />
                  <p className="text-sm px-5">or</p>
                  <span className="w-full h-[1px] bg-slate-500" />
                </div>
                <Link
                  to="/"
                  className="hover:text-[#EC255A] text-lg mt-7 transition-all py-2 px-4 rounded-lg"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Cart;
