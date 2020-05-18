import {
  createMuiTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import LevelIndicator from "./LevelIndicator";

export default { title: "Level Indicator" };

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export function with100Percent() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ padding: 10, margin: 10 }}>
        <LevelIndicator
          level={100}
          marks={[
            [0, "-∞"],
            [10.71428571, "-50"],
            [46.42857143, "-30"],
            [64.28571429, "-20"],
            [82.14285714, "-10"],
            [91.07142857, "-5"],
            [100, "0"],
          ]}
        ></LevelIndicator>
      </Paper>
    </ThemeProvider>
  );
}

export function with50Percent() {
  return <LevelIndicator level={50}></LevelIndicator>;
}

export function with0Percent() {
  return <LevelIndicator level={0}></LevelIndicator>;
}
