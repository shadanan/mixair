import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useAppBarContext } from "./TopAppBarContext";
import XAirMixerSelect from "./XAirMixerSelect";

const useStyles = makeStyles((theme) => ({
  flex: {
    flexGrow: 1,
  },
}));

export default function TopAppBar() {
  const classes = useStyles();
  const { expandAll, collapseAll } = useAppBarContext();

  return (
    <div className={classes.flex}>
      <AppBar position="static">
        <Toolbar>
          <IconButton aria-label="menu">
            <MenuIcon />
          </IconButton>
          <XAirMixerSelect />
          <Box className={classes.flex} />
          <IconButton aria-label="expand all" onClick={expandAll}>
            <FontAwesomeIcon icon={faAngleDoubleDown} />
          </IconButton>
          <IconButton aria-label="collapse all" onClick={collapseAll}>
            <FontAwesomeIcon icon={faAngleDoubleUp} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
