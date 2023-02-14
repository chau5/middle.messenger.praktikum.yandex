import { CallbackType } from '~/src/utils/event-bus';
import Input from '~/src/components/input';
import InputWLabel from '~/src/components/input-w-label';
import Button from '~/src/components/button';
import Avatar from '~src/components/avatar';
import ButtonIcon from '~/src/components/button-icon';
import InputMessage from '~/src/pages/chats/modules/single-chat/modules/form-message/components/input-message';

export type BlockProps = {
    css?: string[];
    child?: string;
};

export type FormProps = BlockProps & {
    id: string;
    settings?: { withInternalID?: boolean; displayName?: string };
    events?: Record<string, CallbackType>;
    [key: `input_${string}`]: InputWLabel | Input;
    [key: `button_${string}`]: Button | ButtonIcon;
    inputs?: InputWLabel[];
    buttons?: Button[];
};

export type InputProps = BlockProps & {
    title: string;
    type: string;
    id: string;
    settings?: { withInternalID?: boolean; disabled?: boolean };
    events?: Record<string, CallbackType>;
    value?: string;
};

export type ButtonProps = BlockProps & {
    title: string;
    id: string;
    link?: string;
    settings?: { withInternalID?: boolean };
    events?: Record<string, CallbackType>;
    action?: string;
};

export type ButtonIconProps = ButtonProps & {
    icon: string;
};

export type AvatarProps = BlockProps & {
    size: string;
    url?: string;
};

export type HeaderProps = BlockProps & {
    title: string;
    avatar?: Avatar;
};

export type DatetimeProps = BlockProps & {
    date: string;
};

export type MessageImageProps = BlockProps & {
    datetime: string;
    own?: boolean;
    image: string;
};

export type MessageStickerProps = BlockProps & {
    datetime: string;
    own?: boolean;
    sticker: string;
};

export type FooterProps = BlockProps & {
    inputMessage: InputMessage;
    buttonAttach: ButtonIcon;
    buttonSend: ButtonIcon;
};

export type IconProps = {
    [key: string]: string;
};

export type StickersProps = {
    [key: string]: string;
};

export type UserSignInProps = {
    login: string;
    password: string;
};

export type UserProps = UserSignInProps & {
    login: string;
    password: string;
    email: string;
    phone: string;
    first_name?: string;
    second_name?: string;
    display_name?: string;
};

export type ChatProps = {
    avatar: Avatar;
    title: string;
    id: number;
    datetime?: string | null;
    unread?: number;
    lastMessage?: string | null;
    lastMessageImage?: boolean;
    lastMessageSticker?: boolean;
    own?: boolean;
    events?: Record<string, CallbackType>;
};

export type MessageProps = {
    content: string;
    datetime: string;
    own?: boolean;
};

export type MessageApiProps = {
    user: UserProps;
    time: string;
    content: string | any;
    id: number;
};

export type ChatApiProps = {
    id: number;
    title: string;
    avatar: string | null;
    created_by: number;
    last_message: MessageApiProps;
    unread_count: number;
};

export type ChatDetailsProps = {
    datetime: string | null;
    lastMessage: string | null;
    own: boolean;
};
