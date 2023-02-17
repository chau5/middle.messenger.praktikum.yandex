import Block from '~/src/utils/block';
import { FormProps, UserProps, UserSignInProps } from '~/src/utils/prop-types';
import { validateForm, validatePassword } from '~/src/utils/validator';
import { AuthController } from '~/src/controllers/auth-controller';
import { ChatsController } from '~/src/controllers/chats-controller';
import { SettingsController } from '~/src/controllers/settings-controller';

import template from './form.hbs';

export default class Form extends Block {
    constructor(props: FormProps) {
        const auth = new AuthController();
        const settings = new SettingsController();
        const chats = new ChatsController();

        props.events = {
            async submit(e) {
                try {
                    e.preventDefault();
                    if (!validateForm(e.target)) {
                        return;
                    }
                    const formData = new FormData(e.target);
                    const formProps = Object.fromEntries(formData);
                    if (props.id === 'form-sign-in') {
                        await auth.signin(formProps as UserSignInProps);
                    } else if (props.id === 'form-sign-up') {
                        console.log('form: sign up');
                    } else if (props.id === 'account') {
                        await settings.update(formProps as UserProps);
                    } else if (props.id === 'form-add-chat') {
                        await chats.create(formProps.chat_name as string);
                        const popUp = document.querySelector('.pop-up');
                        popUp?.remove();
                    } else if (props.id === 'form-password') {
                        if (!validatePassword(e.target)) {
                            alert(
                                'Oops, something is wrong with your password values, please ensure new values match and the old one is correct'
                            );
                            return;
                        }
                        if (
                            !window.confirm('Are you sure? You will be logged out after the change')
                        ) {
                            return;
                        }
                        const passwordUpdated = await settings.updatePassword(
                            formProps as UserProps
                        );
                        if (!passwordUpdated) {
                            return;
                        }
                        await auth.logout();
                        const popUp = document.querySelector('.pop-up');
                        popUp?.remove();
                    }
                    2;
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
