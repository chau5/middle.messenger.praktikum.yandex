import Block from '~/src/utils/block';
import { MessageStickerProps, StickersProps } from '~/src/utils/prop-types';
import template from './message-sticker.hbs';
import * as classes from './message-sticker.module.css';
import smile from '~/static/stickers/smile.png';

const stickers: StickersProps = {
    smile,
};

export default class MessageSticker extends Block {
    constructor(props: MessageStickerProps) {
        super(props, 'div');

        if (!this.element) {
            return;
        }

        // add default classes
        this.element.classList.add(
            'window',
            'message',
            'w-fit',
            'mw-50',
            'mb-2/5',
            'd-flex',
            'p-0',
            'pb-3',
            classes.window
        );

        if (props.own) {
            this.element.classList.add(classes['message-own']);
        } else {
            this.element.classList.add('bg-green-light');
        }
    }

    render() {
        return this.compile(template, {
            ...this.props,
            classes,
            sticker: stickers[this.props.sticker],
            stickerName: this.props.sticker,
        });
    }
}
