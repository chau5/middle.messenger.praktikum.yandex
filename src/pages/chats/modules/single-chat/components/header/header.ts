import Block from '@utils/block';
import ButtonIcon from '@components/button-icon';
import PopUpChatActions from '../pop-up-chat-actions';
import { HeaderProps } from '@utils/prop-types';
import { appendPopUp } from '@utils/helpers';
import template from './header.hbs';

export default class Header extends Block {
    constructor(props: HeaderProps) {
        super(props, 'header');

        if (!this.element) {
            return;
        }

        // add default classes
        this.element.classList.add('window', 'bg-purple-light', 'mb-3');
    }

    init() {
        this.children.buttonIcon = new ButtonIcon({
            title: 'Actions',
            id: 'settings',
            icon: 'hamburger',
            css: ['bg-green'],
            events: {
                click(e) {
                    e.preventDefault();
                    appendPopUp(new PopUpChatActions());
                },
            },
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
