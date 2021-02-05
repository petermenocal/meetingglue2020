import { Component, h, Prop, Host, getAssetPath } from '@stencil/core';
@Component({
  tag: 'xhl-hero',
  styleUrl: 'xhl-hero.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class XhlHero {
  @Prop() headline;
  @Prop() text;
  @Prop() link;
  @Prop() linkTitle;
  @Prop() image;
  @Prop() small = false;
  @Prop() buttonColor = 'primary';
  render() {
    return (
      <Host>
        <slot>
          <div>
            <ion-grid class="text">
              <ion-col>
                <ion-row>
                  <ion-text class="headline">{this.headline}</ion-text>
                </ion-row>
                <ion-row>
                  <ion-text class="caption">{this.text}</ion-text>
                </ion-row>
                <ion-row>
                  <a href={this.link}>{this.linkTitle}</a>
                </ion-row>
              </ion-col>
            </ion-grid>
            <ion-img class={this.small ? 'image-small' : 'image'} src={getAssetPath(`./assets/${this.image}`)} />
          </div>
        </slot>
      </Host>
    );
  }
}
