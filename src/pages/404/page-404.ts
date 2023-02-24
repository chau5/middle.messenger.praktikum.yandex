import Block from '@utils/block';
import template from './page-404.hbs';

export default class Page500 extends Block {
    constructor() {
        super({}, 'div');
    }

    render() {
        return this.compile(template, {});
    }
}
