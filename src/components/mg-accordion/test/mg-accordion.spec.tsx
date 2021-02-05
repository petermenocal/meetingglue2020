import { newSpecPage } from '@stencil/core/testing';
import { MgAccordion } from '../mg-accordion';

describe('mg-accordion', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MgAccordion],
      html: `<mg-accordion></mg-accordion>`,
    });
    expect(page.root).toEqualHtml(`
      <mg-accordion>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mg-accordion>
    `);
  });
});
