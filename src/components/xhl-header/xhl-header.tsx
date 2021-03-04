import { Component, h, Prop, getAssetPath, Host } from '@stencil/core';
import 'firebase/auth';

@Component({
  tag: 'xhl-header',
  styleUrl: 'xhl-header.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class XhlHeader {
  @Prop() user;
  @Prop() firebase;
  @Prop() color = 'dark';
  @Prop() mode;
  @Prop() active;
  componentWillLoad() {}
  logOut = () => {
    this.firebase.default
      .auth()
      .signOut()
      .then(function () {})
      .catch(function () {});
  };
  render() {
    return (
      <Host>
        <slot>
          <ion-toolbar>
            <ion-title>
              <img src={getAssetPath('./assets/logo__meeting_glue.png')} height="30" alt="" />
            </ion-title>
            <ion-buttons slot="end">
              <ion-button href="/hotels" class={this.active == 'hotels' ? 'active' : null}>
                Hotels
              </ion-button>
              <ion-button href="/" fill="clear" color="primary">
                List RFPS
              </ion-button>
              <ion-button href="/rfps" fill="clear" color="primary">
                New RFP
              </ion-button>
              {this.user ? (
                [
                  <ion-button
                    onClick={() => {
                      this.logOut();
                    }}
                  >
                    Logout
                  </ion-button>,
                ]
              ) : (
                <ion-button class={this.active == 'login' ? 'active' : null} href="/login">
                  Login
                </ion-button>
              )}
            </ion-buttons>
          </ion-toolbar>
        </slot>
      </Host>
    );
  }
}
