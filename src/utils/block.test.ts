/**
 * @jest-environment jsdom
 */
import Block from './block';

describe('Component', () => {
    const testBlock = new (class BlankPage extends Block {
        constructor() {
            super({}, 'div');
        }

        render() {
            const fragment = document.createDocumentFragment();
            const p = document.createElement('p');
            p.innerText = 'Test output';
            fragment.appendChild(p);
            return fragment;
        }
    })();

    test('should render fragment with correct contents', () => {
        const fragment = testBlock.render();
        const div = document.createElement('div');
        div.appendChild(fragment);
        expect(div.querySelector('p')?.innerText).toBe('Test output');
    });
});
