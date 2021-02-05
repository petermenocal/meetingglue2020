import { newSpecPage } from '@stencil/core/testing';
import { RfpDraggable } from '../rfp-draggable';

describe('rfp-draggable', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RfpDraggable],
      html: `<rfp-draggable></rfp-draggable>`,
    });
    expect(page.root).toEqualHtml(`
      <rfp-draggable>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rfp-draggable>
    `);
  });
});
