import {
  Box,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
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
    <Box>
      <TopAppBar />
      {mixer ? <XAirMixer mixer={mixer} /> : null}
    </Box>
  );
}

export default App;
