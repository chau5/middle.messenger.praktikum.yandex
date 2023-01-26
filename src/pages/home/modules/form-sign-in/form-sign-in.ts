import Block from '~/src/utils/block';
import { FormProps } from '~/src/utils/prop-types';
import template from './form-sign-in.hbs';

export default class FormSignIn extends Block {
    constructor(props: FormProps) {
        super(props, 'form');

        if (!this.element) {
            return;
        }

        this.element.classList.add('h-100', 'd-flex', 'flex-column', 'justify-content-between');
        this.element.setAttribute('id', props.id);
        this.element.setAttribute('action', '#');
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
