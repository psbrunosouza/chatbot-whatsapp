import {Client } from "whatsapp-web.js";
import {base} from "../workflows/base";
export class ChatService {
  constructor(private client: Client) {
    this.client = client;
  }

  async sendMessageByIndex(index: string, to: string, firstMessage: boolean) {
    index = index.toLowerCase();

    const flowMessage = this.findFlowByIndex(index, firstMessage)

    await this.sendMessage(to, flowMessage)

    for (const children of flowMessage.childrens) {
      await this.sendMessage(to, children)
    }
  }

  private findFlowByIndex(index: any, firstMessage: boolean) {
    if(!base.hasOwnProperty(index)){
      if (firstMessage) {
        return base.menu;
      } else {
        return base.default;
      }
    }

    return base[index as keyof typeof base];
  }

  private async sendMessage(to: string, message: any) {
    if (message.messages.length) {
      const messageChildren = message.messages.join('');
      await this.client.sendMessage(to, messageChildren);
    }
  }
}