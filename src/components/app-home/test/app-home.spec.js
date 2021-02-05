import { newSpecPage } from '@stencil/core/testing';
import { AppHome } from '../app-home';
describe('app-home', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [AppHome],
            html: `<app-home></app-home>`,
        });
        expect(page.root).not.toBeNull();
    });
});
