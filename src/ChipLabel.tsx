import { Chip, makeStyles } from "@material-ui/core";
import {
  blue,
  cyan,
  green,
  grey,
  purple,
  red,
  yellow,
} from "@material-ui/core/colors";
import React from "react";

const COLORS = [
  grey[600],
  red[300],
  green[300],
  yellow[300],
  blue[300],
  purple[300],
  cyan[300],
  grey[50],
];

type StyleProps = {
  color: number;
};

const useStyles = makeStyles((theme) => ({
  root: ({ color }: StyleProps) => ({
    color: color >= 1 && color <= 8 ? grey[900] : COLORS[color % 8],
    borderColor: COLORS[color % 8],
    backgroundColor: color === 0 || color >= 9 ? grey[900] : COLORS[color % 8],
  }),
}));

type LabelProps = {
  label: string;
  color: number;
};

export default function ChipLabel({ label, color }: LabelProps) {
  const classes = useStyles({ color });

  return (
    <Chip
      className={classes.root}
      variant="outlined"
      size="small"
      label={label}
    />
  );
}
