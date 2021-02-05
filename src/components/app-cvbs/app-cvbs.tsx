import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-cvbs',
  styleUrl: 'app-cvbs.css',
  shadow: true,
})
export class AppCvbs {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
