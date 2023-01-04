import chat from './components/chat';
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
        searchInput: searchInput(),
        chats: [
            chat({
                avatar: 'https://via.placeholder.com/60',
                title: 'Jake',
                lastMessage:
                    'Lorem ipsum dolor sit amet, consectetur adipiscingelit. Nam mollis efficitur commodo. Cras venenatis...',
                lastMessageType: 'text',
                lastMessageOwner: 'them',
                datetime: '2:14pm',
                unread: 2,
            }),
            chat({
                avatar: 'https://via.placeholder.com/60',
                title: 'Kate',
                lastMessage: 'Curabitur posuere ipsum nec orc!',
                lastMessageType: 'text',
                lastMessageOwner: 'you',
                datetime: '10:10am',
                unread: 1,
            }),
        ],
    }
) => template({ props });
