import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TopAppBar from "./TopAppBar";
import { AppBarContextProvider, useAppBarContext } from "./TopAppBarContext";
import XAirMixer from "./XAirMixer";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <AppBarContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomeRouter />
      </ThemeProvider>
    </AppBarContextProvider>
  );
}

function HomeRouter() {
  const { mixer } = useAppBarContext();
  return (
    <Router>
      <TopAppBar />
      {mixer ? <XAirMixer mixer={mixer} /> : null}
    </Router>
  );
}

export default App;
