import chat from './components/chat';
import avatar from '~/src/components/avatar';
import searchInput from './components/search-input';
import buttonIcon from '~/src/components/button-icon/buttonIcon';
import template from './chats.hbs';
import './chats.css';

export default (
    props = {
        buttonIcon: buttonIcon({
            title: 'Account',
            id: 'account',
            icon: 'hamburger',
            styles: 'mr-1/5 bg-green',
        }),
        searchInput,
        chats: [
            chat({
                title: 'Jake',
                avatar: avatar({
                    url: 'https://via.placeholder.com/60',
                    size: 'md',
                }),
                lastMessage:
                    'Lorem ipsum dolor sit amet, consectetur adipiscingelit. Nam mollis efficitur commodo. Cras venenatis...',
                datetime: '2:14pm',
                unread: 2,
            }),
            chat({
                title: 'Kate',
                avatar: avatar({
                    size: 'md',
                }),
                lastMessage: 'Curabitur posuere ipsum nec orc!',
                own: true,
                datetime: '10:10am',
                unread: 1,
            }),
            chat({
                title: 'English Club',
                avatar: avatar({
                    url: 'https://via.placeholder.com/60',
                    size: 'md',
                }),
                lastMessageSticker: true,
                datetime: 'Sun',
            }),
            chat({
                title: 'Jerry',
                avatar: avatar({
                    size: 'md',
                }),
                lastMessage:
                    'Donec porta massa vel scelerisque vulputate. Aenean lectus orci, cursus ut ornare sit amet, aliquam non u',
                datetime: 'Fri',
            }),
            chat({
                title: "Designer's Club",
                avatar: avatar({
                    size: 'md',
                }),
                lastMessageImage: true,
                datetime: 'Wed',
            }),
            chat({
                title: 'Mary',
                avatar: avatar({
                    size: 'md',
                }),
                lastMessageSticker: true,
                own: true,
                datetime: 'Mon',
            }),
            chat({
                title: 'Friends Group',
                avatar: avatar({
                    size: 'md',
                }),
                lastMessage: 'Etiam tincidunt ex ut eros fringilla, ut laoreet quis!',
                datetime: '9 Sep',
            }),
            chat({
                title: 'Mike',
                avatar: avatar({
                    size: 'md',
                }),
                lastMessageImage: true,
                datetime: 'Dec 2021',
                own: true,
            }),
        ],
    }
) => template({ props });
