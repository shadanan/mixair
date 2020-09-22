import { href } from "./XAir";

export type XAirMessage = {
  xairs: string[];
};

const RETRY_INTERVALS = [0, 1000, 2000, 5000, 10000];

export class XAirDetector {
  retries = 0;
  backoff = 0;
  client!: WebSocket;
  setMixers: (xairs: string[]) => void;
  setBackoff: (backoff: number | null) => void;

  constructor(
    setMixers: (xairs: string[]) => void,
    setBackoff: (backoff: number | null) => void
  ) {
    this.setMixers = setMixers;
    this.setBackoff = setBackoff;
    this.connect();
  }

  connect() {
    const serverUrl = `${href()}/ws/xairs`;
    console.log(`Connecting to ${serverUrl}...`);
    this.client = new WebSocket(serverUrl);
    this.client.onopen = () => {
      console.log(`Subscribed to automatic device detection notifications.`);
      this.retries = 0;
      this.setBackoff(null);
    };
    this.client.onmessage = (resp) => {
      const message = JSON.parse(resp.data) as XAirMessage;
      this.publish(message);
    };
    this.client.onclose = (resp) => {
      this.setMixers([]);
      this.backoff = RETRY_INTERVALS[this.retries];
      this.reconnect();
      this.retries = Math.min(this.retries + 1, RETRY_INTERVALS.length - 1);
    };
  }

  reconnect() {
    this.setBackoff(this.backoff);
    if (this.backoff <= 0) {
      this.connect();
    } else {
      this.backoff = this.backoff - 500;
      setTimeout(this.reconnect.bind(this), 500);
    }
  }

  close() {
    this.client.onclose = null;
    this.client.close();
    console.log("Unsubscribed from automatic device detection notifications.");
  }

  publish(message: XAirMessage) {
    this.setMixers(message.xairs);
  }
}
