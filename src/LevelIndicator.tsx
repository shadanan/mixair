import { makeStyles } from "@material-ui/core";
import { green, grey, red, yellow } from "@material-ui/core/colors";
import React from "react";

type LevelIndicatorProps = {
  level: number;
};

const useStyles = makeStyles({
  activeBar: {
    height: 10,
    width: "100%",
    background: `linear-gradient(to right, ${green[900]}, ${yellow[500]} 90%, ${red[600]})`,
  },
  inactiveBar: {
    height: 10,
    background: grey[900],
    marginLeft: "auto",
    marginRight: 0,
    transition: "width 0.1s",
    transitionTimingFunction: "ease-out",
  },
});

export default function LevelIndicator({ level }: LevelIndicatorProps) {
  const classes = useStyles();
  return (
    <div className={classes.activeBar}>
      <div
        className={classes.inactiveBar}
        style={{ width: `${100 - level}%` }}
      ></div>
    </div>
  );
}
