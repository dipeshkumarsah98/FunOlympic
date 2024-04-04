import React from "react";

function FOButton({ children, ...rest }) {
  return (
    <button
      {...rest}
      className="rounded-md bg-c-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-c-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-orange-600"
    >
      {children}
    </button>
  );
}

export default FOButton;
