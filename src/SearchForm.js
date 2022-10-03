import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { searchValue, handleSearch } = useGlobalContext();
  return (
    <>
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Search Hacker News</h2>
        <input
          type="text"
          className="form-input"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
      </form>
    </>
  );
};

export default SearchForm;
