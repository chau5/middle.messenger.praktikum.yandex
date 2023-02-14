import Block from '~/src/utils/block';
import { MessageImageProps } from '~/src/utils/prop-types';
import template from './message-image.hbs';
import * as classes from './message-image.module.css';

export default class MessageImage extends Block {
    constructor(props: MessageImageProps) {
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
            classes.window
        );

        if (props.own) {
            this.element.classList.add(classes['message-own']);
        } else {
            this.element.classList.add('bg-green-light');
        }
    }

    render() {
        return this.compile(template, { ...this.props, classes });
    }
}
