import { newE2EPage } from '@stencil/core/testing';

describe('app-rfps', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-rfps></app-rfps>');

    const element = await page.find('app-rfps');
    expect(element).toHaveClass('hydrated');
  });
});
