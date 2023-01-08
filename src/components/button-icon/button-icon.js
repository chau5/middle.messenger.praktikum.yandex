import template from './button-icon.hbs';
import hamburger from '~/static/icons/hamburger.svg';
import attachment from '~/static/icons/attachment.svg';
import arrow from '~/static/icons/arrow.svg';
import back from '~/static/icons/back.svg';

const icons = {
    hamburger,
    attachment,
    arrow,
    back,
};

export default (props = {}) => template({ props, icon: icons[props.icon] });
