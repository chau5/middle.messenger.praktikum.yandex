import buttonIcon from '~/src/components/button-icon';
import template from './header.hbs';

export default (props = {}) =>
    template({
        props,
        buttonIcon: buttonIcon({
            title: 'Account',
            id: 'account',
            icon: 'hamburger',
            styles: 'bg-green',
        }),
    });
