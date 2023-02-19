import store from '~/src/utils/store';
import { ChatsController } from '~src/controllers/chats-controller';

export class WS {
    static basePath = 'wss://ya-praktikum.tech/ws/chats';

    static connTimerDelay = 10000;

    #connTimer;

    #chatId: number | null;

    #socket: WebSocket | null;

    constructor() {
        this.#connTimer = store?.getState()?.connTimer;
        this.#chatId = null;
        this.#socket = null;
    }

    #setTimer(): void {
        const connTimer = setInterval(() => {
            console.log(`sending ping message for ${this.#chatId}`);
            if (!this.#socket) {
                return;
            }
            this.#socket.send(
                JSON.stringify({
                    type: 'ping',
                })
            );
        }, WS.connTimerDelay);
        store.set('connTimer', connTimer);
    }

    #getMessages() {
        if (!this.#socket) {
            return;
        }
        this.#socket.send(JSON.stringify({ type: 'get old', content: '0' }));
    }

    async sendMessage(message: string) {
        if (!this.#socket) {
            return;
        }
        this.#socket.send(JSON.stringify({ type: 'message', content: message }));
    }

    connect(chatId: number, token: string) {
        if (this.#connTimer) {
            clearInterval(this.#connTimer);
        }

        const userId = store?.getState()?.user?.id;
        this.#socket = new WebSocket(`${WS.basePath}/${userId}/${chatId}/${token}`);
        this.#chatId = Number(chatId);

        this.#socket.addEventListener('open', () => {
            console.log('Websocket connection has been established');
            // get old messages
            this.#getMessages();
        });

        this.#socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Websocket connection has been closed without issues');
            } else {
                console.warn('Websocket connection has been closed with issues');
            }

            console.log(`Code: ${event.code} | Reason: ${event.reason}`);
            // remove WS connection timer if exists to avoid pinging multiples chats
        });

        this.#socket.addEventListener('message', async event => {
            const data = JSON.parse(event.data);
            if (data.type === 'pong') {
                console.log(`pong: ${this.#chatId}`);
                return;
            }
            if (data.type === 'user connected') {
                console.log(`user connected: ${data.content}`);
                return;
            }
            if (Array.isArray(data)) {
                store.set('messages', data.reverse());
            } else {
                const messages = store?.getState()?.messages;
                messages.push({ ...data, chat_id: this.#chatId });
                store.set('messages', messages);
            }
            store.set('chatId', this.#chatId);
            // fetch chats to update the list view
            const chats = new ChatsController();
            await chats.request();
            // scroll to the bottom of messages
            const messagesWrap = document.querySelector('.messages');
            if (!messagesWrap) {
                return;
            }
            messagesWrap.scrollTop = messagesWrap.scrollHeight;
        });

        this.#socket.addEventListener('error', event => {
            console.log('Error', event);
        });

        this.#setTimer();
    }
}

export default new WS();
