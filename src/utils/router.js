export default class Router {
    constructor(routesData) {
        this.routesData = routesData;
    }

    #baseUrl = new URL(window.location.href).origin;

    init() {
        const path = this.getPath(window.location.href);
        this.load(path);

        // @todo remove later - reloadless test
        const menuLinks = document.querySelectorAll('#menu a');
        menuLinks.forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
                const path = this.getPath(e.target.href);
                this.load(path, true);
            });
        });

        // @todo add support for browser history changes
        // window.onpopstate = history.onpushstate = function (e) {
        //     console.log(e);
        // };
    }

    // Output respective template on page and optionally update path
    load(path, updatePath = false) {
        const template = this.getTemplate(path);
        const root = document.getElementById('root');
        root.innerHTML = template.data;
        this.updateBgColor(template);
        if (updatePath) {
            window.history.pushState({}, '', `${this.#baseUrl}/${path}`);
        }
    }

    // Get template data
    getTemplate(path = null) {
        let template = path;
        if (!template) {
            template = 'home';
        }
        return !this.routesData[template]
            ? { name: 404, data: this.routesData['404'] }
            : { name: template, data: this.routesData[template] };
    }

    // Little helper to get path from provided location.href
    getPath(href) {
        const url = new URL(href);
        return url.pathname.slice(1);
    }

    // Little helper to update body background
    updateBgColor(template) {
        console.log('update background');
        if (template.name === 'home') {
            // @todo
        }
    }
}
