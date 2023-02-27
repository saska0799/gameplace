import { useRef, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import commerce from "../../lib/commerce";
import ProductsContext from "../../pages/Home/products/context/ProductsContext";

const Search = () => {
  const { productsDispatch } = useContext(ProductsContext);
  const searchRef = useRef();

  const searchStore = async () => {
    const { data } = await commerce.products.list(
      searchRef.current.value !== "" && {
        query: searchRef.current.value,
      }
    );
    productsDispatch({ type: "SET_PRODUCTS", payload: data });
  };

  return (
    <label className="flex items-center bg-slate-200 p-2 px-5 lg:w-[30%] sm:w-[50%] w-[75%] rounded-full sm:order-3 lg:order-2 order-2">
      <input
        type="text"
        className="outline-0 w-full bg-slate-200"
        ref={searchRef}
      />
      <AiOutlineSearch
        className="h-[25px] w-auto cursor-pointer hover:fill-[#EC255A]"
        onClick={searchStore}
      />
    </label>
  );
};

export default Search;
