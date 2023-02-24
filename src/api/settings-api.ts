import HTTP from '../utils/http';
import BaseAPI from './base-api';
import { UserProps } from '@utils/prop-types';

const settingsAPIBase = new HTTP();

export class SettingsAPI extends BaseAPI {
    static basePath = `${BaseAPI.baseUrl}/user`;

    update(data: UserProps) {
        return settingsAPIBase.put(`${SettingsAPI.basePath}/profile/`, {
            data,
        });
    }

    updateAvatar(formData: FormData) {
        return settingsAPIBase.put(`${SettingsAPI.basePath}/profile/avatar`, {
            data: formData,
            type: 'form',
        });
    }

    updatePassword(data: Record<string, any>) {
        return settingsAPIBase.put(`${SettingsAPI.basePath}/password`, {
            data,
        });
    }
}
