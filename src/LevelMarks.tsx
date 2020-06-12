import { makeStyles } from "@material-ui/core";
import React from "react";

type LevelMarksProps = {
  marks: [number, string][];
};

const useStyles = makeStyles((theme) => ({
  marks: {
    position: "relative",
    paddingBottom: theme.spacing(2),
  },
  mark: {
    position: "absolute",
    transform: "translateX(-50%)",
  },
}));

export default function LevelMarks({ marks }: LevelMarksProps) {
  const classes = useStyles();
  return (
    <div className={classes.marks}>
      {marks.map(([pos, value]) => (
        <span key={value} className={classes.mark} style={{ left: `${pos}%` }}>
          {value}
        </span>
      ))}
    </div>
  );
}
