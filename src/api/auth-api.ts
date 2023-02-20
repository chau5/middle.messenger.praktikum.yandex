import HTTP from '../utils/http';
import BaseAPI from './base-api';
import { UserSignInProps, UserSignUpProps } from '~/src/utils/prop-types';

const authAPIBase = new HTTP();

export class AuthAPI extends BaseAPI {
    static basePath = `${BaseAPI.baseUrl}/auth`;

    signup(data: UserSignUpProps) {
        return authAPIBase.post(`${AuthAPI.basePath}/signup/`, {
            data,
        });
    }

    signin(data: UserSignInProps) {
        return authAPIBase.post(`${AuthAPI.basePath}/signin/`, {
            data,
        });
    }

    request() {
        return authAPIBase.get(`${AuthAPI.basePath}/user/`);
    }

    logout() {
        return authAPIBase.post(`${AuthAPI.basePath}/logout/`);
    }
}
