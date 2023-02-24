import Block from '@utils/block';
import { InputProps } from '@utils/prop-types';
import validateInput from '@utils/validator';
import template from './input-w-label.hbs';

export default class InputWLabel extends Block {
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

        this.element.classList.add('input-w-label');
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
