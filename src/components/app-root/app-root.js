var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
import { Component, h, State, Prop, Listen } from '@stencil/core';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';
import 'firebase/auth';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;
import { toastController } from '@ionic/core';
import { menuController } from '@ionic/core';
let AppRoot = class AppRoot {
  constructor() {
    this.loading = true;
    this.firebaseConfig = {
      apiKey: 'AIzaSyBZTGHy_qckXAATMdKcQTH3nLyZ-fDVzAU',
      authDomain: 'xhl-budtender.firebaseapp.com',
      databaseURL: 'https://xhl-budtender.firebaseio.com',
      projectId: 'xhl-budtender',
      storageBucket: 'xhl-budtender.appspot.com',
      messagingSenderId: '73546003066',
      appId: '1:73546003066:web:0f3eb69904df50ff9c81c3',
      measurementId: 'G-0B377ZTW18',
    };
    this.componentWillLoad = () => {
      firebase.initializeApp(this.firebaseConfig);
      firebase.analytics();
      Device.getInfo().then(info => {
        this.deviceUUID = info.uuid;
      });
      firebase.auth().onAuthStateChanged(user => {
        this.user = user ? user : null;
        this.loading = false;
      });
    };
  }
  async onSWUpdate() {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration || !registration.waiting) {
      // If there is no registration, this is the first service
      // worker to be installed. registration.waiting is the one
      // waiting to be activiated.
      return;
    }
    const toast = await toastController.create({
      message: 'An update for this site is available.',
      duration: 2000,
    });
    await toast.present();
    await toast.onWillDismiss();
    registration.waiting.postMessage('skipWaiting');
    window.location.reload();
  }
  logout() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          // Sign-out successful.
        },
        function () {
          // An error happened.
        },
      );
  }
  ionRouteDidChangeHandler() {
    menuController.close('first');
  }
  render() {
    return h(
      'ion-app',
      null,
      h(
        'ion-router',
        { useHash: false },
        h('ion-route', { url: '/', component: 'app-home', componentProps: { active: 'home', firebase: firebase, user: this.user } }),
        h('ion-route', { url: '/login', component: 'app-login', componentProps: { active: 'login', firebase: firebase, user: this.user } }),
        h('ion-route', { url: '/forgot-password', component: 'app-forgot-password', componentProps: { firebase: firebase, user: this.user } }),
        h('ion-route', { url: '/shop', component: 'app-shop', componentProps: { deviceUUID: this.deviceUUID, active: 'shop', firebase: firebase, user: this.user } }),
        h('ion-route', { url: '/map', component: 'app-map', componentProps: { active: 'map', firebase: firebase, user: this.user } }),
        h('ion-route', { url: '/bag', component: 'app-bag', componentProps: { deviceUUID: this.deviceUUID, active: 'bag', firebase: firebase, user: this.user } }),
        h('ion-route', { url: '/contact', component: 'app-contact', componentProps: { active: 'contact', firebase: firebase, user: this.user } }),
        h('ion-route', { url: '/terms', component: 'app-terms', componentProps: { active: 'terms', firebase: firebase, user: this.user } }),
        h('ion-route', { url: '/profile', component: 'app-profile', componentProps: { active: 'profile', firebase: firebase, user: this.user, deviceUUID: this.deviceUUID } }),
        h('ion-route-redirect', { from: '/checkout', to: this.user ? undefined : '/login' }),
        h('ion-route-redirect', { from: '/profile', to: this.user ? undefined : '/' }),
        h('ion-route-redirect', { from: '/login', to: this.user ? '/' : undefined }),
      ),
      h(
        'ion-menu',
        { side: 'start', menuId: 'first', contentId: 'main', color: 'light' },
        h('ion-header', null, h('ion-toolbar', { color: 'primary' }, h('ion-title', null, 'Exhale'))),
        h(
          'ion-content',
          null,
          h(
            'div',
            { class: 'col' },
            h('ion-button', { expand: 'full', color: 'light', href: '/' }, 'Home'),
            h('ion-button', { expand: 'full', color: 'light', href: '/shop' }, 'Shop'),
            h('ion-button', { expand: 'full', color: 'light', href: '/map' }, 'Map'),
            h('ion-button', { expand: 'full', color: 'light', href: '/contact' }, 'Contact'),
            this.user
              ? h('ion-button', { expand: 'full', color: 'light', href: '/profile' }, 'My Profile')
              : h('ion-button', { expand: 'full', color: 'light', href: 'login' }, 'Login'),
            h('ion-button', { expand: 'full', color: 'light', href: '/bag' }, 'Bag'),
            this.user ? h('ion-button', { onClick: () => this.logout() }, 'Logout') : null,
          ),
        ),
      ),
      h('ion-nav', { animated: false, id: 'main' }),
    );
  }
};
__decorate([State()], AppRoot.prototype, 'user', void 0);
__decorate([State()], AppRoot.prototype, 'loading', void 0);
__decorate([Prop()], AppRoot.prototype, 'deviceUUID', void 0);
__decorate([Listen('swUpdate', { target: 'window' })], AppRoot.prototype, 'onSWUpdate', null);
__decorate([Listen('ionRouteDidChange')], AppRoot.prototype, 'ionRouteDidChangeHandler', null);
AppRoot = __decorate(
  [
    Component({
      tag: 'app-root',
      styleUrl: 'app-root.css',
    }),
  ],
  AppRoot,
);
export { AppRoot };
