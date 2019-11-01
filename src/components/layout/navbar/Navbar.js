import React, { useState } from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import logo from "../../../assets/images/logo.png";
import Logo from "../../logo/Logo";

//In order to change style of material ui compontents this jsx styling needs to be used
const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    padding: 20,
    textDecoration: "none",
    color: "white",
    fontSize: "1.5em"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  menuItem: {
    fontSize: "1.5em",
    padding: "20px"
  },
  appbar: {
    background: "#3f51b5"
  },
  mainlinks: {
    fontSize: "3em"
  },
  paper: { background: "#23374d", color: "white" },
  label: {
    textTransform: "capitalize",
    fontSize: "1.2em",
    fontFamily: "Raleway"
  },
  mainLinkSelected: {
    fontWeight: "bold"
  },
  manuItemSelected: {
    background: "white",
    color: "black"
  }
}));

const Navbar = ({ linksList }) => {
  //def state of component
  const [openDrawer, setOpenDrawer] = useState(false);

  //get styles
  const classes = useStyles();

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  return (
    <div className="navbar">
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          {
            //This icon shown only on mobile
          }
          <IconButton
            id="drawer-button"
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          {
            //This is the app logo link
          }
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo width={50} />
            {/* <div className="logo grow">
              <img alt="logo" src={logo} className="logo-img" />
              <p className="logo-title">MyWeather</p>
            </div> */}
          </Link>
          <Typography className={classes.title}></Typography>
          {
            //This is the links shown in desktop
          }
          <div className={classes.mainlinks} id="button-list">
            {linksList.map(linkItem => {
              return (
                <Button
                  classes={{ label: classes.label }}
                  key={linkItem.id}
                  color="inherit"
                  component={NavLink}
                  to={linkItem.path}
                  activeClassName={classes.mainLinkSelected}
                  exact={true}
                >
                  {linkItem.name}
                </Button>
              );
            })}
          </div>
        </Toolbar>
      </AppBar>
      {
        //This drawer shown only on mobile
      }
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.paper }}
      >
        {linksList.map(linkItem => {
          return (
            <MenuItem
              key={linkItem.id}
              color="inherit"
              component={NavLink}
              to={linkItem.path}
              className={classes.menuItem}
              onClick={toggleDrawer(false)}
              activeClassName={classes.manuItemSelected}
              exact={true}
            >
              {linkItem.name}
            </MenuItem>
          );
        })}
      </Drawer>
    </div>
  );
};

export default Navbar;
