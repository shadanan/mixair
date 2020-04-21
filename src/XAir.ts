export type OscMessage = {
  address: string;
  arguments: [number];
};

export class XAir {
  baseUrl: string;
  client: WebSocket;
  subscriptions: {
    [name: string]: {
      callback: (message: OscMessage) => void;
      address?: string;
    };
  } = {};

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = new WebSocket(`ws://${this.baseUrl}/feed`);
    this.client.onmessage = (resp) => {
      const message = JSON.parse(resp.data) as OscMessage;
      for (var key in this.subscriptions) {
        const { callback, address } = this.subscriptions[key];
        if (!address || message.address === address) {
          callback(message);
        }
      }
    };
  }

  async get(address: string): Promise<OscMessage> {
    const resp = await fetch(`http://${this.baseUrl}/osc${address}`);
    return await resp.json();
  }

  async patch(message: OscMessage): Promise<OscMessage> {
    const resp = await fetch(`http://${this.baseUrl}/osc${message.address}`, {
      method: "PATCH",
      body: JSON.stringify(message),
    });

    return await resp.json();
  }

  subscribe(callback: (message: OscMessage) => void, address?: string) {
    const name = address || "" + Math.random().toString(36).substring(2);
    this.subscriptions[name] = { callback, address };
    return name;
  }

  unsubscribe(name: string) {
    delete this.subscriptions[name];
  }
}
