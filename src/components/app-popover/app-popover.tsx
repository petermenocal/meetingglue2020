import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-popover',
  styleUrl: 'app-popover.css',
})
export class AppPopover {
  render() {
    return [
      <ion-list>
        <ion-item>ROOMS</ion-item>
        <ion-item>Guest Room Attrition</ion-item>
        <ion-item>Cut-off Date</ion-item>
        <ion-item>WiFi in Guest Room - Comp</ion-item>
        <ion-item>Upgrade at Group Rate</ion-item>
        <ion-item>Comp Room</ion-item>
        <ion-item>Discounted Staff Room</ion-item>
        <ion-item>Guest Room Comp Ratio</ion-item>
        <ion-item>Group Rate Available</ion-item>
        <ion-item>COMMISSION / REBATE</ion-item>
        <ion-item>Commission - Guest Room</ion-item>
        <ion-item>Rebate - Guest Room</ion-item>
        <ion-item>OTHER</ion-item>
        <ion-item>Welcome Amenity - Comp</ion-item>
        <ion-item>Planner Points - Group</ion-item>
        <ion-item>Planner Points - Other</ion-item>
        <ion-item>Parking Pass - Comp</ion-item>
        <ion-item>Airport Transfer - Comp</ion-item>
        <ion-item>Box Drayage - Comp</ion-item>
        <ion-item>Club Lounge Access - Comp</ion-item>
      </ion-list>,
    ];
  }
}
