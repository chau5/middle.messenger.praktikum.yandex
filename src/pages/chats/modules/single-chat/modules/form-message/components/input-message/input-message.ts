import Block from '~/src/utils/block';
import { InputProps } from '~/src/utils/prop-types';
import validateInput from '~/src/utils/validator';
import template from './input-message.hbs';

export default class InputMessage extends Block {
    constructor(props: InputProps) {
        props.events = {
            blur(e) {
                validateInput(e.target);
            },
            focus(e) {
                validateInput(e.target);
            },
        };
        props.child = 'input';

        super(props, 'div');

        if (!this.element) {
            return;
        }

        this.element.classList.add('input-wrap', 'window', 'sm', 'bg-gray-light');
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
