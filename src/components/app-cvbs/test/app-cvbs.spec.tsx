import { newSpecPage } from '@stencil/core/testing';
import { AppCvbs } from '../app-cvbs';

describe('app-cvbs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppCvbs],
      html: `<app-cvbs></app-cvbs>`,
    });
    expect(page.root).toEqualHtml(`
      <app-cvbs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-cvbs>
    `);
  });
});
