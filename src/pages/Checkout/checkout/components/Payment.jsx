import { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import commerce from "../../../../lib/commerce";
import CartContext from "../../../Cart/cart/context/CartContext";
import ShippingContext from "../context/ShippingContext";
import Button from "../../../../components/ui/Button";

const stripePromise = loadStripe(
  "pk_test_51McqMfKqFa90iUlZQYxfIrDwUsoVJJdykXbIk3lWN5NCtDd9rCGlHtMalpIBr9pLCu0DIWxYV7fvMQNjN3w6RPMA00tWSCszux"
);

const Payment = ({ token, timeout, setOrderInfo, goToShipping }) => {
  const { cartDispatch } = useContext(CartContext);
  const { name, lastName, email, address } = useContext(ShippingContext);

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    cartDispatch({ type: "UPDATE_CART", payload: newCart });
  };

  const captureCheckout = async (token, newOrder) => {
    const incomingOrder = await commerce.checkout.capture(token, newOrder);
    setOrderInfo(incomingOrder);
    refreshCart();
  };

  const submitForm = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    }
    const orderData = {
      line_items: token.line_items,
      customer: { firstname: name, lastname: lastName, email: email },
      shipping: { name: "Primary", street: address },
      payment: {
        gateway: "stripe",
        stripe: {
          payment_method_id: paymentMethod.id,
        },
      },
    };
    captureCheckout(token.id, orderData);

    timeout();

    /* Remove this if added card information in Commerce.js */
    refreshCart();
  };

  return (
    <>
      <div className="border-b-2 border-slate-200">
        <h3 className="text-2xl">Order summary</h3>
        {token.line_items.map((item) => (
          <div className="flex justify-between items-center my-8" key={item.id}>
            <div>
              <h4>{item.name}</h4>
              <p className="text-slate-400">Quantity: {item.quantity}</p>
            </div>
            <p>{item.price.formatted_with_symbol}</p>
          </div>
        ))}

        <h4 className="flex justify-between pb-5">
          Total{" "}
          <span className="font-bold">{token.total.formatted_with_symbol}</span>
        </h4>
      </div>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => submitForm(e, elements, stripe)}>
              <CardElement className="my-5" />
              <div className="flex justify-between mt-10">
                <button
                  className="border-2 border-[#FAEDF0] hover:border-[#EC255A] py-1 px-2 rounded-lg"
                  onClick={() => goToShipping("shipping")}
                >
                  BACK
                </button>
                <Button>Pay {token.total.formatted_with_symbol}</Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default Payment;
