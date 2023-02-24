import Block from '@utils/block';
import Button from '@components/button';
import Form from '@components/form';
import InputWLabel from '@components/input-w-label';
import router from '~/src/index';
import template from './sign-in.hbs';

export default class PageSignIn extends Block {
    constructor() {
        super({}, 'div');

        this.element.classList.add(
            'window',
            'lg',
            'p-2/5',
            'auth',
            'w-fixed',
            'signin',
            'bg-orange'
        );
    }

    init() {
        this.children.form = new Form({
            id: 'form-sign-in',
            inputs: [
                new InputWLabel({
                    title: 'Login',
                    id: 'login',
                    type: 'text',
                }),
                new InputWLabel({
                    title: 'Password',
                    id: 'password',
                    type: 'password',
                }),
            ],
            buttons: [
                new Button({
                    title: 'Sign In',
                    id: 'sign-in',
                    css: ['bg-green', 'mb-2'],
                }),
                new Button({
                    title: 'Sign Up',
                    id: 'sign-up',
                    css: ['bg-orange', 'mb-2'],
                    link: 'signup',
                    events: {
                        click(e) {
                            e.preventDefault();
                            router.load('sign-up');
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
