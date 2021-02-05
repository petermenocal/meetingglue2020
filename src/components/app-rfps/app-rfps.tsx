import { Component, Host, h, Prop } from '@stencil/core';
import moment from 'moment';

@Component({
  tag: 'app-rfps',
  styleUrl: 'app-rfps.css',
  shadow: true,
})
export class AppRfps {
  @Prop() days;
  @Prop() start = new Date().toLocaleString();
  @Prop() end = new Date().toLocaleString();
  @Prop() eventDays = [];
  @Prop() step = 1;
  @Prop() roomTypeBlockCount = [1];
  handleEndChange(event) {
    this.end = event.target.value;
    let t = this;
    this.eventDays = [];
    let x = moment(this.end).diff(moment(this.start), 'days');
    for (let step = 0; step < x; step++) {
      t.eventDays = [...t.eventDays, { eventDay: step + 1, date: '', roomsCount: 0, roomsType: '' }];
    }
  }
  handleStartChange(event) {
    this.start = event.target.value;
    let t = this;
    this.eventDays = [];
    let x = moment(this.end).diff(moment(this.start), 'days');
    for (let step = 0; step < x; step++) {
      t.eventDays = [...t.eventDays, { eventDay: step + 1, date: '', roomsCount: 0, roomsType: '' }];
    }
  }
  handleDaysChange(event) {
    this.days = [];
    this.days = event.detail.value;
  }
  completeStepOne() {
    this.step = 2;
  }
  addRoomTypeBlock() {
    this.roomTypeBlockCount = [...this.roomTypeBlockCount, 1];
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
          <ion-content>
            <ion-refresher
              slot="fixed"
              onIonRefresh={() => {
                window.location.reload();
              }}
            >
              <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            {/* step one */}
            <ion-grid fixed>
              <h1>New RFP</h1>
              <ion-row>
                <ion-col size="12">
                  <h1>Date Configuration</h1>
                </ion-col>
                <ion-col size="6">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Event Dates</ion-card-title>
                      <ion-card-subtitle>Please select desired dates for your event.</ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-list>
                        <ion-item>
                          <ion-label>Start Date</ion-label>
                          <ion-datetime onIonChange={e => this.handleStartChange(e)} displayFormat="MM DD YYYY" value={this.start}></ion-datetime>
                        </ion-item>
                        <ion-item>
                          <ion-label>End Date</ion-label>
                          <ion-datetime onIonChange={e => this.handleEndChange(e)} displayFormat="MM DD YYYY" value={this.end}></ion-datetime>
                        </ion-item>
                        <ion-item>
                          <ion-label slot="start">Desired Days</ion-label>
                          <ion-select slot="end" multiple={true} onIonChange={e => this.handleDaysChange(e)}>
                            <ion-select-option value="monday">Monday</ion-select-option>
                            <ion-select-option value="tuesday">Tuesday</ion-select-option>
                            <ion-select-option value="wednesday">Wednesday</ion-select-option>
                            <ion-select-option value="thursday">Thursday</ion-select-option>
                            <ion-select-option value="friday">Friday</ion-select-option>
                            <ion-select-option value="saturday">Saturday</ion-select-option>
                            <ion-select-option value="sunday">Sunday</ion-select-option>
                          </ion-select>
                        </ion-item>
                      </ion-list>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
                <ion-col>
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Your new event</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-list>
                        <ion-item>
                          <ion-label>Start Date</ion-label>
                          <ion-text>{moment(this.start).format('dddd, MMMM Do YYYY')}</ion-text>
                        </ion-item>
                        <ion-item>
                          <ion-label>End Date</ion-label>
                          <ion-text>{moment(this.end).format('dddd, MMMM Do YYYY')}</ion-text>
                        </ion-item>
                        <ion-item>
                          <ion-label>Event Length</ion-label>
                          <ion-text>{this.eventDays.length} days</ion-text>
                        </ion-item>
                        <ion-item>
                          <ion-label>Days selected</ion-label>
                          <ion-text>
                            {this.days &&
                              this.days.length < 7 &&
                              this.days.map(d => <ion-text>{this.days && this.days.length ? d.charAt(0).toUpperCase() + d.slice(1) + ' ' : null}</ion-text>)}
                            {this.days && this.days.length > 1 && this.days.length == 7 ? 'Everyday or No Preference' : null}
                          </ion-text>
                        </ion-item>
                      </ion-list>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
            {/* step two */}
            <ion-grid fixed>
              <hr />
              <ion-row>
                <ion-col>
                  <h1>Room Types</h1>
                  <ion-button onClick={() => this.addRoomTypeBlock()}>Add Room Type</ion-button>
                </ion-col>
              </ion-row>
              {this.roomTypeBlockCount.map(() => (
                <ion-card>
                  <ion-card-content>
                    <ion-select class="rooms-type" placeholder="Room Type">
                      <ion-select-option value="1-bed">1 Bed</ion-select-option>
                      <ion-select-option value="2-beds">2 Beds</ion-select-option>
                      <ion-select-option value="run-of-house">Run of House</ion-select-option>
                      <ion-select-option value="staff-room">Staff room</ion-select-option>
                      <ion-select-option value="bedroom-suite">Bedroom Suite</ion-select-option>
                      <ion-select-option value="parlor-suite">Parlor Suite</ion-select-option>
                      <ion-select-option value="presidential-suite">Presidential Suite</ion-select-option>
                    </ion-select>
                    <ion-row>
                      {this.eventDays.map(x => (
                        <ion-col size="1">
                          <ion-row>
                            <ion-card-subtitle>Day {x.eventDay}</ion-card-subtitle>
                          </ion-row>
                          <ion-row>
                            <ion-input value={x.roomsCount}></ion-input>
                          </ion-row>
                        </ion-col>
                      ))}
                    </ion-row>
                  </ion-card-content>
                </ion-card>
              ))}
            </ion-grid>
          </ion-content>
        </slot>
      </Host>
    );
  }
}
