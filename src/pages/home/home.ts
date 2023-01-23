import Block from '~/src/utils/block';
import Button from '~/src/components/button';
import FormSignIn from './modules/form-sign-in';
import FormSignUp from './modules/form-sign-up';
import InputWLabel from '~/src/components/input-w-label';
import { router } from '~/src/index';
import template from './home.hbs';
import './home.css';

type PageHomeProps = {
    title?: string;
    type: string;
};

export default class PageHome extends Block {
    constructor(props: PageHomeProps) {
        super(props, 'div');

        this.element.classList.add('window', 'lg', 'p-2/5', 'auth', 'w-fixed');

        if (this.props.type === 'signIn') {
            this.props.title = 'Sign In';
            this.element.classList.add('signin', 'bg-orange');
        } else if (this.props.type === 'signUp') {
            this.props.title = 'Sign Up';
            this.element.classList.add('signup', 'bg-pink');
        }
    }

    init() {
        this.children.button = new Button({
            title: 'New button',
            link: '123',
            id: 'update_details',
            styles: ['bg-green'],
            events: {
                click(event) {
                    console.log(event);
                },
            },
            settings: { withInternalID: true },
        });

        if (this.props.type === 'signIn') {
            this.children.form = new FormSignIn({
                id: 'sign-in',
                input_login: new InputWLabel({
                    title: 'Login',
                    id: 'login',
                    type: 'text',
                    inputName: 'login',
                }),
                input_password: new InputWLabel({
                    title: 'Password',
                    id: 'password',
                    type: 'password',
                    inputName: 'password',
                }),
                button_sign_in: new Button({
                    title: 'Sign In',
                    id: 'sign_in',
                    styles: ['bg-green'],
                    settings: { withInternalID: true },
                }),
                button_sign_up: new Button({
                    title: 'Sign Up',
                    id: 'sign_up',
                    styles: ['bg-orange'],
                    settings: { withInternalID: true },
                    link: 'signup',
                    events: {
                        click(e) {
                            e.preventDefault();
                            router.load('#signup', true);
                        },
                    },
                }),
                events: {
                    submit(e) {
                        e.preventDefault();
                        console.log('form submit');
                    },
                },
            });
        } else if (this.props.type === 'signUp') {
            this.children.form = new FormSignUp({
                id: 'sign-in',
                input_login: new InputWLabel({
                    title: 'Login',
                    id: 'login',
                    type: 'text',
                    inputName: 'login',
                }),
                input_password: new InputWLabel({
                    title: 'Password',
                    id: 'password',
                    type: 'password',
                    inputName: 'password',
                }),
                button_sign_in: new Button({
                    title: 'Sign In',
                    id: 'sign_in',
                    styles: ['bg-green'],
                    settings: { withInternalID: true },
                    events: {
                        click(e) {
                            e.preventDefault();
                            router.load('', true);
                        },
                    },
                }),
                button_sign_up: new Button({
                    title: 'Sign Up',
                    id: 'sign_up',
                    styles: ['bg-orange'],
                    settings: { withInternalID: true },
                    link: 'sign-up',
                }),
            });
        }

        setTimeout(() => {
            // Update button title
            this.children.button.setProps({ title: 'Updated text on button' });
        }, 3000);
    }

    componentDidUpdate(oldProps: { title: string }, newProps: { title: string }) {
        if (oldProps.title !== newProps.title) {
            this.children.button.setProps({ title: newProps.title });
        }

        return true;
    }

    render() {
        this.dispatchComponentDidMount();

        return this.compile(template, {
            title: this.props.title,
        });
    }
}
