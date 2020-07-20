import {
  createMuiTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@material-ui/core";
import React, { ReactNode } from "react";
import ChipLabel from "./ChipLabel";

export default {
  title: "Chip Label",
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

export function AllChipLabelStyles() {
  return (
    <>
      <ChipLabel color={0} label={"01"} />
      <ChipLabel color={1} label={"02: Perc"} />
      <ChipLabel color={2} label={"03: Noah Cl 1"} />
      <ChipLabel color={3} label={"04: Pam Cl 2"} />
      <ChipLabel color={4} label={"05: Matt Tpt"} />
      <ChipLabel color={5} label={"06: Niwako Vn 1"} />
      <ChipLabel color={6} label={"07: Mike Vn 2"} />
      <ChipLabel color={7} label={"08: Deborah Va 1"} />
      <ChipLabel color={8} label={"09: Steve Pf"} />
      <ChipLabel color={9} label={"10: Chih Voc"} />
      <ChipLabel color={10} label={"11: Chih Ban L"} />
      <ChipLabel color={11} label={"12: Chih Ban R"} />
      <ChipLabel color={12} label={"13: Jim Db"} />
      <ChipLabel color={13} label={"14: Jack Gtr"} />
      <ChipLabel color={14} label={"15: Shad Voc"} />
      <ChipLabel color={15} label={"16: Shad Gtr"} />
    </>
  );
}
