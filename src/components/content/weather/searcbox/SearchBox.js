import React from "react";
import "./SearchBox.css";
import { Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const SearchBox = props => {
  const {
    onSearchChange,
    handleSearchSubmit,
    searchfield,
    filteredCities
  } = props;
  return (
    <form className="searchbox" onSubmit={handleSearchSubmit} method="post">
      <Autocomplete
        options={filteredCities}
        getOptionLabel={option => option.LocalizedName}
        renderInput={params => (
          <TextField
            {...params}
            placeholder="Search city"
            fullWidth
            variant="filled"
            value={searchfield}
            onChange={onSearchChange}
          />
        )}
      />
      <Button type="submit" className="submit" size="medium">
        search
      </Button>
    </form>
  );
};

export default SearchBox;
