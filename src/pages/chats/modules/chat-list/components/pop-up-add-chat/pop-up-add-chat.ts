import Block from '@utils/block';
import Form from '@components/form';
import ButtonIcon from '@components/button-icon';
import Button from '@components/button';
import InputWLabel from '@components/input-w-label';
import template from './pop-up-add-chat.hbs';

export default class PopUpAddChat extends Block {
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
            id: 'form-add-chat',
            inputs: [
                new InputWLabel({
                    title: 'Chat name',
                    id: 'chat_name',
                    type: 'text',
                }),
            ],
            buttons: [
                new Button({
                    title: 'Add chat',
                    id: 'add-chat',
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
