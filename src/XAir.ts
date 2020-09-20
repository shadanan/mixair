export type OscMessage = {
  address: string;
  arguments: (number | string)[];
};

export function href() {
  return window.location.href.replace(/^http/, "ws").replace(/\/$/, "");
}

export class XAir {
  xair: string;
  baseUrl: string;
  backoff = 100;
  client!: WebSocket;
  cache: { [address: string]: OscMessage } = {};
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
    const serverUrl = `${href()}/ws/xairs/${this.xair}/addresses`;
    console.log(`Connecting to ${serverUrl}...`);
    this.client = new WebSocket(serverUrl);
    this.client.onopen = () => {
      this.cache = {};
      console.log(`Subscribed to ${this.xair} notifications.`);
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
    console.log(`Unsubscribed from ${this.xair} notifications.`);
  }

  async get(address: string) {
    if (!(address in this.cache) && !address.startsWith("/meters/")) {
      const resp = await fetch(`${this.baseUrl}${address}`);
      const message = (await resp.json()) as OscMessage;
      this.cache[address] = message;
    }
    if (address in this.cache) {
      const message = this.cache[address];
      this.publish(message);
    }
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
