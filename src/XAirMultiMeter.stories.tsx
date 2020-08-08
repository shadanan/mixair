import {
  createMuiTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { OscMessage, XAir } from "./XAir";
import { useXAirContext, XAirContextProvider } from "./XAirContext";
import XAirMultiMeter from "./XAirMultiMeter";

class FakeXAir implements XAir {
  xair = "";
  baseUrl = "";
  backoff = 100;
  client!: WebSocket;
  cache: { [address: string]: OscMessage } = {};
  subscriptions: {
    [address: string]: {
      [name: string]: (message: OscMessage) => void;
    };
  } = {};

  connect() {}
  close() {}

  async get(address: string) {
    const message = this.cache[address];
    this.publish(message);
  }

  async patch(message: OscMessage): Promise<OscMessage> {
    this.publish(message);
    return message;
  }

  publish(message: OscMessage) {
    this.cache[message.address] = message;
    if (message.address in this.subscriptions) {
      for (var name in this.subscriptions[message.address]) {
        const callback = this.subscriptions[message.address][name];
        callback(message);
      }
    }
  }

  subscribe(address: string, callback: (message: OscMessage) => void) {
    const name = Math.random().toString(36).substring(2);
    if (!(address in this.subscriptions)) {
      this.subscriptions[address] = {};
    }
    this.subscriptions[address][name] = callback;
    return name;
  }

  unsubscribe(address: string, name: string) {
    delete this.subscriptions[address][name];
  }
}

export default {
  title: "Multi Meter",
  decorators: [
    (StoryFn: () => JSX.Element) => {
      const theme = createMuiTheme({
        palette: {
          type: "dark",
        },
      });

      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Paper style={{ padding: 10, margin: 10 }}>
            <StoryFn />
          </Paper>
        </ThemeProvider>
      );
    },
    (StoryFn: () => JSX.Element) => {
      const xair = new FakeXAir();
      return (
        <XAirContextProvider xair={xair}>
          <StoryFn />
        </XAirContextProvider>
      );
    },
  ],
};

export function WithTwoMeters() {
  const xair = useXAirContext();
  useEffect(() => {
    xair.publish({
      address: "/meters/2",
      arguments: [-10000, -8000],
    });
  }, [xair]);

  return (
    <XAirMultiMeter
      meters={[
        { label: "A/D", address: "/meters/2", indices: [0] },
        { label: "USB", address: "/meters/2", indices: [1] },
      ]}
      primary={0}
    />
  );
}

export function WithFourMeters() {
  const xair = useXAirContext();
  useEffect(() => {
    xair.publish({
      address: "/meters/2",
      arguments: [-7000, -8000, -10000, -9000],
    });
  }, [xair]);

  return (
    <XAirMultiMeter
      meters={[
        { label: "A/D", address: "/meters/2", indices: [0, 1] },
        { label: "USB", address: "/meters/2", indices: [2, 3] },
      ]}
      primary={1}
    />
  );
}
