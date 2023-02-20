const getValidationMessage = (message: string) => {
    const validationMessage = document.createElement('div');
    validationMessage.classList.add('validation-message');
    validationMessage.textContent = message;
    return validationMessage;
};

const validateInput = (target: HTMLInputElement) => {
    const inputWrap = target.parentElement;

    let pattern;
    let message = 'Oops, something is wrong';

    // remove validation output if exists and if it's not message field

    if (inputWrap && target.name !== 'message') {
        const validationMessageEl = inputWrap.nextSibling;
        if (validationMessageEl) {
            validationMessageEl.remove();
        }
    }

    if (
        target.name === 'first_name' ||
        target.name === 'second_name' ||
        target.name === 'display_name'
    ) {
        pattern = /^([A-Z]){1}([A-Za-z-])+$/;
    }

    if (target.name === 'login') {
        pattern = /^(?=.*[A-Za-z])([A-Za-z0-9-_]{3,20})$/;
    }

    if (target.name === 'chat_name') {
        pattern = /^([A-Za-z0-9-_\s]{3,20})$/;
    }

    if (target.name === 'email') {
        pattern = /^[A-Za-z0-9-_]+@[0-9_-]*[A-Za-z]+[0-9_-]*[A-Za-z0-9-_]*\.[A-Za-z-_0-9]+$/;
    }

    if (
        target.name === 'password' ||
        target.name === 'password_2' ||
        target.name === 'password_0'
    ) {
        pattern = /^(?=.*[0-9])(?=.*[A-Z])([.\S]{8,40})$/;
    }

    if (target.name === 'phone') {
        pattern = /^(\+)?(\d){10,15}$/;
    }

    if (target.name === 'message') {
        pattern = /^.+$/;
    }

    /** @todo add better validation messages */
    message = `Oops, something is wrong with the ${
        target.name.includes('password') ? 'password' : target.name.replace('_', ' ')
    } value`;

    if (typeof target.value === 'string' && (!pattern || pattern.test(target.value))) {
        inputWrap?.classList.remove('error');
        return true;
    }

    const validationMessage = getValidationMessage(message);

    inputWrap?.classList.add('error');

    // Don't add validation output for message field
    if (target.name !== 'message') {
        inputWrap?.after(validationMessage);
    }

    return false;
};

const validateForm = (target: HTMLFormElement) => {
    const inputs = target.querySelectorAll('input');
    let isValid = true;

    inputs.forEach((input: HTMLInputElement) => {
        if (!validateInput(input) && isValid === true) {
            isValid = false;
        }
    });

    return isValid;
};

// validate passsword values
// don't check old password since we don't store it anywhere and API doesn't return one
export const validatePassword = (target: HTMLFormElement) => {
    // compare two password values
    const password = target.querySelector('input[name="password"]') as HTMLInputElement;
    const password2 = target.querySelector('input[name="password_2"]') as HTMLInputElement;
    if (!password || !password2) {
        return false;
    }
    if (password.value !== password2.value) {
        return false;
    }
    return true;
};

export default validateInput;
export { validateForm };
