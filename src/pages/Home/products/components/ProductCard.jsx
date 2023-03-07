const ProductCard = ({ children }) => {
  return (
    <div className="w-[18rem] h-[31rem] bg-[#FAEDF0] mx-10 mb-10 p-5 rounded-lg flex flex-col justify-between hover:scale-105 shadow-md shadow-[#161853] hover:shadow-lg hover:shadow-[#161853] transition-all">
      {children}
    </div>
  );
};

export default ProductCard;
