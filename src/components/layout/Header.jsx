import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from "../../assets/logo.png";
import CartContext from "../../pages/Cart/cart/context/CartContext";
import Search from "../ui/Search";

const Header = () => {
  const { cartState } = useContext(CartContext);

  return (
    <header className="lg:h-[12vh] h-[30vh] px-10 bg-[#161853] flex flex-wrap lg:flex-nowrap justify-between items-center z-[999] sm:sticky top-0">
      <Link
        to="/"
        className="text-4xl lg:text-6xl text-white flex items-center order-1"
      >
        <img src={logo} alt="logo" className="lg:w-24 md:w-20 w-12 mr-10" />
        GamePlace
      </Link>
      <Search />
      <Link
        to="/cart"
        relative="path"
        className="flex justify-center items-center text-white hover:text-[#EC255A] text-2xl treansition duration-700 sm:order-2 lg:order-3 order-3 md:mx-10"
      >
        <AiOutlineShoppingCart className="fill-white hover:fill-[#EC255A] w-8 h-auto hover:rotate-[360deg] transition duration-700" />{" "}
        ({cartState && cartState.total_items})
      </Link>
    </header>
  );
};

export default Header;
