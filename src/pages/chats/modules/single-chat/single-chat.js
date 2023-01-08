import avatar from '~/src/components/avatar';
import header from './components/header';
import message from './components/message';
import messageImage from './components/message-image';
import messageSticker from './components/message-sticker';
import date from './components/date';
import footer from './components/footer';
import template from './single-chat.hbs';
import './single-chat.css';

const data = {
    title: 'Jerry',
};

/** @todo refactor when get data from API */
export default (
    props = {
        header: header({
            avatar: avatar({
                url: 'https://via.placeholder.com/60',
                size: 'sm',
            }),
            title: data.title,
        }),
        date: date({
            date: 'Jun 20',
        }),
        messages: [
            {
                message: message({
                    content:
                        'Pellentesque congue imperdiet urna non eleifend. In eu odio finibus pretium nisl non, gravida nunc. Cras faucibus in arcu et pulvinar. Mauris tincidunt accumsan convalli.<br /><br />Curabitur posuere ipsum nec orci auctor blandit. Nam at odio elementum, hendrerit ex aliquet, congue elit. Praesent tincidunt vestibulum lacinia. Nunc vehicula at mauris a consectetur.<br /><br />Vestibulum imperdiet tortor mauris, eu cursus lacus dignissim.',
                    datetime: '2:14pm',
                }),
            },
            {
                message: messageImage({
                    image: 'https://via.placeholder.com/300x200',
                    datetime: '2:18pm',
                }),
            },
            {
                message: message({
                    content: 'Cool!',
                    datetime: '2:20pm',
                    own: true,
                }),
            },
            {
                message: messageSticker({
                    sticker: 'smile',
                    datetime: '2:21pm',
                    own: true,
                }),
            },
            {
                message: messageImage({
                    image: 'https://via.placeholder.com/300x200',
                    datetime: '2:30pm',
                    own: true,
                }),
            },
        ],
        footer,
    }
) => template({ props });
