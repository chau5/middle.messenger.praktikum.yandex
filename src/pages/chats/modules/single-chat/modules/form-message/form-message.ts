import Block from '~/src/utils/block';
import ButtonIcon from '~/src/components/button-icon';
import InputMessage from './components/input-message';
import { FormProps } from '~/src/utils/prop-types';
import { validateForm } from '~/src/utils/validator';
import template from './form-message.hbs';

export default class FormMessage extends Block {
    constructor(props: FormProps) {
        props.events = {
            submit(e) {
                e.preventDefault();
                if (!validateForm(e.target)) {
                    return;
                }
                const formData = new FormData(e.target);
                const formProps = Object.fromEntries(formData);
                console.log('submitting form');
                console.log(formProps);
            },
        };

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
        this.children.inputMessage = new InputMessage({
            title: 'Your message goes here...',
            id: 'message',
            css: ['ml-1/5', 'bg-pink'],
            type: 'text',
        });
        this.children.buttonSend = new ButtonIcon({
            title: 'Send',
            id: 'send',
            icon: 'arrow',
            css: ['ml-1/5', 'bg-pink'],
        });
    }

    render() {
        return this.compile(template, {});
    }
}
