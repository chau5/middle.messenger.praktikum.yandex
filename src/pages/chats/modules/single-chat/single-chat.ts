import Avatar from '~/src/components/avatar';
import Header from './components/header';
import Datetime from './components/datetime';
import Message from './components/message';
import MessageImage from './components/message-image';
import MessageSticker from './components/message-sticker';
import FormMessage from './modules/form-message';
import Block from '~/src/utils/block';
import template from './single-chat.hbs';
import imageMessage from '~/static/images/300x200.png';
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
    }

    init() {
        this.children.header = new Header({
            avatar: new Avatar({
                size: 'sm',
            }),
            title: 'Jerry',
        });
        this.children.datetime = new Datetime({
            date: 'Jun 20',
        });
        this.children.messages = [
            new Message({
                content:
                    'Pellentesque congue imperdiet urna non eleifend. In eu odio finibus pretium nisl non, gravida nunc. Cras faucibus in arcu et pulvinar. Mauris tincidunt accumsan convalli.<br /><br />Curabitur posuere ipsum nec orci auctor blandit. Nam at odio elementum, hendrerit ex aliquet, congue elit. Praesent tincidunt vestibulum lacinia. Nunc vehicula at mauris a consectetur.<br /><br />Vestibulum imperdiet tortor mauris, eu cursus lacus dignissim.',
                datetime: '2:14pm',
            }),
            new MessageImage({
                image: imageMessage,
                datetime: '2:18pm',
            }),
            new Message({
                content: 'Cool!',
                datetime: '2:20pm',
                own: true,
            }),
            new MessageSticker({
                sticker: 'smile',
                datetime: '2:21pm',
                own: true,
            }),
            new MessageImage({
                image: imageMessage,
                datetime: '2:30pm',
                own: true,
            }),
        ];
        this.children.form = new FormMessage({
            id: 'send-message',
        });
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {});
    }
}
