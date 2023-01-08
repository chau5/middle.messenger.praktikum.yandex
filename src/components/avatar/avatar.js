import template from './avatar.hbs';

const windowSizes = {
    sm: 'sm',
    md: 'sm',
    lg: 'md',
};

export default (props = {}) => template({ props, windowSize: windowSizes[props.size] });
