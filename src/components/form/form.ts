import Block from '~/src/utils/block';
import { FormProps, UserProps, UserSignInProps } from '~/src/utils/prop-types';
import { validateForm } from '~/src/utils/validator';
import { AuthController } from '~/src/controllers/auth-controller';
import { SettingsController } from '~/src/controllers/settings-controller';

import template from './form.hbs';

export default class Form extends Block {
    constructor(props: FormProps) {
        const auth = new AuthController();
        const settings = new SettingsController();

        props.events = {
            async submit(e) {
                try {
                    e.preventDefault();
                    if (!validateForm(e.target)) {
                        return;
                    }
                    const formData = new FormData(e.target);
                    const formProps = Object.fromEntries(formData);
                    console.log('submitting form');
                    if (props.id === 'form-sign-in') {
                        await auth.signin(formProps as UserSignInProps);
                    } else if (props.id === 'form-sign-up') {
                        console.log('form: sign up');
                    } else if (props.id === 'account') {
                        console.log('form: update account');
                        await settings.update(formProps as UserProps);
                    }
                } catch (error: any) {
                    alert(`Oops, something went wrong: ${error.message}`);
                    console.error(error.message);
                }
            },
        };

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
