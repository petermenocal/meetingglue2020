import { Component, State, EventEmitter, Event, Prop, h } from '@stencil/core';

@Component({
  tag: 'mg-accordion',
  styleUrl: 'mg-accordion.css',
  shadow: true,
})
export class MgAccordion {
  @State() toggle: boolean = false;
  @Prop() label: string;
  @Prop() description: string;
  @Prop() width: string;
  @Prop() color: string;
  @Prop() hotel;
  @Event() toggleEv: EventEmitter;
  toggleComponent() {
    this.toggle = !this.toggle;
    this.toggleEv.emit({ visible: this.toggle });
  }

  render() {
    return (
      <div class="acc-item">
        <button
          class="accordion"
          style={{
            width: this.width,
            backgroundColor: this.color,
          }}
          onClick={() => this.toggleComponent()}
        >
          {this.hotel.PROPERTY}
          {this.toggle ? <span>&#9650;</span> : <span>&#9660;</span>}
        </button>
        <div class={`content-box ${this.toggle ? 'open' : 'close'}`} style={{ width: this.width }}>
          {this.toggle ? (
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>{this.hotel.AREA}</ion-card-subtitle>
                <ion-card-subtitle>{this.hotel.ADDRESS}</ion-card-subtitle>
                <ion-card-title>{this.hotel.PROPERTY}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-grid>
                  <ion-row>
                    <ion-col size="6">
                      <ion-grid>
                        {/* av co */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>AV Company</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['AV Company']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* airport info */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Airport Info</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Airport Info']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* airport huttle */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Airport Shuttle</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Airport Shuttle']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Attachments</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Attachments']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Business Center</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Business Center']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>City</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['CITY']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>FB Tax</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['FB Tax']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Fitness Center</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Fitness Center']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Guest Rooms</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['GUEST Rooms']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Golf</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Golf']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Hotel Rating</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Hotel Rating']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Largest Room 1</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Largest Room 1']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Largest Room 2</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Largest Room 2']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Loyalty Program</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Loyalty Program']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Meeting Rooms</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Meeting Rooms']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Other</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Other']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Property</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['PROPERTY']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Pool</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Pool']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Resort Fee</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Resort Fee']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Restaurants Onsite</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Restaurants Onsite']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Rooms Tax</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Rooms Tax']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>State</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['STATE']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Self Parking</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Self Parking']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Service Charge</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Service Charge']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Spa</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Spa']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Total Meeting Space</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Total Meeting Space']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Union Status</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Union Statu']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Valet Parking</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Valet Parking']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Wifi Guest Room</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Wifi Guest Room']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Wifi Public Space</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Wifi Public Space']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Attachments</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['Attachments']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                        {/* attachments */}
                        <ion-row class="rowx">
                          <ion-col size="4">
                            <div class="itemx">
                              <b>Zip</b>
                            </div>
                          </ion-col>
                          <ion-col>
                            <div class="itemx">
                              <p>{this.hotel['ZIP']}</p>
                            </div>
                          </ion-col>
                        </ion-row>
                      </ion-grid>
                    </ion-col>
                    <ion-col size="6" class="ion-padding">
                      <h1>SIDEBAR</h1>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>
          ) : null}
        </div>
      </div>
    );
  }
}
