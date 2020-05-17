import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useEffect, useState } from "react";
import { XAir } from "./XAir";

type XAirToggleButtonProps = {
  xair: XAir;
  address: string;
  children: React.ReactNode;
  color?: string;
  invert?: boolean;
};

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

export default function XAirToggleButton({
  xair,
  address,
  children,
  color = green[500],
  invert = false,
}: XAirToggleButtonProps) {
  const classes = useStyles({ color });
  const [toggled, setToggled] = useState(0);
  const [ON, OFF] = invert ? [0, 1] : [1, 0];

  async function updateToggled(toggled: number) {
    xair.patch({
      address: address,
      arguments: [toggled],
    });
  }

  useEffect(() => {
    const name = xair.subscribe(address, (message) => {
      setToggled(message.arguments[0] as number);
    });
    xair.get(address);

    return () => {
      xair.unsubscribe(address, name);
    };
  }, [xair, address]);

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
        updateToggled(toggled === ON ? OFF : ON);
      }}
    >
      <Typography variant="button">{children}</Typography>
    </ToggleButton>
  );
}
