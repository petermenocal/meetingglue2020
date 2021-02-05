import { newE2EPage } from '@stencil/core/testing';

describe('app-rfp-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-rfp-detail></app-rfp-detail>');

    const element = await page.find('app-rfp-detail');
    expect(element).toHaveClass('hydrated');
  });
});
