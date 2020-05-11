import { makeStyles } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import React from "react";

type LevelIndicatorProps = {
  level: number;
};

const useStyles = makeStyles({
  root: {
    height: 10,
    width: "100%",
    background: `linear-gradient(to right, ${green[900]}, ${yellow[500]} 90%, ${red[600]})`,
  },
  bar: {
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
    <div className={classes.root}>
      <div className={classes.bar} style={{ width: `${100 - level}%` }}></div>
    </div>
  );
}
