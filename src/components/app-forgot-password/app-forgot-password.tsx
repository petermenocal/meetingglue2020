import { Component, h, Prop, State } from '@stencil/core';
import { toastController } from '@ionic/core';
@Component({
  tag: 'app-forgot-password',
  styleUrl: 'app-forgot-password.css',
  shadow: true,
})
export class AppForgotPassword {
  @Prop() user;
  @Prop() firebase;
  @State() email;
  @Prop() active;
  @Prop() successMessage = false;
  handleEmailChange(ev) {
    this.email = ev.target.value;
  }
  async presentSuccessToast() {
    const toast = await toastController.create({
      message: 'Password reset email successfully sent.',
      duration: 3000,
    });
    toast.present();
  }
  async presentErrorToast(error) {
    const toast = await toastController.create({
      message: error,
      duration: 3000,
    });
    toast.present();
  }

  sendPasswordResetEmail() {
    let that = this;
    this.firebase.default
      .auth()
      .sendPasswordResetEmail(this.email)
      .then(function () {
        that.presentSuccessToast();
        that.successMessage = true;
      })
      .catch(function (error) {
        // An error happened.
        that.presentErrorToast(error);
      });
  }
  render() {
    return [
      <xhl-header active={this.active} user={this.user} firebase={this.firebase} />,
      <ion-content>
        {!this.successMessage ? (
          <ion-card>
            <ion-card-header>
              <ion-card-title>Reset Password</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-label>Email</ion-label>
              <ion-input value={this.email} onKeyUp={ev => this.handleEmailChange(ev)}></ion-input>
              <ion-button
                expand="full"
                onClick={() => {
                  this.sendPasswordResetEmail();
                }}
              >
                Reset password
              </ion-button>
              <ion-router-link href="/login">
                <ion-label>
                  Registered already? <strong>Log in.</strong>
                </ion-label>
              </ion-router-link>
            </ion-card-content>
          </ion-card>
        ) : (
          <ion-card>
            <ion-card-header>
              <ion-card-title>Check your email</ion-card-title>
            </ion-card-header>
            <ion-card-content>We have sent an email to the address on file. If you have an account, you can use the link in that email to reset your password.</ion-card-content>
          </ion-card>
        )}
      </ion-content>,
    ];
  }
}
