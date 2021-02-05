import { newSpecPage } from '@stencil/core/testing';
import { AppHotels } from '../app-hotels';

describe('app-hotels', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppHotels],
      html: `<app-hotels></app-hotels>`,
    });
    expect(page.root).toEqualHtml(`
      <app-hotels>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-hotels>
    `);
  });
});
