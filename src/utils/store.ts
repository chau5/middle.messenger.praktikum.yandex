import { set } from './helpers';
import { EventBus } from './event-bus';

export enum StoreEvents {
    Updated = 'updated',
}

export class Store extends EventBus {
    #state: any = {};

    set(keypath: string, data: unknown) {
        set(this.#state, keypath, data);
        this.emit(StoreEvents.Updated);
    }

    /** @todo implement unset function */

    getState() {
        return this.#state;
    }
}

export default new Store();
