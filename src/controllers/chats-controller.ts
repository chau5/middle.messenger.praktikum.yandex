import { ChatsAPI } from '../api/chats-api';
import store from '~/src/utils/store';
import { processResponse } from '~/src/utils/helpers';

export class ChatsController {
    #api = new ChatsAPI();

    async request() {
        try {
            const response = (await this.#api.request()) as XMLHttpRequest;
            const responseText = processResponse(response);
            /** @todo refactor to centralized update */
            store.set('chats', responseText);
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }

    async create(title: string) {
        try {
            const response = (await this.#api.create(title)) as XMLHttpRequest;
            processResponse(response);
            await this.request();
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }

    async delete() {
        try {
            const chatId = store?.getState()?.chatId;
            if (!chatId) {
                return;
            }
            const response = (await this.#api.delete(chatId)) as XMLHttpRequest;
            processResponse(response);
            await this.request();
            store.set('messages', null);
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }

    async addChatUser(userId: number) {
        try {
            const chatId = store?.getState()?.chatId;
            if (!chatId) {
                return;
            }
            await this.#api.addChatUser(userId, chatId);
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }

    async removeChatUser(userId: number) {
        try {
            const chatId = store?.getState()?.chatId;
            if (!chatId) {
                return;
            }
            await this.#api.removeChatUser(userId, chatId);
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }
}
