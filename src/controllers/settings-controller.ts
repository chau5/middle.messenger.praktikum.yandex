import { SettingsAPI } from '../api/settings-api';
import { UserProps } from '@utils/prop-types';
import { processResponse } from '@utils/helpers';
import store from '@utils/store';

export class SettingsController {
    #api = new SettingsAPI();

    async update(data: UserProps) {
        try {
            const response = (await this.#api.update(data)) as XMLHttpRequest;
            const responseText = processResponse(response);
            /** @todo refactor to centralized update */
            store.set('user', responseText);
            const form = document.querySelector('#account');
            if (!form) {
                return;
            }
            const inputs = form.querySelectorAll('input');
            inputs.forEach((el: HTMLInputElement) => {
                el.setAttribute('disabled', 'disabled');
            });

            form.querySelector('#cancel')?.classList.add('d-none');
            form.querySelector('#update_details_2')?.classList.add('d-none');

            form.querySelector('#update_details')?.classList.remove('d-none');
            form.querySelector('#change_password')?.classList.remove('d-none');
            form.querySelector('#logout')?.classList.remove('d-none');
            /** @todo refactor to use one func for account page as well */
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }

    async updatePassword(data: Record<string, any>) {
        try {
            const response = (await this.#api.updatePassword({
                oldPassword: data?.password_0,
                newPassword: data.password,
            })) as XMLHttpRequest;
            if (response.status !== 200) {
                console.warn(`Oops, something went wrong`);
                alert(`Oops, something went wrong`);
                return false;
            }
            return true;
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
            return false;
        }
    }

    async updateAvatar(formData: FormData) {
        try {
            const response = (await this.#api.updateAvatar(formData)) as XMLHttpRequest;
            const responseText = processResponse(response);
            /** @todo refactor to centralized update */
            store.set('user', responseText);
            // reset the form
            document.querySelector('.avatar-form-wrap')?.classList.add('d-none');
            document.querySelector('.avatar-form-wrap')?.classList.add('d-none');
            document.querySelector('#form_update_avatar')?.classList.remove('d-none');
            document.querySelector('#cancel_avatar_update')?.classList.add('d-none');
            document.querySelector('#upload')?.classList.add('d-none');
            const avatarInput = document.querySelector('#avatar') as HTMLInputElement;
            if (avatarInput) {
                avatarInput.value = '';
            }
            document.querySelector('#update_avatar')?.classList.remove('d-none');
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }
}
