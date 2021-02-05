import { newSpecPage } from '@stencil/core/testing';
import { RfpNegotiate } from '../rfp-negotiate';

describe('rfp-negotiate', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RfpNegotiate],
      html: `<rfp-negotiate></rfp-negotiate>`,
    });
    expect(page.root).toEqualHtml(`
      <rfp-negotiate>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rfp-negotiate>
    `);
  });
});
