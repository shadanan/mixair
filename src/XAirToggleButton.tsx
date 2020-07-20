import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useEffect, useState } from "react";
import { useXAirContext } from "./XAirContext";

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
  const [toggled, setToggled] = useState(0);
  const xair = useXAirContext();
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
      {children}
    </ToggleButton>
  );
}
