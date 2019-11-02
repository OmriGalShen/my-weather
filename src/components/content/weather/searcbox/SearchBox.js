import React from "react";
import "./SearchBox.css";
import { Button } from "@material-ui/core";

const SearchBox = ({ searchChange, handleSearchSubmit }) => {
  return (
    <form className="searchbox" onSubmit={handleSearchSubmit}>
      <input
        className="pa2 ba b--green bg-lightest-blue"
        type="search"
        placeholder="search cities.."
        onChange={searchChange}
      />
      <Button variant="contained" color="primary" type="submit" size="medium">
        search
      </Button>
    </form>
  );
};

export default SearchBox;
