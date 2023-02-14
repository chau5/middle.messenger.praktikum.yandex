import { set } from './helpers';
import { EventBus } from './event-bus';

export enum StoreEvents {
    Updated = 'updated',
}

export class Store extends EventBus {
    #state: any = {};

    constructor() {
        super();
        this.on(StoreEvents.Updated, () => {
            console.log('updated store');
        });
    }

    set(keypath: string, data: unknown) {
        set(this.#state, keypath, data);

        console.log(this);

        this.emit(StoreEvents.Updated);
    }

    getState() {
        return this.#state;
    }
}

export default new Store();
