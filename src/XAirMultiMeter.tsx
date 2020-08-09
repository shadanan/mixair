import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import LevelIndicator from "./LevelIndicator";
import { useMetersContext } from "./XAirMetersContext";

const MARKS: [number, string][] = [
  [0, "-∞"],
  [10.71428571, "-50"],
  [46.42857143, "-30"],
  [64.28571429, "-20"],
  [82.14285714, "-10"],
  [91.07142857, "-5"],
  [100, "0"],
];

const useStyles = makeStyles((theme) => {
  const labelWidth = theme.spacing(6);
  return {
    labelledIndicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      width: labelWidth,
      textAlign: "right",
      paddingRight: theme.spacing(1),
    },
    level: {
      flexGrow: 100,
      verticalAlign: "middle",
    },
    marksWrapper: {
      paddingLeft: theme.spacing(6),
    },
    marks: {
      position: "relative",
      paddingBottom: theme.spacing(2),
    },
    mark: {
      position: "absolute",
      transform: "translateX(-50%)",
    },
  };
});

type LevelLabelProps = {
  label: string;
  primary?: boolean;
};

function LevelLabel({ label, primary }: LevelLabelProps) {
  const classes = useStyles();
  return (
    <Typography
      className={classes.label}
      variant="caption"
      color={primary ? "secondary" : "textSecondary"}
    >
      {label}
    </Typography>
  );
}

type XAirLevelIndicatorProps = {
  address: string;
  index: number;
};

function XAirLevelIndicator({ address, index }: XAirLevelIndicatorProps) {
  const meters = useMetersContext()[address];
  const level = normalize(meters[index]);
  return <LevelIndicator level={level} />;
}

type LabelledIndicatorsProps = {
  meter: Meter;
  primary: boolean;
};

function LabelledIndicators({ meter, primary }: LabelledIndicatorsProps) {
  const classes = useStyles();
  return (
    <div
      className={classes.labelledIndicator}
      style={{ height: 10 * meter.indices.length + 2 }}
    >
      <LevelLabel label={meter.label} primary={primary} />
      <div className={classes.level}>
        {meter.indices.map((index) => (
          <XAirLevelIndicator
            key={index}
            address={meter.address}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

type LevelMarksProps = {
  marks: [number, string][];
};

function LevelMarks({ marks }: LevelMarksProps) {
  const classes = useStyles();
  return (
    <div className={classes.marksWrapper}>
      <div className={classes.marks}>
        {marks.map(([pos, value]) => (
          <span
            key={value}
            className={classes.mark}
            style={{ left: `${pos}%` }}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

type Meter = {
  label: string;
  address: string;
  indices: number[];
};

type MultiMeterProps = {
  meters: Meter[];
  primary?: number;
};

export default function XAirMultiMeter({ meters, primary }: MultiMeterProps) {
  return (
    <div>
      {meters.map((meter, i) => (
        <LabelledIndicators key={i} meter={meter} primary={i === primary} />
      ))}
      <LevelMarks marks={MARKS} />
    </div>
  );
}

function normalize(level: number): number {
  return Math.trunc(
    Math.max(Math.min(((level + 18432) * 100) / 18432, 100), 0)
  );
}
