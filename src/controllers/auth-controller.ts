import { AuthAPI } from '../api/auth-api';
import { ChatsController } from './chats-controller';
import { UserSignInProps, UserSignUpProps } from '~/src/utils/prop-types';
import store from '~/src/utils/store';
import router from '~/src/index';

export class AuthController {
    #api = new AuthAPI();

    async signup(data: UserSignUpProps) {
        try {
            const response = (await this.#api.signup(data)) as XMLHttpRequest;
            if (response.status !== 200) {
                const responseText = JSON.parse(response.response);
                const { reason } = responseText;
                console.warn(`Oops, something went wrong: ${reason}`);
                alert(`Oops, something went wrong: ${reason}`);
                return;
            }
            // set user data and redirect to /messenger
            await this.getUser();
            const chats = new ChatsController();
            await chats.request();
            router.load('messenger');
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async signin(data: UserSignInProps) {
        try {
            const loginResponse = (await this.#api.signin(data)) as XMLHttpRequest;
            if (loginResponse.status !== 200) {
                const responseText = JSON.parse(loginResponse.response);
                const { reason } = responseText;
                console.warn(`Oops, something went wrong: ${reason}`);
                alert(`Oops, something went wrong: ${reason}`);
                return;
            }
            // set user data and redirect to /messenger
            await this.getUser();
            const chats = new ChatsController();
            await chats.request();
            router.load('messenger');
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }

    async getUser() {
        try {
            const userResponse = (await this.#api.request()) as XMLHttpRequest;
            if (userResponse.status !== 200) {
                console.warn(
                    `Oops, something went wrong with fetching user\nAre you logged out?\nCode: ${userResponse.status}`
                );
                return false;
            }
            const user = JSON.parse(userResponse.response);
            if (!user) {
                return false;
            }
            store.set('user', user);
            return user;
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
            return false;
        }
    }

    async logout() {
        try {
            await this.#api.logout();
            store.set('user', null);
            router.load('');
        } catch (e: any) {
            alert(`Oops, something went wrong: ${e.message}`);
            console.error(e.message);
        }
    }
}
