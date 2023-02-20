import Block from '~/src/utils/block';
import ButtonAvatar from './components/button-avatar';
import { FormProps } from '~/src/utils/prop-types';
import { SettingsController } from '~/src/controllers/settings-controller';

import template from './form-avatar.hbs';

export default class FormAvatar extends Block {
    constructor(props: FormProps) {
        const settings = new SettingsController();

        props.events = {
            async submit(e) {
                try {
                    e.preventDefault();
                    const formData = new FormData(this as HTMLFormElement);
                    await settings.updateAvatar(formData);
                } catch (error: any) {
                    alert(`Oops, something went wrong: ${error.message}`);
                    console.error(error.message);
                }
            },
        };

        super(props, 'form');

        if (!this.element) {
            return;
        }

        this.element.setAttribute('id', props.id);
        this.element.setAttribute('action', '#');
    }

    init() {
        this.children.buttonSubmit = new ButtonAvatar({
            title: 'Upload 🛰️',
            id: 'upload',
            css: ['d-none'],
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
