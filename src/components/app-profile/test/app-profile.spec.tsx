import { newSpecPage } from '@stencil/core/testing';
import { AppProfile } from '../app-profile';

describe('app-profile', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppProfile],
      html: `<app-profile></app-profile>`,
    });
    expect(page.root).toEqualHtml(`
      <app-profile>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-profile>
    `);
  });
});
