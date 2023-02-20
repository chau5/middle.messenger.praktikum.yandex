import HTTP from '../utils/http';
import BaseAPI from './base-api';

const chatsAPIBase = new HTTP();

export class ChatsAPI extends BaseAPI {
    static basePath = `${BaseAPI.baseUrl}/chats`;

    request() {
        return chatsAPIBase.get(`${ChatsAPI.basePath}/`);
    }

    getChatToken(chatId: number) {
        return chatsAPIBase.post(`${ChatsAPI.basePath}/token/${chatId}`);
    }

    create(title: string) {
        return chatsAPIBase.post(`${ChatsAPI.basePath}/`, { data: { title } });
    }

    delete(chatId: number) {
        return chatsAPIBase.delete(`${ChatsAPI.basePath}/`, { data: { chatId } });
    }

    addChatUser(userId: number, chatId: number) {
        return chatsAPIBase.put(`${ChatsAPI.basePath}/users`, {
            data: { users: [userId], chatId },
        });
    }

    removeChatUser(userId: number, chatId: number) {
        return chatsAPIBase.delete(`${ChatsAPI.basePath}/users`, {
            data: { users: [userId], chatId },
        });
    }
}
