import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import UnfoldLessIcon from "@material-ui/icons/UnfoldLess";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
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
          <Tooltip title="Expand All">
            <IconButton aria-label="expand" onClick={expandAll}>
              <UnfoldMoreIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Collapse All">
            <IconButton aria-label="collapse" onClick={collapseAll}>
              <UnfoldLessIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
