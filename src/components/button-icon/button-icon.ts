import Block from '~/src/utils/block';
import { ButtonIconProps, IconProps } from '~/src/utils/prop-types';
import hamburger from '~/static/icons/hamburger.svg';
import attachment from '~/static/icons/attachment.svg';
import arrow from '~/static/icons/arrow.svg';
import back from '~/static/icons/back.svg';
import star from '~/static/icons/star.svg';
import close from '~/static/icons/close.svg';
import template from './button-icon.hbs';

export default class ButtonIcon extends Block {
    #icons: IconProps = {
        hamburger,
        attachment,
        arrow,
        back,
        star,
        close,
    };

    constructor(props: ButtonIconProps) {
        super(props, 'button');

        if (!this.element) {
            return;
        }

        // add default classes
        this.element.classList.add(
            'button',
            'button-icon',
            'window',
            'sm',
            'p-0/5',
            'pad',
            'd-flex',
            'align-items-center',
            'text-center',
            'shrink-0',
            'z-2'
        );

        this.element.setAttribute('id', props.id);
        this.element.setAttribute('title', props.title);

        // add optional link class
        if (props.link) {
            this.element.classList.add('link');
            this.element.dataset.path = props.link;
        }

        // keep button as type="button" to avoid form submission
        if (props.link || props.action) {
            this.element.setAttribute('type', 'button');
        } else {
            this.element.setAttribute('type', 'submit');
        }

        this.props.icon_url = this.#icons[props.icon];
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
