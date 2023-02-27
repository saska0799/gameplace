import spinner from "../../assets/loading-gif.gif";

const LoadingSpinner = () => {
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default LoadingSpinner;
