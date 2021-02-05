import { newSpecPage } from '@stencil/core/testing';
import { XhlHero } from '../xhl-hero';
describe('xhl-hero', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [XhlHero],
            html: `<xhl-hero></xhl-hero>`,
        });
        expect(page.root).not.toBeNull();
    });
});
