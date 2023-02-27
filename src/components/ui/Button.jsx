const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className="border-2 bg-[#292C6D] hover:bg-[#EC255A] text-white transition-all py-2 px-4 rounded-lg disabled:bg-slate-200 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
