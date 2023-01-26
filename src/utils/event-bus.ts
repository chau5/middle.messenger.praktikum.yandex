export type CallbackType = (...args: any) => any;
type ListenersType = Record<string, CallbackType[]>;

export class EventBus {
    listeners: ListenersType;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: CallbackType) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: CallbackType) {
        if (!this.listeners[event]) {
            throw new Error(`There is no event: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }

    emit(event: string, ...args: any) {
        if (!this.listeners[event]) {
            throw new Event(`There is no event: ${event}`);
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}
