import {
  Box,
  CssBaseline,
  ThemeProvider,
  // TODO: Replace the following with createMuiTheme after resolution of
  // https://github.com/mui-org/material-ui/issues/13394
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TopAppBar from "./TopAppBar";
import { AppBarContextProvider, useAppBarContext } from "./TopAppBarContext";
import { XAir } from "./XAir";
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
  const [xair, setXAir] = useState<XAir>();
  const { mixer } = useAppBarContext();

  useEffect(() => {
    if (mixer) {
      const xair = new XAir(mixer);
      setXAir(xair);
      return () => {
        xair.close();
      };
    } else {
      setXAir(undefined);
    }
  }, [mixer]);

  return (
    <Box>
      <TopAppBar />
      {xair ? <XAirMixer xair={xair} /> : null}
    </Box>
  );
}

export default App;
