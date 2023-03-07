import { useContext, useEffect, useCallback, useState } from "react";
import commerce from "../../lib/commerce";
import ProductsContext from "./products/context/ProductsContext";
import CartContext from "../Cart/cart/context/CartContext";
import ProductsList from "./products/components/ProductsList";
import Filter from "../../components/ui/Filter";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Home = () => {
  const { productsState, productsDispatch } = useContext(ProductsContext);
  const { cartDispatch } = useContext(CartContext);
  const [filter, setFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortDirection, setSortDirection] = useState(false);
  const [limit, setLimit] = useState(20);

  const setLimitHandler = (itemsPerPage) => setLimit(itemsPerPage);

  const getFilterTags = (e) => {
    if (e.target.checked) {
      setFilter([...filter, e.target.value]);
    } else {
      setFilter(filter.filter((tag) => tag !== e.target.value));
    }
  };
  const getCart = useCallback(async () => {
    const cart = await commerce.cart.retrieve();
    cartDispatch({ type: "UPDATE_CART", payload: cart });
  }, [cartDispatch]);

  const getCategories = useCallback(async () => {
    const { data } = await commerce.categories.list();
    setCategories(data);
  }, []);

  const getProductsAndCart = useCallback(async () => {
    const { data } = await commerce.products.list({
      category_slug: filter,
      sortBy: sortDirection ? "name" : "price",
      limit: limit,
    });
    getCategories();

    productsDispatch({ type: "SET_PRODUCTS", payload: data });
    getCart();
  }, [productsDispatch, getCart, getCategories, filter, limit, sortDirection]);

  useEffect(() => {
    getProductsAndCart();
  }, [getProductsAndCart]);

  return (
    <section className="h-fit flex flex-col justify-center items-center">
      {productsState &&
        productsState.length === 0 &&
        categories.length === 0 && <LoadingSpinner />}

      {categories.length !== 0 && (
        <div className="sm:sticky flex items-center justify-center flex-wrap lg:top-[12vh] top-[30vh] bg-white w-full h-fit py-4 z-[999] text-center">
          {categories.map((categorie) => (
            <Filter
              filter={filter}
              getFilterTags={getFilterTags}
              key={categorie.id}
            >
              {categorie.slug}
            </Filter>
          ))}
          <Button
            onClick={() => setSortDirection((prevState) => !prevState)}
            className="mx-24"
          >
            sort by {sortDirection ? "price" : "name"}
          </Button>
        </div>
      )}

      {!productsState && <p>No products to show.</p>}
      {productsState && (
        <ProductsList
          products={productsState}
          setLimitHandler={setLimitHandler}
          limit={limit}
        />
      )}
    </section>
  );
};

export default Home;
