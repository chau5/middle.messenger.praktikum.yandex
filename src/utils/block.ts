import { TemplateDelegate } from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from './event-bus';

type PropsType = Record<string, any>;

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    #element!: HTMLElement;

    // Simple "element" getter to avoid private "element" access
    get element() {
        return this.#element;
    }

    private meta: PropsType = {};

    private id!: string;

    #eventBus: () => EventBus;

    props: PropsType;

    children: Record<string, any> = {};

    private logging = false;

    constructor(propsAndChildren: PropsType, tagName = 'div') {
        // Create a new event bus
        const eventBus = new EventBus();

        const { children, props } = this.getChildren(propsAndChildren);

        // Save children
        this.children = children;

        // Save provided tagName and props
        this.meta = {
            tagName,
            props,
        };

        if (props?.settings?.withInternalID) {
            // Generate unique ID
            this.id = makeUUID();
        }

        // Create proxy
        this.props = this.makePropsProxy({ ...props, __id: this.id });

        // Set link to the new event bus
        this.#eventBus = () => eventBus;

        // Register block events
        this.registerEvents(eventBus);

        // Emit "init" event
        eventBus.emit(Block.EVENTS.INIT);
    }

    // Register required events
    private registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.#init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this.#render.bind(this));
    }

    // Create resources, currently a single element, see createDocumentElement()
    private createResources() {
        const { tagName } = this.meta;
        // Save created element i.e. tagName to use inside getContent() later
        this.#element = this.createDocumentElement(tagName);
    }

    // EVENT: "init" function
    #init() {
        if (this.logging) {
            console.log('EVENT: INIT', this);
        }
        this.init();

        // Create resources, currently a single element, see createDocumentElement()
        this.createResources();
        // Emit "render" event
        this.#eventBus().emit(Block.EVENTS.FLOW_RENDER, 'emit render');
    }

    init() {}

    // EVENT: "componentDidMount" function
    #componentDidMount() {
        if (this.logging) {
            console.log('EVENT: CDM', this);
        }
        this.componentDidMount();

        Object.values(this.children).forEach(component => {
            component.dispatchComponentDidMount();
        });
    }

    // Could be redeclared by user
    componentDidMount() {}

    // Dispatch i.e. emit "componentDidMount" event
    dispatchComponentDidMount() {
        this.#eventBus().emit(Block.EVENTS.FLOW_CDM, 'emit cdm');
    }

    // EVENT: "componentDidUpdate" function
    #componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
        if (this.logging) {
            console.log('EVENT: CDU', this);
        }
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.#eventBus().emit(Block.EVENTS.FLOW_RENDER, 'emit render');
        }
    }

    // Could be redeclared by user
    componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
        return JSON.stringify(oldProps) === JSON.stringify(newProps);
    }

    // Set block props
    setProps = (nextProps: PropsType) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    // EVENT: "render" function
    // Heads up - renders not the entire element i.e. not the tagName
    // Could be overriden externally with render()
    #render() {
        if (this.logging) {
            console.log('EVENT: RENDER', this);
        }

        if (!this.#element) {
            return;
        }

        const block = this.render();

        // Remove events
        this.removeEvents();

        // Clear element contents
        this.#element.innerHTML = '';

        // Add element contents
        this.#element.append(block);

        // Add events here
        this.addEvents();
    }

    // Could be redeclared by user
    render(): DocumentFragment {
        return new DocumentFragment();
    }

    private removeEvents() {}

    private addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName: string) => {
            if (this.#element) {
                this.#element.addEventListener(eventName, events[eventName]);
            }
        });
    }

    // Helper to get element content for output
    getContent() {
        return this.element;
    }

    // Create proxy
    private makePropsProxy(props: PropsType) {
        // @todo Need to replace with a proper ES6 way
        const self = this;

        // @todo avoid re-assignment
        const proxyProps = new Proxy(props, {
            get(target: PropsType, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },

            // Prevent props removal
            deleteProperty() {
                throw new Error('Access error');
            },

            set(target: PropsType, prop: string, value: string | number) {
                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.#eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
        });

        return proxyProps;
    }

    // Create a single element based on provided tagName
    private createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element = document.createElement(tagName);
        if (this.id) {
            element.setAttribute('data-id', this.id);
        }
        return element;
    }

    // Filter props and children
    private getChildren(propsAndChildren: PropsType) {
        const children: PropsType = {};
        const props: PropsType = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    // Return compiled template
    compile(template: TemplateDelegate, context: PropsType) {
        const propsAndStubs = { ...context };

        Object.entries(this.children).forEach(([key, component]: [string, Block | any]) => {
            propsAndStubs[key] = `<div data-id="${component.id}"></div>`;
        });

        const html = template(propsAndStubs);
        const fragment = document.createElement('template');
        fragment.innerHTML = html;

        Object.values(this.children).forEach((component: Block) => {
            const stub = fragment.content.querySelector(`[data-id="${component.id}"]`);
            if (!stub) {
                return;
            }
            stub.replaceWith(component.getContent());
        });

        return fragment.content;
    }

    // Show block with simple CSS
    show() {
        if (!this.#element) {
            return;
        }
        this.#element.style.display = 'block';
        console.log('show internal');
    }

    // Hide block with simple CSS
    hide() {
        if (!this.#element) {
            return;
        }
        this.#element.style.display = 'none';
        console.log('hide internal');
    }
}
