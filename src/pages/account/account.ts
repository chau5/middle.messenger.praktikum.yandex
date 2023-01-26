import Block from '~/src/utils/block';
import FormAccount from './modules/form-account';
import Avatar from '~/src/components/avatar';
import imageAvatarLarge from '~/static/images/120.png';
import ButtonIcon from '~/src/components/button-icon';
import Button from '~/src/components/button';
import InputWLabel from '~/src/components/input-w-label';
import router from '~/src/index';
import validator from '~/src/utils/validator';
import template from './account.hbs';
import * as classes from './account.module.css';

export default class PageAccount extends Block {
    constructor() {
        super({}, 'div');

        this.element.classList.add('window', 'w-fixed', 'lg', 'account', 'bg-cyan');
    }

    init() {
        this.children.buttonBack = new ButtonIcon({
            title: 'Back to chats',
            id: 'chats',
            icon: 'back',
            styles: ['bg-orange'],
            link: 'chats',
            events: {
                click(e) {
                    e.preventDefault();
                    router.load('chats', true);
                },
            },
        });
        this.children.form = new FormAccount({
            id: 'account',
            events: {
                submit(e) {
                    e.preventDefault();
                    const isValid = validator(e);
                    if (isValid) {
                        const formData = new FormData(e.target);
                        const formProps = Object.fromEntries(formData);
                        console.log('submitting form');
                        console.log(formProps);
                    }
                },
                blur(e) {
                    validator(e);
                },
                focus(e) {
                    validator(e);
                },
            },
            displayName: 'Jack J',
            avatar: new Avatar({
                url: imageAvatarLarge,
                size: 'lg',
                styles: ['mb-2'],
            }),
            input_email: new InputWLabel({
                title: 'Email',
                id: 'email',
                type: 'email',
                value: 'user123@gmail.com',
            }),
            input_login: new InputWLabel({
                title: 'Login',
                id: 'login',
                type: 'text',
                value: 'user123',
            }),
            input_first_name: new InputWLabel({
                title: 'First Name',
                id: 'first_name',
                type: 'text',
                value: 'Jack',
            }),
            input_last_name: new InputWLabel({
                title: 'Last Name',
                id: 'second_name',
                type: 'text',
                value: 'Jackson',
            }),
            input_phone: new InputWLabel({
                title: 'Phone',
                id: 'phone',
                type: 'tel',
                value: '+84 123 123 123',
            }),
            input_display_name: new InputWLabel({
                title: 'Display Name',
                id: 'display_name',
                type: 'text',
                value: 'Jack J',
            }),
            button_update_details: new Button({
                title: 'Update details',
                id: 'update_details',
                styles: ['bg-green'],
            }),
            button_change_password: new Button({
                title: 'Change Password',
                id: 'change_password',
                styles: ['bg-pink'],
                action: 'change-password',
                events: {
                    click(e) {
                        e.preventDefault();
                        console.log('change password');
                    },
                },
            }),
            button_logout: new Button({
                title: 'Log Out',
                id: 'logout',
                styles: ['bg-cyan'],
                link: '/',
                events: {
                    click(e) {
                        e.preventDefault();
                        router.load('', true);
                    },
                },
            }),
        });
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {
            ...this.props,
            classes,
        });
    }
}
