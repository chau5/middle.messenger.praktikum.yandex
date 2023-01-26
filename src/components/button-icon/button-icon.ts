import Block from '~/src/utils/block';
import { ButtonIconProps, IconProps } from '~/src/utils/prop-types';
import hamburger from '~/static/icons/hamburger.svg';
import attachment from '~/static/icons/attachment.svg';
import arrow from '~/static/icons/arrow.svg';
import back from '~/static/icons/back.svg';
import template from './button-icon.hbs';

export default class ButtonIcon extends Block {
    #icons: IconProps = {
        hamburger,
        attachment,
        arrow,
        back,
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
            'shrink-0'
        );

        this.element.setAttribute('id', props.id);
        this.element.setAttribute('title', props.title);

        // check for provided styles and add if any
        if (props.styles) {
            props.styles.forEach(style => {
                if (this.element) {
                    this.element.classList.add(style);
                }
            });
        }

        // add optional link class
        if (props.link) {
            this.element.classList.add('link');
            this.element.dataset.path = props.link;
            this.element.setAttribute('type', 'button');
        }

        this.props.icon_url = this.#icons[props.icon];
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
