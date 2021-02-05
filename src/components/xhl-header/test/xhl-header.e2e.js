import { newE2EPage } from '@stencil/core/testing';
describe('xhl-header', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<xhl-header></xhl-header>');
        const element = await page.find('xhl-header');
        expect(element).toHaveClass('hydrated');
    });
});
