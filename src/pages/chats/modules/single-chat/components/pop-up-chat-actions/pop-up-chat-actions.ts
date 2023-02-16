import Block from '~/src/utils/block';
import ButtonIcon from '~/src/components/button-icon';
import Button from '~/src/components/button';
import { ChatsController } from '~/src/controllers/chats-controller';
import { closePopUp } from '~/src/utils/helpers';
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
        this.children.buttons = [
            new Button({
                title: 'Delete chat',
                id: 'delete',
                css: ['bg-red'],
                action: 'delete',
                events: {
                    async click(e) {
                        e.preventDefault();
                        if (!confirm('Are you sure?')) {
                            return;
                        }
                        /** @todo group similar new ChatsController() */
                        const chats = new ChatsController();
                        await chats.delete();
                        closePopUp();
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
