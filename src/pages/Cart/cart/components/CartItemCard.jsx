const CartItemCard = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center h-fit w-full bg-[#FAEDF0] my-10 p-5 text-2xl hover:scale-105 shadow-md shadow-[#161853] hover:shadow-lg hover:shadow-[#161853] transition-all rounded-lg ">
      {children}
    </div>
  );
};

export default CartItemCard;
