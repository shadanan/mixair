import {
  createMuiTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@material-ui/core";
import React, { ReactNode, useState } from "react";
import Level from "./Level";

export default {
  title: "Level",
  decorators: [
    (storyFn: () => ReactNode) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper style={{ padding: 10, margin: 10 }}>{storyFn()}</Paper>
      </ThemeProvider>
    ),
  ],
};

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function levelToUnitInterval(level: string): number {
  if (level === "-∞") {
    return 0;
  }
  return 0.75 * Math.pow(10, (Number(level) * Math.log10(1 / 0.75)) / 10);
}

function unitIntervalToLevel(
  unitInterval: number,
  fractionDigits: number
): string {
  return unitInterval === 0
    ? "-∞"
    : ((10 * Math.log10(unitInterval / 0.75)) / Math.log10(1 / 0.75)).toFixed(
        fractionDigits
      );
}

export function DbMinusInfinityTo10() {
  const [level, setLevel] = useState(0.5);
  return (
    <Level
      level={level}
      setLevel={setLevel}
      labeledLevels={["-∞", "-50", "-30", "-20", "-10", "-5", "0", "5", "10"]}
      toUnitInterval={levelToUnitInterval}
      toLevel={unitIntervalToLevel}
    ></Level>
  );
}
