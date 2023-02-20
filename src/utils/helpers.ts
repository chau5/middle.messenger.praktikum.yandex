import { ChatApiProps, ChatDetailsProps } from '~/src/utils/prop-types';
import Block from './block';
import store from './store';

type Indexed<T = unknown> = {
    [key in string]: T;
};

const isObject = (value: Indexed) =>
    typeof value === 'object' && !Array.isArray(value) && value !== null;

const isString = (value: unknown) => typeof value === 'string' || value instanceof String;

const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
    // eslint-disable-next-line no-restricted-syntax
    for (const j in rhs) {
        // eslint-disable-next-line no-prototype-builtins
        if (!rhs.hasOwnProperty(j)) {
            // eslint-disable-next-line no-continue
            continue;
        }

        try {
            if (isObject(rhs[j] as Indexed)) {
                rhs[j] = merge(lhs[j] as Indexed, rhs[j] as Indexed);
            } else {
                lhs[j] = rhs[j];
            }
        } catch (e) {
            lhs[j] = rhs[j];
        }
    }
    return lhs;
};

export const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
    if (!isObject) {
        return object;
    }
    if (!isString(path)) {
        throw new Error('path must be string');
    }

    const keys = path.split('.');
    const rhs = keys.reduceRight(
        (prev, key) => ({
            [key]: prev,
        }),
        value
    );

    return merge(object as Indexed, rhs as Indexed);
};

/** Check provided date is today */
const isToday = (date: Date): boolean => new Date().toDateString() === date.toDateString();

/** Get month name */
const getMonthName = (monthNumber: number): string => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return months[monthNumber];
};

/** Get chat datetime based on the last message date */
const getChatDatetime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const hoursRaw = date.getHours();
    const hours = hoursRaw ? hoursRaw % 12 : 12;
    const minutes = date.getMinutes();
    const ampm = hoursRaw >= 12 ? 'pm' : 'am';
    if (isToday(date)) {
        return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}${ampm}`;
    }
    return `${getMonthName(date.getMonth())} ${date.getDate() + 1}, ${date.getFullYear()}`;
};

/** Get a timestamp from the provided string */
export const getTimestamp = (date: string): number => Date.parse(date);

/** Get datetime from the provided timestamp */
export const getDatetime = (timestamp: number): string => new Date(timestamp).toLocaleString();

const trimMessage = (message: string): string => {
    const maxLength = 75;
    if (message.length <= maxLength) {
        return message;
    }
    return `${message.substring(0, 75)}...`;
};

export const getChatDetails = (chat: ChatApiProps): ChatDetailsProps => {
    const timestamp = getTimestamp(chat?.last_message?.time);
    const date = timestamp ? getChatDatetime(timestamp) : null;
    const lastMessage = chat?.last_message?.content ? trimMessage(chat.last_message.content) : null;

    // check last message owner
    const messageOwnerLogin = chat?.last_message?.user?.login;
    const currentUserLogin = store?.getState()?.user?.login;
    // required by TS
    // eslint-disable-next-line no-unneeded-ternary
    const own = messageOwnerLogin && messageOwnerLogin === currentUserLogin ? true : false;

    return {
        datetime: date,
        lastMessage,
        own,
    };
};

export const appendPopUp = (popUp: Block) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('pop-up');
    wrapper.innerHTML = '';
    wrapper.appendChild(popUp.render());
    document.body.appendChild(wrapper);
};

export const closePopUp = () => {
    const popUpWrap = document.querySelector('.pop-up');
    if (!popUpWrap) {
        return;
    }
    popUpWrap.remove();
};

export const processResponse = (response: XMLHttpRequest) => {
    const responseText = JSON.parse(response.response);
    if (response.status !== 200) {
        const { reason } = responseText;
        console.warn(`Oops, something went wrong: ${reason}`);
        alert(`Oops, something went wrong: ${reason}`);
        return false;
    }
    return responseText;
};
