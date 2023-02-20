import WS from '../utils/ws';
import { ChatsAPI } from '../api/chats-api';
import store from '~/src/utils/store';
import { ChatApiProps } from '~/src/utils/prop-types';
import { processResponse } from '~/src/utils/helpers';

export class MessagesController {
    #chatsApi = new ChatsAPI();

    #setCurrentChatTitle(chatId: number) {
        const chats = store?.getState()?.chats;
        const currentChat = chats.filter(
            (chat: ChatApiProps) => Number(chat.id) === Number(chatId)
        );
        store.set('chatTitle', currentChat[0].title);
    }

    async #getChatToken(chatId: number) {
        try {
            const response = (await this.#chatsApi.getChatToken(chatId)) as XMLHttpRequest;
            const responseText = processResponse(response);
            if (!responseText.token) {
                console.warn(`Oops, there is no chat token`);
                alert(`Oops, there is no chat token`);
                return false;
            }
            return responseText.token;
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
            return false;
        }
    }

    async sendMessage(message: string) {
        try {
            await WS.sendMessage(message);
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }

    async connect(chatId: number) {
        try {
            // get chat token
            const token = await this.#getChatToken(chatId);

            if (!token) {
                console.warn(`Oops, there is no chat token`);
                alert(`Oops, there is no chat token`);
                return;
            }

            // establish WS connection and load messages with a store update
            WS.connect(chatId, token);
            this.#setCurrentChatTitle(chatId);
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }

    async disconnect() {
        await WS.disconnect();
    }
}
