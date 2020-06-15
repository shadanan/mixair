import {
  Box,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
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
  const [xair, setXair] = useState<XAir>();
  const { mixer } = useAppBarContext();

  useEffect(() => {
    if (mixer) {
      const xair = new XAir(mixer);
      setXair(xair);
      return () => {
        xair.close();
      };
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
