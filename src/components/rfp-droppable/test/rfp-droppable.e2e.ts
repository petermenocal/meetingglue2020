import { newE2EPage } from '@stencil/core/testing';

describe('rfp-droppable', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rfp-droppable></rfp-droppable>');

    const element = await page.find('rfp-droppable');
    expect(element).toHaveClass('hydrated');
  });
});
