import Avatar from '~/src/components/avatar';
import Header from './components/header';
import Message from './components/message';
import FormMessage from './modules/form-message';
import Empty from './components/empty';
import store, { StoreEvents } from '~/src/utils/store';
import Block from '~/src/utils/block';
import { getDatetime, getTimestamp } from '~/src/utils/helpers';
import { MessageApiProps } from '~/src/utils/prop-types';
import template from './single-chat.hbs';
import './single-chat.css';

export default class SingleChat extends Block {
    constructor() {
        super({}, 'div');

        this.element.classList.add(
            'window',
            'lg',
            'p-2/5',
            'single-chat',
            'bg-orange-light',
            'd-flex',
            'h-100'
        );

        store.on(StoreEvents.Updated, () => {
            const displayName = store.getState()?.user?.display_name;
            this.setProps({ displayName });
        });
    }

    init() {
        this.children.placeholder = new Empty();
    }

    componentDidUpdate(): boolean {
        const state = store?.getState();
        const userId = state?.user?.id;
        const messages = state?.messages;

        if (messages === null) {
            this.children.placeholder = new Empty();
            delete this.children.messages;
            delete this.children.header;
            delete this.children.form;
            return true;
        }

        if (!messages) {
            return false;
        }

        this.children.header = new Header({
            avatar: new Avatar({
                size: 'sm',
            }),
            title: state?.chatTitle,
        });
        delete this.children.placeholder;
        this.children.messages = messages.map(
            (message: MessageApiProps) =>
                new Message({
                    content: message.content,
                    datetime: getDatetime(getTimestamp(message.time)),
                    own: message.user_id === userId,
                })
        );
        this.children.form = new FormMessage({
            id: 'send-message',
        });
        return true;
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {});
    }
}
