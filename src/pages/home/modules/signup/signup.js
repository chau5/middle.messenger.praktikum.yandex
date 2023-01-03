import inputWLabel from '~/src/components/input-w-label';
import button from '~/src/components/button';
import template from './signup.hbs';
import './signup.css';

export default (
    props = {
        inputs: {
            login: inputWLabel({
                title: 'Login',
                id: 'login',
                type: 'text',
            }),
            password: inputWLabel({
                title: 'Password',
                id: 'password',
                type: 'password',
            }),
        },
        buttons: {
            signin: button({
                title: 'Sign In',
                id: 'signin',
                styles: 'mb-2',
            }),
            signup: button({
                title: 'Sign Up',
                id: 'signup',
                styles: 'bg-orange',
            }),
        },
    }
) => template(props);