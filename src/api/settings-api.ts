import HTTP from '../utils/http';
import BaseAPI from './base-api';
import { UserProps } from '~/src/utils/prop-types';

const settingsAPIBase = new HTTP();

export class SettingsAPI extends BaseAPI {
    static basePath = `${BaseAPI.baseUrl}/user`;

    update(data: UserProps) {
        return settingsAPIBase.put(`${SettingsAPI.basePath}/profile/`, {
            data,
        });
    }
}
