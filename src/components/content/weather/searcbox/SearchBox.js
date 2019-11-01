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
      <input className="pa3 ba b--blue bg-lightest-blue" type="submit" />
    </form>
  );
};

export default SearchBox;
