import buttonIcon from '~/src/components/button-icon';
import inputMessage from '../input-message';
import template from './footer.hbs';

export default (props = {}) =>
    template({
        props,
        inputMessage,
        buttonAttach: buttonIcon({
            title: 'Attach',
            id: 'attach',
            icon: 'attachment',
            styles: 'mr-1/5 bg-orange',
        }),
        buttonSend: buttonIcon({
            title: 'Send',
            id: 'send',
            icon: 'arrow',
            styles: 'ml-1/5 bg-pink',
        }),
    });
