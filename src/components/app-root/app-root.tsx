import { Component, h, State, Prop, Listen } from '@stencil/core';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';
import 'firebase/auth';
import { menuController } from '@ionic/core';
import { version } from '../../../package.json';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @State() user;
  @State() loading: boolean = true;
  @Prop() deviceUUID;
  @Prop() version = version;
  db;
  auth;
  firebaseConfig = {
    apiKey: 'AIzaSyCAcniDZSBPktuJNSTJ3F6FZnKN6rB-JjI',
    authDomain: 'mglue-ebc2f.firebaseapp.com',
    databaseURL: 'https://mglue-ebc2f.firebaseio.com',
    projectId: 'mglue-ebc2f',
    storageBucket: 'mglue-ebc2f.appspot.com',
    messagingSenderId: '753889836193',
    appId: '1:753889836193:web:7e723e5216b434005e04e0',
    measurementId: 'G-4MFVQYD0GJ',
  };
  logout() {
    this.auth()
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

  componentWillLoad = () => {
    firebase.initializeApp(this.firebaseConfig);
    this.db = firebase.database();
    this.auth = firebase.auth();
    this.auth.onAuthStateChanged(user => {
      this.user = user ? user : null;
      this.loading = false;
    });
  };
  @Listen('ionRouteDidChange')
  ionRouteDidChangeHandler() {
    menuController.close('first');
  }
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" componentProps={{ active: 'home', db: this.db, firebase: firebase, user: this.user }} />
          <ion-route url="/hotels" component="app-hotels" componentProps={{ active: 'hotels', firebase: firebase, user: this.user }} />
          <ion-route url="/cvbs" component="app-cvbs" componentProps={{ active: 'cvbs', firebase: firebase, user: this.user }} />
          <ion-route url="/rfps" component="app-rfps" componentProps={{ active: 'rfps', db: this.db, firebase: firebase, user: this.user }} />
          <ion-route url="/rfps/:rfpid" component="rfp-negotiate" componentProps={{ active: 'rfp detail', db: this.db, firebase: firebase, user: this.user }} />
          <ion-route url="/negotiate" component="rfp-negotiate" componentProps={{ active: 'rfp neg', db: this.db, firebase: firebase, user: this.user }} />
          <ion-route url="/login" component="app-login" componentProps={{ active: 'login', firebase: firebase, user: this.user }} />
          <ion-route url="/forgot-password" component="app-forgot-password" componentProps={{ firebase: firebase, user: this.user }} />
          <ion-route url="/profile" component="app-profile" componentProps={{ active: 'profile', firebase: firebase, user: this.user, deviceUUID: this.deviceUUID }} />
          <ion-route-redirect from="/profile" to={this.user ? undefined : '/'} />
          <ion-route-redirect from="/login" to={this.user ? '/' : undefined} />
        </ion-router>
        <ion-menu side="start" menuId="first" contentId="main" color="light">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Meeting Glue</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <div class="col">
              <ion-button expand="full" color="light" href="/">
                Home
              </ion-button>
              <ion-button expand="full" color="light" href="/shop">
                Hotels
              </ion-button>
              <ion-button expand="full" color="light" href="/shop">
                RFPs
              </ion-button>
              <ion-button expand="full" color="light" href="/shop">
                CVBs
              </ion-button>
              {this.user ? (
                <ion-button expand="full" color="light" href="/profile">
                  My Profile
                </ion-button>
              ) : (
                <ion-button expand="full" color="light" href="login">
                  Login
                </ion-button>
              )}
              <ion-button expand="full" color="light" href="/chat">
                Chat
              </ion-button>
              {this.user ? <ion-button onClick={() => this.logout()}>Logout</ion-button> : null}
            </div>
          </ion-content>
        </ion-menu>
        <ion-nav animated={false} id="main" />
      </ion-app>
    );
  }
}
