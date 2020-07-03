export type OscMessage = {
  address: string;
  arguments: [number | string];
};

export class XAir {
  xair: string;
  baseUrl: string;
  backoff = 100;
  client!: WebSocket;
  subscriptions: {
    [address: string]: {
      [name: string]: (message: OscMessage) => void;
    };
  } = {};

  constructor(xair: string) {
    this.xair = xair;
    this.baseUrl = `/api/xairs/${this.xair}/addresses`;
    this.connect();
  }

  connect() {
    const serverUrl = `ws://${window.location.host}/ws/xairs/${this.xair}/addresses`;
    console.log(`Connecting to ${serverUrl}...`);
    this.client = new WebSocket(serverUrl);
    this.client.onopen = () => {
      console.log(`Connected.`);
      this.backoff = 250;
    };
    this.client.onmessage = (resp) => {
      const message = JSON.parse(resp.data) as OscMessage;
      this.publish(message);
    };
    this.client.onclose = (resp) => {
      console.log(`Reconnecting in ${this.backoff / 1000} seconds...`);
      setTimeout(this.connect.bind(this), this.backoff);
      this.backoff = Math.min(this.backoff * 2, 10000);
    };
  }

  close() {
    this.client.onclose = null;
    this.client.close();
    console.log("Disconnected.");
  }

  async get(address: string): Promise<OscMessage> {
    const resp = await fetch(`${this.baseUrl}${address}`);
    const message = (await resp.json()) as OscMessage;
    this.publish(message);
    return message;
  }

  async patch(message: OscMessage): Promise<OscMessage> {
    const resp = await fetch(`${this.baseUrl}${message.address}`, {
      method: "PATCH",
      body: JSON.stringify(message),
    });
    const updated_message = await resp.json();
    this.publish(updated_message);
    return updated_message;
  }

  publish(message: OscMessage) {
    if (message.address in this.subscriptions) {
      for (var name in this.subscriptions[message.address]) {
        const callback = this.subscriptions[message.address][name];
        callback(message);
      }
    }
  }

  subscribe(address: string, callback: (message: OscMessage) => void) {
    const name = "" + Math.random().toString(36).substring(2);
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
