import { makeStyles } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import React from "react";

type LevelIndicatorProps = {
  level: number;
  marks?: [number, string][];
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
  mark: {
    position: "absolute",
    transform: "translateX(-50%)",
  },
});

export default function LevelIndicator({
  level,
  marks = [],
}: LevelIndicatorProps) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.activeBar}>
        <div
          className={classes.inactiveBar}
          style={{ width: `${100 - level}%` }}
        ></div>
      </div>
      <div style={{ position: "relative" }}>
        {marks.map(([pos, value]) => (
          <span className={classes.mark} style={{ left: `${pos}%` }}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
