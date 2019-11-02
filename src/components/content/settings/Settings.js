import React from "react";
import "./Settings.css";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";

const Settings = ({ isMetric, handleUnitChange }) => {
  return (
    <div className="settings">
      <div className="settings-panel shadow-5">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-description">
          View and manage your favorite cities!
        </p>
        <div className="setting-list">
          <List component="nav" aria-label="settings list"></List>
          <ListItem button>
            <ListItemIcon>
              <AcUnitIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Units"} style={{ color: "white" }} />
            <FormControlLabel
              control={
                <Switch
                  checked={isMetric}
                  value="checkedB"
                  color="primary"
                  onChange={handleUnitChange}
                />
              }
              label={isMetric ? "Metric" : "Imperial"}
            />
          </ListItem>
        </div>
      </div>
    </div>
  );
};

export default Settings;
