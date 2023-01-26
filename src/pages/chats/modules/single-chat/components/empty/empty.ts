import Block from '~/src/utils/block';
import template from './empty.hbs';

export default class Empty extends Block {
    constructor() {
        super({}, 'div');

        if (!this.element) {
            return;
        }

        // add default classes
        this.element.classList.add(
            'message',
            'd-flex',
            'h-100',
            'align-items-center',
            'justify-content-center'
        );
    }

    render() {
        return this.compile(template, {});
    }
}
