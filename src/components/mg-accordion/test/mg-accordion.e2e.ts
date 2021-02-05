import { newE2EPage } from '@stencil/core/testing';

describe('mg-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-accordion></mg-accordion>');

    const element = await page.find('mg-accordion');
    expect(element).toHaveClass('hydrated');
  });
});
