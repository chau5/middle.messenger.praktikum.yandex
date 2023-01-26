import Block from '~/src/utils/block';
import ButtonIcon from '~/src/components/button-icon';
import InputMessage from '../../components/input-message';
import { FormProps } from '~/src/utils/prop-types';
import template from './form-message.hbs';

export default class FormMessage extends Block {
    constructor(props: FormProps) {
        super(props, 'form');

        if (!this.element) {
            return;
        }

        // add default classes
        this.element.classList.add('window', 'bg-green', 'py-2');

        this.element.setAttribute('id', props.id);
        this.element.setAttribute('action', '#');
    }

    init() {
        this.children.buttonAttach = new ButtonIcon({
            title: 'Attach',
            id: 'attach',
            icon: 'attachment',
            styles: ['mr-1/5', 'bg-orange'],
            events: {
                click(e) {
                    e.preventDefault();
                    console.log('attach something');
                },
            },
        });
        this.children.inputMessage = new InputMessage();
        this.children.buttonSend = new ButtonIcon({
            title: 'Send',
            id: 'send',
            icon: 'arrow',
            styles: ['ml-1/5', 'bg-pink'],
        });
    }

    render() {
        return this.compile(template, {});
    }
}
