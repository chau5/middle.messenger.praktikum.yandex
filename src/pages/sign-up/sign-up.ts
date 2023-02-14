import Block from '~/src/utils/block';
import Button from '~/src/components/button';
import Form from '~/src/components/form';
import InputWLabel from '~/src/components/input-w-label';
import router from '~/src/index';
import template from './sign-up.hbs';

export default class PageSignUp extends Block {
    constructor() {
        super({}, 'div');

        this.element.classList.add('window', 'lg', 'p-2/5', 'auth', 'w-fixed', 'signup', 'bg-pink');
    }

    init() {
        this.children.form = new Form({
            id: 'form-sign-up',
            inputs: [
                new InputWLabel({
                    title: 'Email',
                    id: 'email',
                    type: 'email',
                }),
                new InputWLabel({
                    title: 'Login',
                    id: 'login',
                    type: 'text',
                }),
                new InputWLabel({
                    title: 'First Name',
                    id: 'first_name',
                    type: 'text',
                }),
                new InputWLabel({
                    title: 'Last Name',
                    id: 'second_name',
                    type: 'text',
                }),
                new InputWLabel({
                    title: 'Phone',
                    id: 'phone',
                    type: 'tel',
                }),
                new InputWLabel({
                    title: 'Password',
                    id: 'password',
                    type: 'password',
                }),
                new InputWLabel({
                    title: 'Confirm password',
                    id: 'password_2',
                    type: 'password',
                }),
            ],
            buttons: [
                new Button({
                    title: 'Sign Up',
                    css: ['bg-orange', 'mb-2'],
                    id: 'sign-up',
                }),
                new Button({
                    title: 'Sign In',
                    css: ['bg-green', 'mb-2'],
                    id: 'sign-in',
                    link: '',
                    events: {
                        async click(e) {
                            e.preventDefault();
                            router.load('');
                        },
                    },
                }),
            ],
        });
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {
            ...this.props,
        });
    }
}
