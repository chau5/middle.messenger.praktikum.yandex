import Block from '~/src/utils/block';
import ChatList from './modules/chat-list';
import SingleChat from './modules/single-chat';
import template from './chats.hbs';

export default class PageChats extends Block {
    constructor() {
        super({}, 'div');

        this.element.classList.add('d-flex', 'page', 'chats');
    }

    init() {
        this.children.chatList = new ChatList();
        this.children.singleChat = new SingleChat();
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {});
    }
}
