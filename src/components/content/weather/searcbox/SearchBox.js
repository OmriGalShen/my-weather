import React from "react";
import "./SearchBox.css";
import { Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white"
  },
  input: {
    height: "3em",
    color: "white"
  },
  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    fontWeight: "bold",
    padding: "0.8em",
    margin: 5
  }
});

const SearchBox = props => {
  const {
    searchChange,
    handleSearchSubmit,
    searchfield,
    filteredCities
  } = props;
  const classes = useStyles();
  return (
    <form className="searchbox" onSubmit={handleSearchSubmit}>
      <Autocomplete
        clearOnEscape={true}
        autoComplete={true}
        options={filteredCities}
        getOptionLabel={option => option.EnglishName}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            placeholder="Search city"
            fullWidth
            variant="outlined"
            value={searchfield}
            onChange={searchChange}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
                input: classes.input
              }
            }}
          />
        )}
      />
      <Button className={classes.button} type="submit" size="medium">
        search
      </Button>
    </form>
  );
};

export default SearchBox;
