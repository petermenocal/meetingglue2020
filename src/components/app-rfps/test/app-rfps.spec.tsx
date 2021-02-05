import { newSpecPage } from '@stencil/core/testing';
import { AppRfps } from '../app-rfps';

describe('app-rfps', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRfps],
      html: `<app-rfps></app-rfps>`,
    });
    expect(page.root).toEqualHtml(`
      <app-rfps>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-rfps>
    `);
  });
});
