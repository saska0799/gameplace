import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ShippingContext from "../context/ShippingContext";

const Confirmation = ({ orderInfo }) => {
  const { name, lastName } = useContext(ShippingContext);
  /* Use orderInfo instead of context if added card information in Commerce.js  */
  return (
    <div>
      <p className="mb-10">
        Thank you for your purchase, {name} {lastName}
      </p>
      <Link
        to="/"
        className="border-2 bg-[#292C6D] hover:bg-[#EC255A] text-white transition-all py-2 px-4 rounded-lg"
      >
        Back to home
      </Link>
    </div>
  );
};

export default Confirmation;
