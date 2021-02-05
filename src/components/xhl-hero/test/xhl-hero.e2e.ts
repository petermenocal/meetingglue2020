import { newE2EPage } from '@stencil/core/testing';

describe('xhl-hero', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xhl-hero></xhl-hero>');

    const element = await page.find('xhl-hero');
    expect(element).toHaveClass('hydrated');
  });
});
