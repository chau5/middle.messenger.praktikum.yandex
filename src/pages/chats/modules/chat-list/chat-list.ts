import Block from '@utils/block';
import Chat from './components/chat';
import Avatar from '@components/avatar';
import ButtonIcon from '@components/button-icon';
import PopUpAddChat from './components/pop-up-add-chat';
import router from '~/src/index';
import template from './chat-list.hbs';
import { ChatApiProps } from '@utils/prop-types';
import store, { StoreEvents } from '@utils/store';
import { getChatDetails, appendPopUp } from '@utils/helpers';
import { MessagesController } from '@controllers/messages-controller';
import './chat-list.css';

export default class ChatList extends Block {
    constructor() {
        super({}, 'div');

        this.element.classList.add('window', 'lg', 'p-2/5', 'chats', 'bg-pink', 'd-flex', 'h-100');
        store.on(StoreEvents.Updated, () => {
            const chats = store.getState()?.chats;
            this.setProps({ chats });
        });
    }

    init() {
        this.children.buttonAccount = new ButtonIcon({
            title: 'Account',
            id: 'settings',
            icon: 'hamburger',
            css: ['mr-1/5', 'bg-green'],
            settings: {
                withInternalID: true,
            },
            events: {
                click(e) {
                    e.preventDefault();
                    router.load('settings');
                },
            },
        });
        this.children.buttonAddChat = new ButtonIcon({
            title: 'Add Chat',
            id: 'add-chat',
            icon: 'star',
            css: ['ml-1/5', 'bg-orange'],
            action: 'add-chat',
            settings: {
                withInternalID: true,
            },
            events: {
                click(e) {
                    e.preventDefault();
                    appendPopUp(new PopUpAddChat());
                },
            },
        });
        this.children.chats = [];
    }

    componentDidUpdate(): boolean {
        const state = store?.getState();
        const chats = state?.chats;
        const currentChatId = state?.chatId;
        if (!chats) {
            return false;
        }
        this.children.chats = [];
        chats.forEach((chat: ChatApiProps) => {
            const chatDetails = getChatDetails(chat);
            this.children.chats.push(
                new Chat({
                    ...chatDetails,
                    id: chat.id,
                    title: chat.title,
                    unread: chat.unread_count ? chat.unread_count : 0,
                    avatar: new Avatar({
                        size: 'md',
                    }),
                    active: currentChatId && currentChatId === chat.id,
                    events: {
                        async click(e) {
                            e.preventDefault();
                            const messages = new MessagesController();
                            const chatEl = e.currentTarget;
                            const chatId = chatEl?.dataset?.id;
                            if (!chatId) {
                                alert('Oops, there is no chat ID found');
                                return;
                            }
                            await messages.connect(chatId);
                            chatEl.classList.add('active');
                        },
                    },
                })
            );
        });
        return true;
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {});
    }
}
