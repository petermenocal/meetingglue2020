import { newE2EPage } from '@stencil/core/testing';

describe('app-hotels', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-hotels></app-hotels>');

    const element = await page.find('app-hotels');
    expect(element).toHaveClass('hydrated');
  });
});
