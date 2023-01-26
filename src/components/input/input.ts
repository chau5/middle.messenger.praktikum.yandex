import Block from '~/src/utils/block';
import { InputProps } from '~/src/utils/prop-types';
import template from './input.hbs';

export default class Input extends Block {
    constructor(props: InputProps) {
        super(props, 'div');

        if (!this.element) {
            return;
        }

        this.element.classList.add('input-wrap', 'window', 'p-0/5', 'sm', 'bg-gray-light');
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
