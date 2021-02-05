import { Component, h, Prop } from '@stencil/core';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @Prop() user;
  @Prop() firebase;
  @Prop() active;
  @Prop() rfps = [];
  componentWillLoad() {
    let t = this;
    this.firebase
      .database()
      .ref('rfps')
      .on('value', snapshot => {
        t.rfps = [];
        snapshot.forEach(childSnap => {
          let x = childSnap.val();
          x.key = childSnap.ref.key;
          t.rfps = [x, ...t.rfps];
        });
      });
  }
  render() {
    return [
      <xhl-header active={this.active} user={this.user} firebase={this.firebase} />,
      <ion-content>
        <ion-list>
          {this.rfps.map((x, key) => (
            <a href={`rfps/${x.key}`}>
              <ion-item>RFP ID {x.key}</ion-item>
            </a>
          ))}
        </ion-list>
      </ion-content>,
    ];
  }
}
