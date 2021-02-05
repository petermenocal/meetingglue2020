import { newSpecPage } from '@stencil/core/testing';
import { AppForgotPassword } from '../app-forgot-password';
describe('app-forgot-password', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [AppForgotPassword],
            html: `<app-forgot-password></app-forgot-password>`,
        });
        expect(page.root).not.toBeNull();
    });
});
