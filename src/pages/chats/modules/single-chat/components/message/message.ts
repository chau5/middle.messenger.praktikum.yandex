import Block from '~/src/utils/block';
import { MessageProps } from '~/src/utils/prop-types';
import template from './message.hbs';
import * as classes from './message.module.css';

export default class Message extends Block {
    constructor(props: MessageProps) {
        super(props, 'div');

        if (!this.element) {
            return;
        }

        // add default classes
        this.element.classList.add('window', 'message', 'w-50', 'mb-2/5', 'd-flex', 'p-2', 'pb-4');

        if (props.own) {
            this.element.classList.add('bg-cyan-light', classes['message-own']);
        } else {
            this.element.classList.add('bg-green-light');
        }
    }

    render() {
        return this.compile(template, { ...this.props, classes });
    }
}
