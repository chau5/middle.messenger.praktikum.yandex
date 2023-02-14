import { SettingsAPI } from '../api/settings-api';
import { UserProps } from '~/src/utils/prop-types';
import store from '~/src/utils/store';

export class SettingsController {
    #api = new SettingsAPI();

    async update(data: UserProps) {
        try {
            const response = (await this.#api.update(data)) as XMLHttpRequest;
            /** @todo add common function */
            const responseText = JSON.parse(response.response);
            if (response.status !== 200) {
                const { reason } = responseText;
                console.warn(`Oops, something went wrong: ${reason}`);
                alert(`Oops, something went wrong: ${reason}`);
                return;
            }
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
}
