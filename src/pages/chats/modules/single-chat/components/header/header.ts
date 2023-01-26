import Block from '~/src/utils/block';
import ButtonIcon from '~/src/components/button-icon';
import { HeaderProps } from '~/src/utils/prop-types';
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
            title: 'Account',
            id: 'account',
            icon: 'hamburger',
            styles: ['bg-green'],
            events: {
                click(e) {
                    e.preventDefault();
                    console.log('chat actions');
                },
            },
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
