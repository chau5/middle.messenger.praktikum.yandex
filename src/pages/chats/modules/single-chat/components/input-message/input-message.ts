import Block from '~/src/utils/block';
import template from './input-message.hbs';

export default class Input extends Block {
    constructor() {
        super({}, 'div');

        if (!this.element) {
            return;
        }

        this.element.classList.add('input-wrap', 'window', 'sm', 'bg-gray-light');
    }

    render() {
        return this.compile(template, {});
    }
}
