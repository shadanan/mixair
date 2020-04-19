import React from "react";
import Channel from "./Channel";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Channel />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
