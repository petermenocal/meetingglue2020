import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-hotels',
  styleUrl: 'app-hotels.css',
  shadow: true,
})
export class AppHotels {
  @Prop() firebase;
  @Prop() hotels = [];
  @Prop() active;
  @Prop() user;
  componentWillLoad() {
    let t = this;
    let hots = this.firebase.default.database().ref('hotels/arlington');
    hots.once('value', snapshot => {
      snapshot.forEach(childSnap => {
        t.hotels = [childSnap.val(), ...t.hotels];
      });
    });
  }
  render() {
    return (
      <Host>
        <slot>
          <xhl-header active={this.active} user={this.user} firebase={this.firebase} />
          <ion-toolbar>
            <ion-title>Hotels</ion-title>
          </ion-toolbar>
          <ion-content>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-list>
                    {this.hotels.map(x => (
                      <ion-item lines={'inset'}>
                        <mg-accordion label="label" hotel={x}></mg-accordion>
                      </ion-item>
                    ))}
                  </ion-list>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-content>
        </slot>
      </Host>
    );
  }
}
