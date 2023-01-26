import Block from '~/src/utils/block';
import { FormAccountProps } from '~/src/utils/prop-types';
import template from './form-account.hbs';

export default class FormAccount extends Block {
    constructor(props: FormAccountProps) {
        super(props, 'form');

        if (!this.element) {
            return;
        }

        this.element.classList.add('h-100', 'd-flex', 'flex-column', 'align-items-center');
        this.element.setAttribute('id', props.id);
        this.element.setAttribute('action', '#');
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
