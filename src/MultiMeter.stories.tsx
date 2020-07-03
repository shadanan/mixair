import {
  createMuiTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@material-ui/core";
import React, { ReactNode } from "react";
import MultiMeter from "./MultiMeter";

export default {
  title: "Multi Meter",
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

export function withTwoMeters() {
  return (
    <MultiMeter
      meters={[
        { label: "A/D", levels: [-8000], primary: true },
        { label: "USB", levels: [-10000] },
      ]}
    ></MultiMeter>
  );
}

export function withFourMeters() {
  return (
    <MultiMeter
      meters={[
        { label: "A/D", levels: [-6000, -8000] },
        { label: "USB", levels: [-10000, -9000], primary: true },
      ]}
    ></MultiMeter>
  );
}
