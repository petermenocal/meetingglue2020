import { newSpecPage } from '@stencil/core/testing';
import { RfpDroppable } from '../rfp-droppable';

describe('rfp-droppable', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RfpDroppable],
      html: `<rfp-droppable></rfp-droppable>`,
    });
    expect(page.root).toEqualHtml(`
      <rfp-droppable>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rfp-droppable>
    `);
  });
});
