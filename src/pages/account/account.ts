import Block from '~/src/utils/block';
import FormAccount from './modules/form-account';
import Avatar from '~/src/components/avatar';
import imageAvatarLarge from '~/static/images/120.png';
import ButtonIcon from '~/src/components/button-icon';
import Button from '~/src/components/button';
import InputWLabel from '~/src/components/input-w-label';
import template from './account.hbs';
import * as classes from './account.module.css';

export default class PageAccount extends Block {
    constructor() {
        super({}, 'div');

        this.element.classList.add('window', 'w-fixed', 'lg', 'account', 'bg-cyan');
    }

    init() {
        this.children.form = new FormAccount({
            id: 'account',
            events: {
                submit(e) {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const formProps = Object.fromEntries(formData);
                    console.log(formProps);
                },
            },
            buttonBack: new ButtonIcon({
                title: 'Back to chats',
                id: 'chats',
                icon: 'back',
                styles: ['bg-orange'],
            }),
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
            }),
            button_update_details: new Button({
                title: 'Update details',
                id: 'update_details',
                styles: ['bg-green'],
                action: 'update',
            }),
            button_change_password: new Button({
                title: 'Change Password',
                id: 'change_password',
                styles: ['bg-pink'],
                action: 'change-password',
            }),
            button_logout: new Button({
                title: 'Log Out',
                id: 'logout',
                styles: ['bg-cyan'],
                link: '/',
            }),
        });
        // inputs: {
        //     email: inputWLabel({
        //         title: 'Email',
        //         id: 'email',
        //         type: 'email',
        //         value: 'user123@gmail.com',
        //         disabled: true,
        //     }),
        //     login: inputWLabel({
        //         title: 'Login',
        //         id: 'login',
        //         type: 'text',
        //         value: 'user123',
        //         disabled: true,
        //     }),
        //     firstName: inputWLabel({
        //         title: 'First Name',
        //         id: 'first_name',
        //         type: 'text',
        //         value: 'Jack',
        //         disabled: true,
        //     }),
        //     lastName: inputWLabel({
        //         title: 'Last Name',
        //         id: 'second_name',
        //         type: 'text',
        //         value: 'Jackson',
        //         disabled: true,
        //     }),
        //     phone: inputWLabel({
        //         title: 'Phone',
        //         id: 'phone',
        //         type: 'tel',
        //         value: '+84 123 123 123',
        //         disabled: true,
        //     }),
        //     displayName: inputWLabel({
        //         title: 'Display Name',
        //         id: 'display_name',
        //         type: 'text',
        //         value: 'Jack J',
        //         disabled: true,
        //     }),
        // },
        // buttons: {

        // },
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {
            ...this.props,
            classes,
        });
    }
}
