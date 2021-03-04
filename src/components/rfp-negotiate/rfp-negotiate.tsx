import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { popoverController } from '@ionic/core';

@Component({
  tag: 'rfp-negotiate',
  styleUrl: 'rfp-negotiate.css',
  shadow: true,
})
export class RfpNegotiate {
  @Prop() active;
  @Prop() user;
  @Prop() firebase;
  @Element() hostElement: HTMLElement;
  @Prop() rfpid;
  @Prop() db;
  @State() proposedRoomsRate = '0';
  @State() proposedRoomsTax = '0';
  @State() proposedCompWifi = false;
  @State() proposedComp1BRSuite = false;
  @State() proposedCompMeetingRoomRental = false;
  @State() hotels = [];
  @State() hotelsInComparisonMatrix = [];
  @State() sending = false;
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

    setTimeout(() => {
      return (this.sending = false);
    }, 4000);

    this.db
      .ref('rfps')
      .push({
        hotels: this.hotelsInComparisonMatrix,
        roomsRate: this.proposedRoomsRate,
        roomsTax: this.proposedRoomsTax,
        compWifi: this.proposedCompWifi,
        comp1BRSuite: this.proposedComp1BRSuite,
        compMeetingRoomRental: this.proposedCompMeetingRoomRental,
      })
      .then(x => {
        window.location.pathname = '/rfps/' + x.key;
      });
  }
  componentWillLoad() {
    if (this.rfpid) {
      let rfpInfo = this.db.ref('rfps/' + this.rfpid);
      rfpInfo.once('value', snapshot => {
        let x = snapshot.val();
        this.hotelsInComparisonMatrix = x.hotels;
        this.proposedRoomsRate = x.roomsRate;
        this.proposedRoomsTax = x.roomsTax;
        this.proposedCompWifi = x.compWifi;
        this.proposedComp1BRSuite = x.comp1BrSuite;
        this.proposedCompMeetingRoomRental = x.compMeetingRoomRental;
      });
    }
    let hots = this.db.ref('hotels/arlington');
    hots.once('value', snapshot => {
      snapshot.forEach(childSnap => {
        this.hotels = [childSnap.val(), ...this.hotels];
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
          <xhl-header active={this.active} user={this.user} firebase={this.firebase} />
          <ion-toolbar>
            <ion-title>
              RFP <em>{this.rfpid ? this.rfpid : null}</em>
            </ion-title>
          </ion-toolbar>
          {this.rfpid ? <p class="tc">{this.hotelsInComparisonMatrix.length} hotels in negotiations</p> : null}
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
              <ion-grid>
                {!this.rfpid ? (
                  <ion-row>
                    <ion-col>
                      <ion-card>
                        <ion-card-header>
                          <ion-card-title>Hotels To Compare</ion-card-title>
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
                ) : null}
                <ion-row>
                  <ion-col size="3">
                    <ion-card>
                      <ion-item lines="none">
                        <small class="heading">Concessions to Compare</small>
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
                    </ion-card>
                  </ion-col>
                  {this.hotelsInComparisonMatrix.map(x => (
                    <ion-col size="3">
                      <ion-card>
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
                      </ion-card>
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
