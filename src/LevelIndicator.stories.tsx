import {
  createMuiTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@material-ui/core";
import React, { ReactNode } from "react";
import LevelIndicator from "./LevelIndicator";

export default {
  title: "Level Indicator",
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

export function with100Percent() {
  return <LevelIndicator level={100}></LevelIndicator>;
}

export function with50Percent() {
  return <LevelIndicator level={50}></LevelIndicator>;
}

export function with0Percent() {
  return <LevelIndicator level={0}></LevelIndicator>;
}
