import { newE2EPage } from '@stencil/core/testing';

describe('rfp-negotiate', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rfp-negotiate></rfp-negotiate>');

    const element = await page.find('rfp-negotiate');
    expect(element).toHaveClass('hydrated');
  });
});
