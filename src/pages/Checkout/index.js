import { useEffect, useState, useCallback, useContext } from "react";
import commerce from "../../lib/commerce";
import CartContext from "../Cart/cart/context/CartContext";
import Shipping from "./checkout/components/Shipping";
import Payment from "./checkout/components/Payment";
import Confirmation from "./checkout/components/Confirmation";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Checkout = () => {
  const { cartState } = useContext(CartContext);
  const [token, setToken] = useState();
  const [order, setOrder] = useState({});
  const [checkout, setCheckout] = useState("shipping");
  const [loading, setLoading] = useState(false);

  const timeout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCheckout("confirmation");
    }, 3000);
  };

  const getToken = useCallback(async () => {
    const token = await commerce.checkout.generateToken(cartState.id, {
      type: "cart",
    });
    setToken(token);
  }, [cartState]);

  const setCheckoutStage = (stage) => {
    setCheckout(stage);
  };

  const setOrderInfo = (incomingOrder) => setOrder(incomingOrder);

  useEffect(() => {
    if (cartState.id) {
      getToken();
    }
  }, [getToken, cartState]);

  return (
    <section className="w-full flex justify-center my-10">
      {!token && <LoadingSpinner />}
      {token && (
        <div className="md:w-[600px] w-full m-auto p-5 md:border-2 border-[#FAEDF0] flex flex-col justify-center">
          <h2 className="text-4xl text-center mb-10">Checkout</h2>
          <div
            className={`flex items-center w-[80%] mx-auto mb-10 ${
              checkout === "confirmation" && "hidden"
            }`}
          >
            <span
              className={`h-[26px] w-[26px] bg-[#EC255A]  rounded-full flex justify-center items-center text-white`}
            >
              1
            </span>
            <span
              className={`w-full h-[2px] ${
                checkout === "payment" ? "bg-[#EC255A]" : "bg-slate-200"
              } transition-colors ease-in duration-500`}
            />
            <span
              className={`h-[26px] w-[26px] ${
                checkout === "payment" ? "bg-[#EC255A]" : "bg-slate-200 "
              } rounded-full flex justify-center items-center text-white transition-colors ease-in-out duration-700`}
            >
              2
            </span>
          </div>
          {checkout === "shipping" && (
            <Shipping goToPayment={setCheckoutStage} />
          )}
          {!loading && checkout === "payment" && (
            <Payment
              token={token}
              timeout={timeout}
              goToShipping={setCheckoutStage}
              setOrderInfo={setOrderInfo}
            />
          )}
          {loading && <LoadingSpinner />}
          {!loading && checkout === "confirmation" && (
            <Confirmation orderInfo={order} />
          )}
        </div>
      )}
    </section>
  );
};

export default Checkout;
