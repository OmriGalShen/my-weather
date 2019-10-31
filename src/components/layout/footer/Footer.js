import React from "react";
import "./Footer.css";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

//In order to change style of material ui compontents this jsx styling needs to be used
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    background: "#3f51b5",
    color: "white"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className="shadow-5 footer white ">
      <Paper className={classes.paper}>
        <div className="footer-text">
          <p className="f6">Made By Omri Gal Shenhav ©</p>
          <p className="f6">2019</p>
        </div>
      </Paper>
    </div>
  );
};

export default Footer;
