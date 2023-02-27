import React from "react";

const Filter = ({ filter, getFilterTags, children }) => {
  return (
    <label
      className={`py-2 px-4 rounded-full ${
        filter.includes(children) ? "bg-[#EC255A] text-white" : "bg-slate-200"
      } hover:bg-[#292C6D] hover:text-white transition-all mx-2 my-4 cursor-pointer`}
    >
      <input
        type="checkbox"
        value={children}
        onChange={getFilterTags}
        className="appearance-none"
      />
      {children}
    </label>
  );
};

export default Filter;
