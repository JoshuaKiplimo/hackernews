import React from "react";
import { HANDLE_PAGE } from "./actions";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { page, loading, handlePage, nbPages } = useGlobalContext();

  return (
    <>
      <div className="btn-container">
        <button disabled={loading} onClick={() => handlePage("prev", page - 1)}>
          prev
        </button>
        <p>{`${page + 1} of ${nbPages}`}</p>
        <button disabled={loading} onClick={() => handlePage("next", page + 1)}>
          next
        </button>
      </div>
    </>
  );
};

export default Buttons;
