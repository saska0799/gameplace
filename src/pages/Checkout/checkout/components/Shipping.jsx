import { useContext } from "react";
import { Link } from "react-router-dom";
import ShippingContext from "../context/ShippingContext";
import Button from "../../../../components/ui/Button";

const Shipping = ({ goToPayment }) => {
  const { name, address, city, lastName, email, shippingDispatch } =
    useContext(ShippingContext);

  return (
    <>
      <h3 className="text-2xl">Shipping address</h3>
      <form className="grid grid-cols-2">
        <div>
          <div className="flex flex-col my-10 pr-5">
            <label className="text-sm">First name *</label>
            <input
              value={name}
              onChange={(e) =>
                shippingDispatch({ type: "SET_NAME", payload: e.target.value })
              }
              type="text"
              name="First name"
              required
              className="outline-0 border-b-2 border-[#FAEDF0] focus:border-[#EC255A]"
            />
          </div>
          <div className="flex flex-col my-10 pr-5">
            <label className="text-sm">Address *</label>
            <input
              value={address}
              onChange={(e) =>
                shippingDispatch({
                  type: "SET_ADDRESS",
                  payload: e.target.value,
                })
              }
              type="text"
              name="Address"
              required
              className="outline-0 border-b-2 border-[#FAEDF0] focus:border-[#EC255A]"
            />
          </div>
          <div className="flex flex-col my-10 pr-5">
            <label className="text-sm">City</label>
            <input
              value={city}
              onChange={(e) =>
                shippingDispatch({ type: "SET_CITY", payload: e.target.value })
              }
              type="text"
              name="City"
              className="outline-0 border-b-2 border-[#FAEDF0] focus:border-[#EC255A]"
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col my-10">
            <label className="text-sm">Last name *</label>
            <input
              value={lastName}
              onChange={(e) =>
                shippingDispatch({
                  type: "SET_LAST_NAME",
                  payload: e.target.value,
                })
              }
              type="text"
              name="Last name"
              required
              className="outline-0 border-b-2 border-[#FAEDF0] focus:border-[#EC255A]"
            />
          </div>
          <div className="flex flex-col my-10">
            <label className="text-sm">Email</label>
            <input
              value={email}
              onChange={(e) =>
                shippingDispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              type="email"
              name="Email"
              className="outline-0 border-b-2 border-[#FAEDF0] focus:border-[#EC255A]"
            />
          </div>
        </div>
      </form>
      <div className="flex justify-between items-center">
        <Link
          to="/cart"
          className="border-2 border-[#FAEDF0] hover:border-[#EC255A] py-1 px-2 rounded-lg"
        >
          BACK TO CART
        </Link>
        <Button
          onClick={() => goToPayment("payment")}
          disabled={!name || !lastName || !address ? true : false}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Shipping;
