import Block from '~/src/utils/block';
import { AvatarProps } from '~/src/utils/prop-types';
import template from './avatar.hbs';

export default class Avatar extends Block {
    #windowSizes: Record<string, string> = {
        sm: 'sm',
        md: 'sm',
        lg: 'md',
    };

    constructor(props: AvatarProps) {
        super(props, 'div');

        if (!this.element) {
            return;
        }

        // add default classes
        this.element.classList.add(
            'window',
            'avatar',
            `avatar-${props.size}`,
            'p-0',
            'shrink-0',
            props.size ? this.#windowSizes[props.size] : 'sm'
        );

        // check for provided styles and add if any
        if (props.styles) {
            props.styles.forEach(style => {
                if (this.element) {
                    this.element.classList.add(style);
                }
            });
        }
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
