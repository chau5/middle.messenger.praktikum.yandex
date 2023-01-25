import Block from '~/src/utils/block';
import { FormProps } from '~/src/utils/prop-types';
import validator from '~/src/utils/validator';
import template from './form-sign-up.hbs';

export default class FormSignUp extends Block {
    constructor(props: FormProps) {
        super(props, 'form');

        if (!this.element) {
            return;
        }

        this.element.classList.add('h-100', 'd-flex', 'flex-column', 'justify-content-between');
        this.element.setAttribute('id', props.id);
        this.element.setAttribute('action', '#');

        this.element.addEventListener('blur', validator, true);
        this.element.addEventListener('focus', validator, true);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
