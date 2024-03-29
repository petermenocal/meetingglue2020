import { newE2EPage } from '@stencil/core/testing';
describe('app-profile', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<app-profile></app-profile>');
        const element = await page.find('app-profile');
        expect(element).toHaveClass('hydrated');
    });
});
