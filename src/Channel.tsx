import React, { ReactElement, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

type ValueLabelProps = {
  open: boolean;
  value: number;
  children: ReactElement;
};

type OscMessage = {
  address: string;
  arguments: [number];
};

const marks = [0, 0.1335, 0.237, 0.422, 0.563, 0.65, 0.75, 0.865, 1].map(
  (x) => ({
    value: x,
    label: levelToDecibels(x),
  })
);

function levelToDecibels(level: number): string {
  return level === 0
    ? "-∞"
    : `${((10 * Math.log10(level / 0.75)) / Math.log10(1 / 0.75)).toFixed(1)}`;
}

function ValueLabelComponent({ open, value, children }: ValueLabelProps) {
  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="left"
      title={value}
      arrow
    >
      {children}
    </Tooltip>
  );
}

const client = new WebSocket("ws://localhost:8000/feed");

function VolumeSlider() {
  const classes = useStyles();
  const [volume, setVolume] = useState(0);

  async function updateVolume(volume: number) {
    const resp = await fetch("http://localhost:8000/osc/lr/mix/fader", {
      method: "PATCH",
      body: JSON.stringify({
        address: "/lr/mix/fader",
        arguments: [volume],
      } as OscMessage),
    });

    const message = (await resp.json()) as OscMessage;
    setVolume(message.arguments[0]);
  }

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("http://localhost:8000/osc/lr/mix/fader");
      const message = (await resp.json()) as OscMessage;
      setVolume(message.arguments[0]);
    }
    fetchData();

    client.onmessage = (resp) => {
      const message = JSON.parse(resp.data) as OscMessage;
      if (message.address === "/lr/mix/fader") {
        setVolume(message.arguments[0]);
      }
    };
  });

  return (
    <div className={classes.root}>
      <Slider
        orientation="vertical"
        getAriaValueText={levelToDecibels}
        valueLabelFormat={levelToDecibels}
        ValueLabelComponent={ValueLabelComponent}
        value={volume}
        onChange={(_, value) => {
          if (typeof value === "number") {
            updateVolume(value);
          }
        }}
        aria-label="custom thumb label"
        marks={marks}
        min={0}
        step={0.001}
        max={1}
      />
    </div>
  );
}

function Channel() {
  return (
    <Card>
      <CardContent>
        <Typography>Channel 1</Typography>
        <VolumeSlider />
      </CardContent>
    </Card>
  );
}

export default Channel;
