import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import XAirMixer from "./XAirMixer";
import XAirMixerSelect from "./XAirMixerSelect";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomeRouter />
    </ThemeProvider>
  );
}

function HomeRouter() {
  return (
    <Router>
      <Switch>
        <Route
          path="/mixer/:mixer"
          render={(props) => <XAirMixer mixer={props.match.params.mixer} />}
        />
        <Route path="/mixer" component={XAirMixerSelect} />
      </Switch>
    </Router>
  );
}

export default App;
