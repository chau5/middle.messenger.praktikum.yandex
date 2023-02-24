import Block from '~/src/utils/block';

export default class BlankPage extends Block {
    constructor() {
        super({}, 'div');
    }

    render() {
        const fragment = document.createDocumentFragment();
        const p = document.createElement('p');
        p.textContent = 'Test output';
        fragment.appendChild(p);
        return fragment;
    }
}
