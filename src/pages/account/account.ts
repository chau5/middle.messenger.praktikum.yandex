import Block from '~/src/utils/block';
import Form from '~/src/components/form';
import Avatar from '~/src/components/avatar';
import ButtonIcon from '~/src/components/button-icon';
import Button from '~/src/components/button';
import InputWLabel from '~/src/components/input-w-label';
import router from '~/src/index';
import validator from '~/src/utils/validator';
import { AuthController } from '~/src/controllers/auth-controller';
import store, { StoreEvents } from '~src/utils/store';
import template from './account.hbs';
import * as classes from './account.module.css';

export default class PageAccount extends Block {
    constructor() {
        super({}, 'div');

        this.element.classList.add('window', 'w-fixed', 'lg', 'account', 'bg-cyan');

        store.on(StoreEvents.Updated, () => {
            const displayName = store.getState()?.user?.display_name;
            this.setProps({ displayName });
        });
    }

    init() {
        this.children.buttonBack = new ButtonIcon({
            title: 'Back to chats',
            id: 'messenger',
            icon: 'back',
            css: ['bg-orange'],
            link: 'messenger',
            events: {
                click(e) {
                    e.preventDefault();
                    router.load('messenger');
                },
            },
        });
        // Add element placeholder to update later with componentDidUpdate()
        this.children.avatar = new Avatar({
            url: '',
            size: 'lg',
            css: ['mb-2'],
        });
        // Add element placeholder to update later with componentDidUpdate()
        this.children.form = new Form({
            id: 'account',
            events: {},
            inputs: [],
            buttons: [],
        });
    }

    componentDidUpdate(): boolean {
        const auth = new AuthController();
        const state = store?.getState();
        this.children.form = new Form({
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
            inputs: [
                new InputWLabel({
                    title: 'Email',
                    id: 'email',
                    type: 'email',
                    value: state?.user?.email,
                    settings: {
                        disabled: true,
                    },
                }),
                new InputWLabel({
                    title: 'Login',
                    id: 'login',
                    type: 'text',
                    value: state?.user?.login,
                    settings: {
                        disabled: true,
                    },
                }),
                new InputWLabel({
                    title: 'First Name',
                    id: 'first_name',
                    type: 'text',
                    value: state?.user?.first_name,
                    settings: {
                        disabled: true,
                    },
                }),
                new InputWLabel({
                    title: 'Last Name',
                    id: 'second_name',
                    type: 'text',
                    value: state?.user?.second_name,
                    settings: {
                        disabled: true,
                    },
                }),
                new InputWLabel({
                    title: 'Phone',
                    id: 'phone',
                    type: 'tel',
                    value: state?.user?.phone,
                    settings: {
                        disabled: true,
                    },
                }),
                new InputWLabel({
                    title: 'Display Name',
                    id: 'display_name',
                    type: 'text',
                    value: state?.user?.display_name,
                    settings: {
                        disabled: true,
                    },
                }),
            ],
            buttons: [
                new Button({
                    title: 'Update details',
                    id: 'update_details',
                    action: 'update-details',
                    css: ['bg-green', 'mb-2'],
                    events: {
                        click(e) {
                            e.preventDefault();
                            const form = this.closest('form');
                            const inputs = form.querySelectorAll('input');
                            inputs.forEach((el: HTMLInputElement) => {
                                el.removeAttribute('disabled');
                            });
                            e.currentTarget.classList.add('d-none');
                            form.querySelector('#update_details_2')?.classList.remove('d-none');
                            form.querySelector('#cancel')?.classList.remove('d-none');

                            form.querySelector('#change_password')?.classList.add('d-none');
                            form.querySelector('#logout')?.classList.add('d-none');
                        },
                    },
                }),
                new Button({
                    title: 'Confirm the update',
                    id: 'update_details_2',
                    css: ['bg-green', 'mb-2', 'd-none'],
                }),
                new Button({
                    title: 'Cancel',
                    id: 'cancel',
                    action: 'cancel-update',
                    css: ['bg-pink', 'mb-2', 'd-none'],
                    events: {
                        click(e) {
                            e.preventDefault();
                            const form = this.closest('form');
                            const inputs = form.querySelectorAll('input');
                            inputs.forEach((el: HTMLInputElement) => {
                                el.setAttribute('disabled', 'disabled');
                            });
                            e.currentTarget.classList.add('d-none');
                            form.querySelector('#cancel')?.classList.add('d-none');
                            form.querySelector('#update_details_2')?.classList.add('d-none');

                            form.querySelector('#update_details')?.classList.remove('d-none');
                            form.querySelector('#change_password')?.classList.remove('d-none');
                            form.querySelector('#logout')?.classList.remove('d-none');
                        },
                    },
                }),
                new Button({
                    title: 'Change Password',
                    id: 'change_password',
                    css: ['bg-pink', 'mb-2'],
                    action: 'change-password',
                    events: {
                        click(e) {
                            e.preventDefault();
                            console.log('change password');
                        },
                    },
                }),
                new Button({
                    title: 'Log Out',
                    id: 'logout',
                    css: ['bg-cyan', 'mb-2'],
                    link: '/',
                    events: {
                        async click(e) {
                            e.preventDefault();
                            await auth.logout();
                        },
                    },
                }),
            ],
        });

        return true;
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {
            ...this.props,
            classes,
        });
    }
}
