import React from "react";
import "./SearchBox.css";

const SearchBox = ({ searchChange }) => {
  return (
    <div className="searchbox">
      <input
        className="pa3 ba b--green bg-lightest-blue"
        type="search"
        placeholder="search cities.."
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
