import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React from "react";
import useXAirAddress from "./useXAirAddress";

type StyleProps = {
  color: string;
};

const useStyles = makeStyles((theme) => ({
  root: ({ color }: StyleProps) => ({
    width: theme.spacing(5),
    "&$selected": {
      color: color,
      borderColor: color,
    },
  }),
  selected: () => ({}),
}));

type ToggleButtonProps = {
  address: string;
  children: React.ReactNode;
  color?: string;
  invert?: boolean;
};

export default function XAirToggleButton({
  address,
  children,
  color = green[500],
  invert = false,
}: ToggleButtonProps) {
  const classes = useStyles({ color });
  const [toggled, setToggled] = useXAirAddress<number>(address, 0);
  const [ON, OFF] = invert ? [0, 1] : [1, 0];

  return (
    <ToggleButton
      classes={{
        root: classes.root,
        selected: classes.selected,
      }}
      size="small"
      value="check"
      selected={toggled === ON}
      onChange={() => {
        setToggled(toggled === ON ? OFF : ON);
      }}
    >
      {children}
    </ToggleButton>
  );
}
