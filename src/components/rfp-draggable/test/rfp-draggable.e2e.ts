import { newE2EPage } from '@stencil/core/testing';

describe('rfp-draggable', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rfp-draggable></rfp-draggable>');

    const element = await page.find('rfp-draggable');
    expect(element).toHaveClass('hydrated');
  });
});
