import { newE2EPage } from '@stencil/core/testing';

describe('app-cvbs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-cvbs></app-cvbs>');

    const element = await page.find('app-cvbs');
    expect(element).toHaveClass('hydrated');
  });
});
