import React from "react";
import "./SearchBox.css";

const SearchBox = ({ searchChange, handleSearchSubmit }) => {
  return (
    <form className="searchbox" onSubmit={handleSearchSubmit}>
      <input
        className="pa3 ba b--green bg-lightest-blue"
        type="search"
        placeholder="search cities.."
        onChange={searchChange}
      />
    </form>
  );
};

export default SearchBox;
