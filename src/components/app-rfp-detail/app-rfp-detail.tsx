import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-rfp-detail',
  styleUrl: 'app-rfp-detail.css',
  shadow: true,
})
export class AppRfpDetail {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
