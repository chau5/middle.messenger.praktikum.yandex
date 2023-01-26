import Block from '~/src/utils/block';
import Chat from './components/chat';
import Avatar from '~/src/components/avatar';
import InputSearch from './components/input-search';
import ButtonIcon from '~/src/components/button-icon';
import router from '~/src/index';
import template from './chat-list.hbs';
import imageAvatar from '~/static/images/60.png';
import './chat-list.css';

export default class ChatList extends Block {
    constructor() {
        super({}, 'div');

        this.element.classList.add('window', 'lg', 'p-2/5', 'chats', 'bg-pink', 'd-flex', 'h-100');
    }

    init() {
        this.children.buttonIcon = new ButtonIcon({
            title: 'Account',
            id: 'account',
            icon: 'hamburger',
            styles: ['mr-1/5', 'bg-green'],
            settings: {
                withInternalID: true,
            },
            events: {
                click(e) {
                    e.preventDefault();
                    router.load('account', true);
                },
            },
        });
        this.children.inputSearch = new InputSearch();
        this.children.chat_1 = new Chat({
            avatar: new Avatar({
                url: imageAvatar,
                size: 'md',
            }),
            title: 'Jake',
            lastMessage:
                'Lorem ipsum dolor sit amet, consectetur adipiscingelit. Nam mollis efficitur commodo. Cras venenatis...',
            datetime: '2:14pm',
            unread: 2,
        });
        this.children.chat_2 = new Chat({
            title: 'Kate',
            avatar: new Avatar({
                size: 'md',
            }),
            lastMessage: 'Curabitur posuere ipsum nec orc!',
            own: true,
            datetime: '10:10am',
            unread: 1,
        });
        this.children.chat_3 = new Chat({
            title: 'English Club',
            avatar: new Avatar({
                url: imageAvatar,
                size: 'md',
            }),
            lastMessageSticker: true,
            datetime: 'Sun',
        });
        this.children.chat_4 = new Chat({
            title: 'Jerry',
            avatar: new Avatar({
                size: 'md',
            }),
            lastMessage:
                'Donec porta massa vel scelerisque vulputate. Aenean lectus orci, cursus ut ornare sit amet, aliquam non u',
            datetime: 'Fri',
        });
        this.children.chat_5 = new Chat({
            title: "Designer's Club",
            avatar: new Avatar({
                size: 'md',
            }),
            lastMessageImage: true,
            datetime: 'Wed',
        });
        this.children.chat_6 = new Chat({
            title: 'Mary',
            avatar: new Avatar({
                size: 'md',
            }),
            lastMessageSticker: true,
            own: true,
            datetime: 'Mon',
        });
        this.children.chat_7 = new Chat({
            title: 'Friends Group',
            avatar: new Avatar({
                size: 'md',
            }),
            lastMessage: 'Etiam tincidunt ex ut eros fringilla, ut laoreet quis!',
            datetime: '9 Sep',
        });
        this.children.chat_8 = new Chat({
            title: 'Mike',
            avatar: new Avatar({
                size: 'md',
            }),
            lastMessageImage: true,
            datetime: 'Dec 2021',
            own: true,
        });
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {});
    }
}
