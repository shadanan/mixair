export type XAirMessage = {
  xairs: string[];
};

export class XAirDetector {
  backoff = 100;
  client!: WebSocket;
  callback: (message: XAirMessage) => void;

  constructor(callback: (message: XAirMessage) => void) {
    this.callback = callback;
    this.connect();
  }

  connect() {
    const serverUrl = `ws://${window.location.host}/ws/xairs`;
    console.log(`Connecting to ${serverUrl}...`);
    this.client = new WebSocket(serverUrl);
    this.client.onopen = () => {
      console.log(`Subscribed to automatic device detection notifications.`);
      this.backoff = 250;
    };
    this.client.onmessage = (resp) => {
      const message = JSON.parse(resp.data) as XAirMessage;
      this.publish(message);
    };
    this.client.onclose = (resp) => {
      console.log(`Reconnecting in ${this.backoff / 1000} seconds...`);
      setTimeout(this.connect.bind(this), this.backoff);
      this.backoff = Math.min(this.backoff * 2, 10000);
    };
    this.get();
  }

  close() {
    this.client.onclose = null;
    this.client.close();
    console.log("Unsubscribed from automatic device detection notifications.");
  }

  async get(): Promise<XAirMessage> {
    const resp = await fetch(`/api/xairs`);
    const message = (await resp.json()) as XAirMessage;
    this.publish(message);
    return message;
  }

  publish(message: XAirMessage) {
    this.callback(message);
  }
}
