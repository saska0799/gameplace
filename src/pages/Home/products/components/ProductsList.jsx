import Button from "../../../../components/ui/Button";
import ProductListItem from "./ProductListItem";

const ProductsList = ({ products, setLimitHandler, limit }) => {
  return (
    <>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full 2xl:w-[70%] xl:w-[75%] justify-center mt-10 relative">
        {products &&
          products.map((product) => (
            <ProductListItem product={product} key={product.id} />
          ))}
      </div>
      {products.length > 0 && products.length === limit && (
        <div className="mb-10">
          <Button
            onClick={() => setLimitHandler((prevState) => prevState + 20)}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductsList;
