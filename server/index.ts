import {Message, Client, LocalAuth} from "whatsapp-web.js";
import {ChatService} from "../services/chat.service";
const qrcode = require('qrcode-terminal');


async function initializeWhatsappClient(): Promise<void> {
  let firstMessage = true;

  const client = new Client({
    puppeteer: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    authStrategy: new LocalAuth({ clientId: "helio-client" })
  });

  const chatService = new ChatService(client);

  /**
   * Evento utilizado para realizar a autenticação via QR code
   */
  client.on('qr', (qr: string) => {
    qrcode.generate(qr, {small: true});
  });

  /**
   * Evento utilizado para acompanhar se um usuário realizou autenticação
   */
  client.on('authenticated', (session) => {
    console.log("authenticated")
  });

  /**
   * Evento utilizado para acompanhar se o serviço está pronto para uso
   */
  client.on('ready', () => {
    console.log('Client is ready!');
  });

  /**
   * Evento utilizado para acompanhar o recebimento de mensagens
   */
  client.on('message', (msg: Message) => {
    if (firstMessage) {
      chatService.sendMessageByIndex(msg.body,  msg.from, true)
      firstMessage = false;
    }else {
      chatService.sendMessageByIndex(msg.body,  msg.from, false)
    }
  });

  await client.initialize();
}

initializeWhatsappClient()