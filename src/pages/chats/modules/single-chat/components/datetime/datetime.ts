import Block from '~/src/utils/block';
import { DatetimeProps } from '~/src/utils/prop-types';
import template from './datetime.hbs';

export default class Datetime extends Block {
    constructor(props: DatetimeProps) {
        super(props, 'div');

        if (!this.element) {
            return;
        }

        // add default classes
        this.element.classList.add('date', 'mb-4');
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
