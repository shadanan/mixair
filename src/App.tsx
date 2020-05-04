import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import Mixer from "./Mixer";
import { XAir } from "./XAir";

const xair = new XAir(`${window.location.host}/xair/XR18-5E-91-5A`);

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Mixer xair={xair} />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
