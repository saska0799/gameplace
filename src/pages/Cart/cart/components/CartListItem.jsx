import { useContext } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import CartContext from "../context/CartContext";
import commerce from "../../../../lib/commerce";

const CartListItem = ({ item }) => {
  const { cartDispatch } = useContext(CartContext);

  const removeFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);
    cartDispatch({ type: "REMOVE_FROM_CART", payload: response });
  };

  const updateItemQuantity = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    cartDispatch({ type: "SET_CART", payload: response });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center h-fit w-full bg-[#FAEDF0] my-10 p-5 text-2xl hover:scale-105 shadow-md shadow-[#161853] hover:shadow-lg hover:shadow-[#161853] transition-all rounded-lg ">
      <div className="flex items-center sm:h-[90%] h-[70%]">
        <img
          src={item.image.url}
          alt=""
          className="object-cover sm:h-[13vh] h-[15vh] rounded-lg"
        />
        <h2 className="mx-5 text-xl">{item.name}</h2>
      </div>
      <div className="flex items-center mt-10 sm:mt-0">
        <div className="flex mr-10 justify-center items-center">
          <button
            className="w-10 h-10 bg-white rounded-full hover:bg-[#EC255A] hover:text-white transition-all"
            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <p className="mx-3">{item.quantity}</p>
          <button
            className="w-10 h-10 bg-white rounded-full hover:bg-[#EC255A] hover:text-white transition-all"
            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <p className="text-xl">{item.price.formatted_with_symbol}</p>
        <TiDeleteOutline
          className="ml-5 cursor-pointer hover:fill-red-500"
          onClick={() => removeFromCart(item.id)}
        />
      </div>
    </div>
  );
};

export default CartListItem;
