import { CallbackType } from '~/src/utils/event-bus';
import InputWLabel from '~/src/components/input-w-label';
import Button from '~/src/components/button';
import Avatar from '~src/components/avatar';
import ButtonIcon from '~/src/components/button-icon';
import InputMessage from '~/src/pages/chats/modules/single-chat/components/input-message';

export type FormProps = {
    id: string;
    [key: `input_${string}`]: InputWLabel;
    [key: `button_${string}`]: Button;
    styles?: string[];
    settings?: { withInternalID?: boolean };
    events?: Record<string, CallbackType>;
};

export type FormAccountProps = FormProps & {
    id: string;
    displayName: string;
    avatar: Avatar;
};

export type InputProps = {
    title: string;
    type: string;
    id: string;
    styles?: string[];
    settings?: { withInternalID?: boolean; disabled?: boolean };
    events?: Record<string, CallbackType>;
    value?: string;
};

export type ButtonProps = {
    title: string;
    id: string;
    styles?: string[];
    link?: string;
    settings?: { withInternalID?: boolean };
    events?: Record<string, CallbackType>;
    action?: string;
};

export type ButtonIconProps = ButtonProps & {
    icon: string;
};

export type AvatarProps = {
    size: string;
    url?: string;
    styles?: string[];
};

export type ChatProps = {
    title: string;
    avatar?: Avatar;
    lastMessage?: string;
    datetime: string;
    unread?: number;
    lastMessageImage?: boolean;
    lastMessageSticker?: boolean;
    own?: boolean;
};

export type IconProps = {
    [key: string]: string;
};

export type HeaderProps = {
    title: string;
    avatar?: Avatar;
};

export type DatetimeProps = {
    date: string;
};

export type MessageProps = {
    content: string;
    datetime: string;
    own?: boolean;
    styles?: string[];
};

export type MessageImageProps = {
    datetime: string;
    own?: boolean;
    image: string;
    styles?: string[];
};

export type MessageStickerProps = {
    datetime: string;
    own?: boolean;
    sticker: string;
    styles?: string[];
};

export type StickersProps = {
    [key: string]: string;
};

export type FooterProps = {
    inputMessage: InputMessage;
    buttonAttach: ButtonIcon;
    buttonSend: ButtonIcon;
};

export type PageHomeProps = {
    title?: string;
    type: string;
};
