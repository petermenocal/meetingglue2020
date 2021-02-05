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
          <ion-toolbar color={this.color} mode="ios">
            <ion-title class="title ">
              <a href="/">
                <img src={getAssetPath('./assets/logo__meeting_glue.png')} height="30" alt="" />
              </a>
            </ion-title>
            <ion-buttons class="hide-md-up">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-buttons class="hide-md-down" slot="end">
              <ion-button href="/" class={this.active == 'home' ? 'active' : null}>
                Home
              </ion-button>
              <ion-button href="/hotels" class={this.active == 'hotels' ? 'active' : null}>
                Hotels
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
