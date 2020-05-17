import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Mixer from "./Mixer";
import MixerSelect from "./MixerSelect";

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
          render={(props) => <Mixer mixer={props.match.params.mixer} />}
        />
        <Route path="/mixer" component={MixerSelect} />
      </Switch>
    </Router>
  );
}

export default App;
