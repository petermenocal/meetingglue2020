import { Component, Host, h, Prop, Element } from '@stencil/core';
import { popoverController } from '@ionic/core';

@Component({
  tag: 'rfp-negotiate',
  styleUrl: 'rfp-negotiate.css',
  shadow: true,
})
export class RfpNegotiate {
  @Element() hostElement: HTMLElement;
  @Prop() rfpid;
  @Prop() proposedRoomsRate = '0';
  @Prop() proposedRoomsTax = '0';
  @Prop() proposedCompWifi = false;
  @Prop() proposedComp1BRSuite = false;
  @Prop() proposedCompMeetingRoomRental = false;
  @Prop() firebase;
  @Prop() hotels = [];
  @Prop() hotelsInComparisonMatrix = [];
  @Prop() sending = false;
  handleCompWifiChange() {
    this.proposedCompWifi = !this.proposedCompWifi;
  }
  handleComp1BRSuiteChange() {
    this.proposedComp1BRSuite = !this.proposedComp1BRSuite;
  }
  handleHotelSelection(event) {
    this.hotelsInComparisonMatrix = event.detail.value;
  }
  handleRoomsRateChange(event) {
    this.proposedRoomsRate = event.target.value;
  }
  handleRoomsTaxChange(event) {
    this.proposedRoomsTax = event.target.value;
  }
  handleCompMeetingRoomRentalChange() {
    this.proposedCompMeetingRoomRental = !this.proposedCompMeetingRoomRental;
  }
  mockSend() {
    this.sending = true;
    let t = this;
    setTimeout(function () {
      return (t.sending = false);
    }, 4000);
    this.firebase
      .database()
      .ref('rfps')
      .push({
        hotels: t.hotelsInComparisonMatrix,
        roomsRate: t.proposedRoomsRate,
        roomsTax: t.proposedRoomsTax,
        compWifi: t.proposedCompWifi,
        comp1BRSuite: t.proposedComp1BRSuite,
        compMeetingRoomRental: t.proposedCompMeetingRoomRental,
      })
      .then(x => {
        window.location.pathname = '/rfps/' + x.key;
      });
  }
  componentWillLoad() {
    let t = this;
    console.log(this.rfpid);
    if (this.rfpid) {
      let rfpInfo = this.firebase.database().ref('rfps/' + this.rfpid);
      rfpInfo.on('value', snapshot => {
        let x = snapshot.val();
        t.hotelsInComparisonMatrix = x.hotels;
        t.proposedRoomsRate = x.roomsRate;
        t.proposedRoomsTax = x.roomsTax;
        t.proposedCompWifi = x.compWifi;
        t.proposedComp1BRSuite = x.comp1BrSuite;
        t.proposedCompMeetingRoomRental = x.compMeetingRoomRental;
      });
    }
    let hots = this.firebase.default.database().ref('hotels/arlington');
    hots.on('value', snapshot => {
      snapshot.forEach(childSnap => {
        t.hotels = [childSnap.val(), ...t.hotels];
      });
    });
  }
  async presentPopover(ev: any) {
    const popover = await popoverController.create({
      component: 'app-popover',
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
  render() {
    return (
      <Host>
        <slot>
          <ion-toolbar>
            <ion-buttons>
              <a href="/">
                <ion-button fill="solid">List</ion-button>
              </a>
              <a href="/rfps">
                <ion-button fill="solid">Step One</ion-button>
              </a>
              <a href="/negotiate">
                <ion-button fill="solid">Step Two</ion-button>
              </a>
            </ion-buttons>
          </ion-toolbar>
          {this.sending ? (
            <ion-slides>
              <ion-slide>
                <div>
                  <ion-spinner></ion-spinner>
                  <h1>Sending RFP to {this.hotelsInComparisonMatrix.length} properties</h1>
                </div>
              </ion-slide>
            </ion-slides>
          ) : (
            <ion-content>
              <ion-refresher
                slot="fixed"
                onIonRefresh={() => {
                  window.location.reload();
                }}
              >
                <ion-refresher-content></ion-refresher-content>
              </ion-refresher>
              <ion-grid>
                <ion-row>
                  <ion-col>
                    <ion-card>
                      <ion-card-header>
                        <ion-card-title>Hotel Matrix</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <ion-item lines="none" color="clear">
                          <ion-label>Hotels</ion-label>
                          <ion-select placeholder="Select One" multiple onIonChange={event => this.handleHotelSelection(event)}>
                            {this.hotels.map(x => (
                              <ion-select-option value={x}>{x.PROPERTY}</ion-select-option>
                            ))}
                          </ion-select>
                        </ion-item>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="3">
                    <ion-item lines="none">
                      <small class="heading">Concessions</small>
                    </ion-item>
                    <ion-item lines="none">
                      <ion-input
                        value={this.proposedRoomsRate}
                        onIonInput={ev => {
                          this.handleRoomsRateChange(ev);
                        }}
                      ></ion-input>
                      <ion-label>Rooms Rate ($)</ion-label>
                    </ion-item>
                    <ion-item lines="none">
                      <ion-input
                        value={this.proposedRoomsTax}
                        onIonInput={ev => {
                          this.handleRoomsTaxChange(ev);
                        }}
                      ></ion-input>
                      <ion-label>Guest Rooms Tax</ion-label>
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle
                        slot="start"
                        checked={this.proposedCompWifi}
                        onIonChange={() => {
                          this.handleCompWifiChange();
                        }}
                      ></ion-toggle>
                      <ion-label>Comp. Wifi in Guestrooms</ion-label>
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle
                        slot="start"
                        checked={this.proposedComp1BRSuite}
                        onIonChange={() => {
                          this.handleComp1BRSuiteChange();
                        }}
                      ></ion-toggle>
                      <ion-label>(2) Comp. 1-BR Suites</ion-label>
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle
                        slot="start"
                        checked={this.proposedCompMeetingRoomRental}
                        onIonChange={() => {
                          this.handleCompMeetingRoomRentalChange();
                        }}
                      ></ion-toggle>
                      <ion-label>Comp. Meeting Room Rental</ion-label>
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Guest Room Attrition
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Cut-off Date
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Upgrade at Group Rate
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Comp Room
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Discounted Staff Room
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Guest Room Comp Ratio
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Group Rate Available
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Commission - Guest Room
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Rebate - Guest Room
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Welcome Amenity - Comp
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Planner Points - Group
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Planner Points - Other
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Parking Pass - Comp
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Airport Transfer - Comp
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Box Drayage - Comp
                    </ion-item>
                    <ion-item lines="none">
                      <ion-toggle slot="start" /> Club Lounge Access - Comp
                    </ion-item>
                  </ion-col>
                  {this.hotelsInComparisonMatrix.map(x => (
                    <ion-col size="2">
                      <ion-reorder slot="start"></ion-reorder>
                      <ion-item lines="none">
                        <small class="heading">{x.PROPERTY}</small>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon name="radio-outline" slot="start"></ion-icon>
                        {x['Rooms Tax']}%
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon name="radio-outline" slot="start"></ion-icon>
                        {x['Wifi Guest Room'] == 0 ? 'Free' : x['Wifi Guest Room']}
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-icon slot="start" icon="hourglass-outline"></ion-icon>
                        <ion-label>
                          <p>Awaiting Reply</p>
                        </ion-label>
                      </ion-item>
                    </ion-col>
                  ))}
                </ion-row>
              </ion-grid>
              <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button onClick={() => this.mockSend()}>
                  <ion-icon name="send"></ion-icon>
                </ion-fab-button>
              </ion-fab>
            </ion-content>
          )}
        </slot>
      </Host>
    );
  }
}
