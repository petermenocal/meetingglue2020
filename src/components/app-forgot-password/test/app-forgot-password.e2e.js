import { newE2EPage } from '@stencil/core/testing';
describe('app-forgot-password', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<app-forgot-password></app-forgot-password>');
        const element = await page.find('app-forgot-password');
        expect(element).toHaveClass('hydrated');
    });
});
