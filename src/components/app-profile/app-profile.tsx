import { Component, Host, h, Prop } from '@stencil/core';
import _ from 'lodash';
import { toastController } from '@ionic/core';

// import moment from 'moment';
import JsBarcode from 'jsbarcode';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})
export class AppProfile {
  @Prop() user;
  @Prop() firebase;
  @Prop() deviceUUID;
  @Prop() active;
  @Prop() profile;
  @Prop() orders = [];
  @Prop() sorted = [];
  @Prop() fbkey;
  barcode!: HTMLImageElement;
  unwindOrder = async id => {
    let t = this;
    fetch('/api/order?orderId=' + id)
      .then(data => data.json())
      .then(parsed => (t.orders = [...t.orders, parsed]))
      .then(() => this.sortOrders());
  };
  sortOrders = () => {
    let arr = _.orderBy(this.orders, ['charged_on'], ['desc']);
    this.sorted = arr;
  };
  componentWillLoad = () => {
    let t = this;
    if (this.user && this.user.email) {
      let ref = this.firebase.default.database().ref('customers').orderByChild('email').equalTo(this.user.email);
      ref.on('value', function (snapshot) {
        snapshot.forEach(s => {
          t.profile = s.val();
          t.fbkey = s.key;
          t.profile.first_name = _.capitalize(t.profile.first_name);
          t.profile.last_name = _.capitalize(t.profile.last_name);
          if (t.profile && t.profile.order_ids) {
            // _.forEach(t.profile.order_ids, o => {
            //   t.unwindOrder(o);
            // });
          }
        });
      });
    }
  };
  sync = async () => {
    fetch(`https://us-central1-xhl-budtender.cloudfunctions.net/app/profile?q=${this.profile.id}&searchType=true`)
      .then(response => response.json())
      .then(async () => {
        const toast = await toastController.create({
          message: 'Order history synced successfully.',
          duration: 4000,
          position: 'top',
          color: 'primary',
        });
        await toast.present();
        await toast.onWillDismiss();
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidLoad = () => {
    JsBarcode(this.barcode, this.fbkey, {
      fontSize: 15,
      width: 1,
      height: 50,
    });
  };
  render() {
    return (
      <Host>
        <slot>
          <xhl-header active={this.active} user={this.user} firebase={this.firebase} />
          <ion-content>
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Profile</ion-card-subtitle>
                <ion-card-title>
                  {this.profile.first_name} {this.profile.last_name}
                </ion-card-title>
                <ion-card-subtitle>{this.profile.email}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <h3>Open RFPs</h3>
                <ion-list>
                  <ion-item>RFP</ion-item>
                  <ion-item>RFP</ion-item>
                  <ion-item>RFP</ion-item>
                  <ion-item>RFP</ion-item>
                  <ion-item>RFP</ion-item>
                  <ion-item>RFP</ion-item>
                  <ion-item>RFP</ion-item>
                </ion-list>
              </ion-card-content>
              <ion-card-content>
                <h3>Archived</h3>
                <ion-list>
                  <ion-item>RFP</ion-item>
                  <ion-item>RFP</ion-item>
                  <ion-item>RFP</ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-content>
        </slot>
      </Host>
    );
  }
}
