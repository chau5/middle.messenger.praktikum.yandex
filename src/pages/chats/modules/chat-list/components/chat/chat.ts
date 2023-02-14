import Block from '~/src/utils/block';
import { ChatProps } from '~/src/utils/prop-types';
import template from './chat.hbs';
import './chat.css';

export default class Chat extends Block {
    constructor(props: ChatProps) {
        super(props, 'div');

        if (!this.element) {
            return;
        }

        // add default classes
        this.element.classList.add(
            'chat',
            'window',
            'pad',
            'sm',
            'p-0/5',
            'chat',
            'bg-cyan-light',
            'mb-2',
            'p-2'
        );

        this.element.setAttribute('data-id', this.props.id);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
