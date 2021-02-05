import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-hotels',
  styleUrl: 'app-hotels.css',
  shadow: true,
})
export class AppHotels {
  @Prop() firebase;
  @Prop() hotels = [];
  componentWillLoad() {
    let t = this;
    let hots = this.firebase.default.database().ref('hotels/arlington');
    hots.on('value', snapshot => {
      snapshot.forEach(childSnap => {
        t.hotels = [childSnap.val(), ...t.hotels];
      });
    });
  }
  render() {
    return (
      <Host>
        <slot>
          <xhl-header></xhl-header>
          <ion-toolbar></ion-toolbar>
          <ion-content>
            <ion-list>
              {this.hotels.map(x => (
                <mg-accordion label="label" hotel={x}></mg-accordion>
              ))}
            </ion-list>
          </ion-content>
        </slot>
      </Host>
    );
  }
}
