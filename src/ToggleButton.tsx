import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import { ToggleButton as MuiToggleButton } from "@material-ui/lab";
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

const useStyles = makeStyles({
  root: ({ color }: StyleProps) => ({
    "&$selected": {
      color: color,
      borderColor: color,
    },
  }),
  selected: () => ({}),
});

export default function ToggleButton({
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
    const message = await xair.patch({
      address: address,
      arguments: [toggled],
    });
    setToggled(message.arguments[0] as number);
  }

  useEffect(() => {
    async function fetchData() {
      const message = await xair.get(address);
      setToggled(message.arguments[0] as number);
    }
    fetchData();
  }, [xair, address]);

  useEffect(() => {
    const name = xair.subscribe((message) => {
      setToggled(message.arguments[0] as number);
    }, address);
    return () => {
      xair.unsubscribe(name);
    };
  }, [xair, address]);

  return (
    <MuiToggleButton
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
    </MuiToggleButton>
  );
}
