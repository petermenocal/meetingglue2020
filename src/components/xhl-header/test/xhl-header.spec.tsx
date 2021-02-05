import { newSpecPage } from '@stencil/core/testing';
import { XhlHeader } from '../xhl-header';

describe('xhl-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XhlHeader],
      html: `<xhl-header></xhl-header>`,
    });
    expect(page.root).not.toBeNull();
  });
});
