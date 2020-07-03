import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import LevelIndicator from "./LevelIndicator";
import LevelMarks from "./LevelMarks";

const MARKS: [number, string][] = [
  [0, "-∞"],
  [10.71428571, "-50"],
  [46.42857143, "-30"],
  [64.28571429, "-20"],
  [82.14285714, "-10"],
  [91.07142857, "-5"],
  [100, "0"],
];

type Meter = {
  label: string;
  levels: number[];
  primary?: boolean;
};

type MultiMeterProps = {
  meters: Meter[];
};

const useStyles = makeStyles((theme) => {
  const labelWidth = theme.spacing(5);
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
    marks: {
      paddingLeft: labelWidth,
    },
  };
});

function normalize(level: number): number {
  return Math.max(Math.min(((level + 18432) * 100) / 18432, 100), 0);
}

function LevelLabel({ label, primary }: { label: string; primary?: boolean }) {
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

function LabelledIndicators({
  meter: { label, levels, primary },
}: {
  meter: Meter;
}) {
  const classes = useStyles();
  return (
    <div
      className={classes.labelledIndicator}
      style={{ height: 10 * levels.length + 2 }}
    >
      <LevelLabel label={label} primary={primary} />
      <div className={classes.level}>
        {levels.map((level, j) => (
          <LevelIndicator key={`level-${j}`} level={normalize(level)} />
        ))}
      </div>
    </div>
  );
}

export default function MultiMeter({ meters }: MultiMeterProps) {
  const classes = useStyles();
  return (
    <div>
      {meters.map((meter, i) => (
        <div key={`meter-${i}`}>
          <LabelledIndicators meter={meter} />
        </div>
      ))}
      <div className={classes.marks}>
        <LevelMarks marks={MARKS} />
      </div>
    </div>
  );
}
