import { newSpecPage } from '@stencil/core/testing';
import { AppRfpDetail } from '../app-rfp-detail';

describe('app-rfp-detail', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRfpDetail],
      html: `<app-rfp-detail></app-rfp-detail>`,
    });
    expect(page.root).toEqualHtml(`
      <app-rfp-detail>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-rfp-detail>
    `);
  });
});
