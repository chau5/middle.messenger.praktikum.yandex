import { TemplateDelegate } from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from './event-bus';

type PropsType = Record<string, any>;

export default abstract class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    #element!: HTMLElement;

    // Simple "element" getter to avoid private "element" access
    get element() {
        return this.#element;
    }

    #meta: PropsType = {};

    #id!: string;

    #eventBus: EventBus;

    props: PropsType;

    children: Record<string, any> = {};

    #events: Record<string, any> = {};

    #logging = false;

    constructor(propsAndChildren: PropsType, tagName = 'div') {
        // Create a new event bus
        const eventBus = new EventBus();

        const { children, props } = this.#getChildren(propsAndChildren);

        // Save children
        this.children = children;

        // Save provided tagName and props
        this.#meta = {
            tagName,
            props,
        };

        if (props?.settings?.withInternalID) {
            // Generate unique ID
            this.#id = makeUUID();
        }

        // Create proxy
        this.props = this.#makePropsProxy({ ...props, __id: this.#id });

        // Set link to the new event bus
        this.#eventBus = eventBus;

        // Register block events
        this.#registerEvents(eventBus);

        // Emit "init" event
        eventBus.emit(Block.EVENTS.INIT);
    }

    // Register required events
    #registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.#init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this.#render.bind(this));
    }

    // Create resources, currently a single element, see createDocumentElement()
    #createResources() {
        const { tagName } = this.#meta;
        // Save created element i.e. tagName to use inside getContent() later
        this.#element = this.#createDocumentElement(tagName);
    }

    // EVENT: "init" function
    #init() {
        if (this.#logging) {
            console.log('EVENT: INIT', this);
        }
        this.init();

        // Create resources, currently a single element, see createDocumentElement()
        this.#createResources();
        // Emit "render" event
        this.#eventBus.emit(Block.EVENTS.FLOW_RENDER, 'emit render');
    }

    init() {}

    // EVENT: "componentDidMount" function
    #componentDidMount() {
        if (this.#logging) {
            console.log('EVENT: CDM', this);
        }
        this.componentDidMount();

        Object.values(this.children).forEach(component => {
            if (Array.isArray(component)) {
                component.forEach(child => child.dispatchComponentDidMount());
            } else {
                component.dispatchComponentDidMount();
            }
        });
    }

    // Could be redeclared by user
    componentDidMount() {}

    // Dispatch i.e. emit "componentDidMount" event
    dispatchComponentDidMount() {
        this.#eventBus.emit(Block.EVENTS.FLOW_CDM, 'emit cdm');
    }

    // EVENT: "componentDidUpdate" function
    #componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
        if (this.#logging) {
            console.log('EVENT: CDU', this);
        }
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.#eventBus.emit(Block.EVENTS.FLOW_RENDER, 'emit render');
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
        if (this.#logging) {
            console.log('EVENT: RENDER', this);
        }

        if (!this.#element) {
            return;
        }

        const block = this.render();

        // Remove events
        this.#removeEvents();

        // Clear element contents
        this.#element.innerHTML = '';

        // Add element contents
        this.#element.append(block);

        // Add element attributes
        this.#addClasses();

        // Add events here
        this.#addEvents();
    }

    // Could be redeclared by user
    abstract render(): DocumentFragment;

    #removeEvents() {
        if (!(this.#events && Object.keys(this.#events).length)) {
            return;
        }
        Object.entries(this.#events).forEach(([eventName, event]) => {
            this.#element.removeEventListener(eventName, event, this.#meta.tagName === 'form');
        });
    }

    #addEvents() {
        const { events = {} } = this.props;
        // Check if component has a child element which is the actual one e.g. input inside div wrapper
        const { child } = this.props;

        Object.keys(events).forEach((eventName: string) => {
            this.#events[eventName] = events[eventName];
            if (this.#element.tagName) {
                let targetEl = this.#element;
                if (child) {
                    targetEl = this.#element.querySelector(child) as HTMLElement;
                }
                // Add useCapture() for form elements
                targetEl.addEventListener(
                    eventName,
                    events[eventName],
                    this.#meta.tagName === 'form'
                );
            }
        });
    }

    // Add CSS classes
    #addClasses() {
        const { css = [] } = this.props;

        if (!css) {
            return;
        }

        Object.entries(css).forEach(([_, cssClass]) => {
            this.element.classList.add(cssClass as string);
        });
    }

    // Helper to get element content for output
    getContent() {
        return this.element;
    }

    // Create proxy
    #makePropsProxy(props: PropsType) {
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

                // Update component
                // Bad cloneDeep, better to improve
                self.#eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
        });

        return proxyProps;
    }

    // Create a single element based on provided tagName
    #createDocumentElement(tagName: string): HTMLElement {
        // Possible to create a method which creates a few blocks in a loop using fragments
        const element = document.createElement(tagName);
        if (this.#id) {
            element.setAttribute('data-id', this.#id);
        }
        return element;
    }

    // Filter props and children
    #getChildren(propsAndChildren: PropsType) {
        const children: PropsType = {};
        const props: PropsType = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
                children[key] = value;
            } else if (value instanceof Block) {
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
            if (Array.isArray(component)) {
                propsAndStubs[key] = component.map(child => `<div data-id="${child.id}"></div>`);
            } else {
                propsAndStubs[key] = `<div data-id="${component.#id}"></div>`;
            }
        });

        const html = template(propsAndStubs);
        const fragment = document.createElement('template');
        fragment.innerHTML = html;

        const replaceStub = (component: Block) => {
            const stub = fragment.content.querySelector(`[data-id="${component.#id}"]`);
            if (!stub) {
                return;
            }
            stub.replaceWith(component.getContent());
        };

        Object.values(this.children).forEach((component: Block) => {
            if (Array.isArray(component)) {
                component.forEach(replaceStub);
            } else {
                replaceStub(component);
            }
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
