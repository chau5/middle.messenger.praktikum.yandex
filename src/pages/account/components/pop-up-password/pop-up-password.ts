import Block from '@utils/block';
import Form from '@components/form';
import ButtonIcon from '@components/button-icon';
import Button from '@components/button';
import InputWLabel from '@components/input-w-label';
import template from './pop-up-password.hbs';

export default class PopUpPassword extends Block {
    constructor() {
        super({}, 'div');
    }

    init() {
        this.children.buttonBack = new ButtonIcon({
            title: 'Close',
            id: 'close',
            icon: 'close',
            css: ['bg-orange'],
            action: 'close',
            events: {
                click(e) {
                    e.preventDefault();
                    // close pop-up
                    const popUpWrap = document.querySelector('.pop-up');
                    if (popUpWrap) {
                        popUpWrap.remove();
                    }
                },
            },
        });
        this.children.form = new Form({
            id: 'form-password',
            inputs: [
                new InputWLabel({
                    title: 'Current password',
                    id: 'password_0',
                    type: 'password',
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
                    title: 'Update password',
                    id: 'update-password',
                    css: ['bg-green', 'mb-2'],
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
