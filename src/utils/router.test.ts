/**
 * @jest-environment jsdom
 */
import Router from './router';
import BlankPage from '@pages/blank';

describe('Router', () => {
    test('should return router instance', () => {
        const routerTest = new Router({ blank: new BlankPage() });
        expect(routerTest).toBeInstanceOf(Router);
    });

    test('should return correct window history length', () => {
        const routerTest = new Router({ blank: new BlankPage() });
        routerTest.init();
        routerTest.load('blank');
        routerTest.load('something');
        routerTest.load('blank');
        expect(window.history.length).toEqual(4);
    });
});
