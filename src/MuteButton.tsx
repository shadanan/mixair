import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useEffect, useState } from "react";
import { XAir } from "./XAir";

type MuteButtonProps = {
  xair: XAir;
  address: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    "&$selected": {
      color: theme.palette.error.dark,
      borderColor: theme.palette.error.dark,
    },
  },
  selected: {},
}));

export default function MuteButton({ xair, address }: MuteButtonProps) {
  const classes = useStyles();
  const [muted, setMuted] = useState(true);

  async function updateMuted(muted: boolean) {
    const message = await xair.patch({
      address: address,
      arguments: [muted ? 0 : 1],
    });
    setMuted(message.arguments[0] === 0);
  }

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data...");
      const message = await xair.get(address);
      setMuted(message.arguments[0] === 0);
    }
    fetchData();
  }, [xair, address]);

  useEffect(() => {
    const name = xair.subscribe((message) => {
      console.log("Message received: " + message);
      setMuted(message.arguments[0] === 0);
    }, address);
    return () => {
      xair.unsubscribe(name);
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
      selected={muted}
      onChange={() => {
        updateMuted(!muted);
      }}
    >
      <Typography variant="button">M</Typography>
    </ToggleButton>
  );
}
