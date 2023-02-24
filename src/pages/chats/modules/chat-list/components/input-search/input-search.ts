import Block from '~/src/utils/block';
import template from './input-search.hbs';

export default class InputSearch extends Block {
    constructor() {
        super({}, 'div');

        if (!this.element) {
            return;
        }

        // add default classes
        this.element.classList.add(
            'input-wrap',
            'input-search',
            'window',
            'sm',
            'bg-gray-light',
            'input-search'
        );
    }

    render() {
        return this.compile(template, {});
    }
}
