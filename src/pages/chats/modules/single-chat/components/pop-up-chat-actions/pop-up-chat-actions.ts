import Block from '@utils/block';
import ButtonIcon from '@components/button-icon';
import Button from '@components/button';
import InputWLabel from '@components/input-w-label';
import { ChatsController } from '@controllers/chats-controller';
import { closePopUp } from '@utils/helpers';
import template from './pop-up-chat-actions.hbs';

export default class PopUpChatActions extends Block {
    constructor() {
        super({}, 'div');
    }

    init() {
        this.children.buttonBack = new ButtonIcon({
            title: 'Close',
            id: 'close',
            icon: 'close',
            css: ['bg-orange'],
            action: 'close',
            events: {
                click(e) {
                    e.preventDefault();
                    closePopUp();
                },
            },
        });
        this.children.inputs = [
            new InputWLabel({
                title: 'Chat user ID',
                id: 'chat_user_id',
                type: 'text',
                css: ['d-none'],
            }),
        ];
        this.children.buttons = [
            new Button({
                title: 'Add chat user',
                id: 'add-chat-user-init',
                css: ['bg-green', 'mb-2'],
                action: 'add-chat-user-init',
                events: {
                    async click(e) {
                        e.preventDefault();
                        /** @todo could be some refactoring here */
                        document.querySelector('#remove-chat-user-init')?.classList.add('d-none');
                        document.querySelector('#delete')?.classList.add('d-none');
                        const chatUserIdInput = document.querySelector(
                            '#chat_user_id'
                        ) as HTMLInputElement;
                        chatUserIdInput.closest('.input-w-label')?.classList.remove('d-none');
                        document.querySelector('#cancel')?.classList.remove('d-none');
                        document.querySelector('#add-chat-user')?.classList.remove('d-none');
                        e.currentTarget.classList.add('d-none');
                    },
                },
            }),
            new Button({
                title: 'Add chat user',
                id: 'add-chat-user',
                css: ['bg-green', 'mb-2', 'd-none'],
                action: 'add-chat-user',
                events: {
                    async click(e) {
                        e.preventDefault();
                        /** @todo some refactoring here too please */
                        const chatUserIdInput = document.querySelector(
                            '#chat_user_id'
                        ) as HTMLInputElement;
                        const chatUserId = chatUserIdInput.value;
                        if (!chatUserId) {
                            alert('Oops, you need to provide a user id to add them');
                            return;
                        }
                        const pattern = /^(\d){1,10}$/;
                        if (!pattern.test(chatUserId)) {
                            alert('Oops, user ID needs to be a number');
                            return;
                        }
                        const chats = new ChatsController();
                        await chats.addChatUser(Number(chatUserId));
                        closePopUp();
                    },
                },
            }),
            new Button({
                title: 'Remove chat user',
                id: 'remove-chat-user-init',
                css: ['bg-orange', 'mb-2'],
                action: 'remove-chat-user-init',
                events: {
                    async click(e) {
                        e.preventDefault();
                        /** @todo could be some refactoring here */
                        document.querySelector('#add-chat-user-init')?.classList.add('d-none');
                        document.querySelector('#delete')?.classList.add('d-none');
                        const chatUserIdInput = document.querySelector(
                            '#chat_user_id'
                        ) as HTMLInputElement;
                        chatUserIdInput.closest('.input-w-label')?.classList.remove('d-none');
                        document.querySelector('#cancel')?.classList.remove('d-none');
                        document.querySelector('#remove-chat-user')?.classList.remove('d-none');
                        e.currentTarget.classList.add('d-none');
                    },
                },
            }),
            new Button({
                title: 'Remove chat user',
                id: 'remove-chat-user',
                css: ['bg-orange', 'mb-2', 'd-none'],
                action: 'remove-chat-user',
                events: {
                    async click(e) {
                        e.preventDefault();
                        /** @todo some refactoring here too please */
                        const chatUserIdInput = document.querySelector(
                            '#chat_user_id'
                        ) as HTMLInputElement;
                        const chatUserId = chatUserIdInput.value;
                        if (!chatUserId) {
                            alert('Oops, you need to provide a user id to add them');
                            return;
                        }
                        const pattern = /^(\d){1,10}$/;
                        if (!pattern.test(chatUserId)) {
                            alert('Oops, user ID needs to be a number');
                            return;
                        }
                        const chats = new ChatsController();
                        await chats.removeChatUser(Number(chatUserId));
                        closePopUp();
                    },
                },
            }),
            new Button({
                title: 'Delete chat',
                id: 'delete',
                css: ['bg-red', 'mb-2'],
                action: 'delete',
                events: {
                    async click(e) {
                        e.preventDefault();
                        if (!window.confirm('Are you sure?')) {
                            return;
                        }
                        /** @todo group similar new ChatsController() */
                        const chats = new ChatsController();
                        await chats.delete();
                        closePopUp();
                    },
                },
            }),
            new Button({
                title: 'Cancel',
                id: 'cancel',
                css: ['bg-red', 'mb-2', 'd-none'],
                action: 'cancel',
                events: {
                    async click(e) {
                        e.preventDefault();
                        /** @todo could be some refactoring here */
                        document.querySelector('#add-chat-user')?.classList.add('d-none');
                        document.querySelector('#remove-chat-user')?.classList.add('d-none');
                        document.querySelector('#add-chat-user-init')?.classList.remove('d-none');
                        document
                            .querySelector('#remove-chat-user-init')
                            ?.classList.remove('d-none');
                        document.querySelector('#delete')?.classList.remove('d-none');
                        e.currentTarget.classList.add('d-none');
                        const chatUserIdInput = document.querySelector(
                            '#chat_user_id'
                        ) as HTMLInputElement;
                        chatUserIdInput.closest('.input-w-label')?.classList.add('d-none');
                    },
                },
            }),
        ];
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {
            ...this.props,
        });
    }
}
