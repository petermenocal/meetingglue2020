import { Component, h, Prop, State } from '@stencil/core';
import 'firebase/auth';
import { toastController } from '@ionic/core';
@Component({
  tag: 'app-login',
  styleUrl: 'app-login.css',
  shadow: true,
})
export class AppLogin {
  @Prop() firebase;
  @Prop() user;
  @Prop() active;
  @State() greenBitsId;
  @State() customerType = 'customer';
  @State() registeredCustomer;
  @State() processing = false;
  @State() showBanner = true;
  @State() existsInFirebase: boolean;
  @State() customer = {
    name: null,
    surname: null,
    licenseNumber: null,
    state: null,
    city: null,
    address: null,
    id: null,
    zip: null,
    dob: null,
    email: null,
    idExpirationDate: null,
    phone: null,
    type: this.customerType,
  };
  @State() password;
  @State() passwordConfirm;
  @Prop() userCreation = false;
  @Prop() formLoginMode = false;
  handleEmailChange(ev: any) {
    this.customer.email = ev.target.value;
  }
  handlePasswordChange(ev: any) {
    this.password = ev.target.value;
  }
  handlePasswordConfirmChange(ev: any) {
    this.passwordConfirm = ev.target.value;
  }
  handleFirstNameChange(ev: any) {
    this.customer.name = ev.target.value;
  }
  handleLastNameChange(ev: any) {
    this.customer.surname = ev.target.value;
  }
  handleLicenseChange(ev: any) {
    this.customer.licenseNumber = ev.target.value;
  }
  handleExpirationChange(ev: any) {
    this.customer.idExpirationDate = ev.target.value;
  }
  handlePhoneChange(ev: any) {
    this.customer.phone = ev.target.value;
  }
  async presentErrorToast(message) {
    const toast = await toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  setUserCreationMode(b) {
    if (b) {
      this.userCreation = true;
    } else {
      this.userCreation = false;
    }
  }
  setFormLoginMode() {
    this.formLoginMode = !this.formLoginMode;
  }
  forgotPassword() {}
  // setNewUserId = id => {
  //   let that = this;
  //   this.firebase.default
  //     .database()
  //     .ref('customers')
  //     .orderByChild('email')
  //     .equalTo(this.email)
  //     .once('value', function (snapshot) {
  //       if (snapshot.exists()) {
  //         that.firebase.default
  //           .database()
  //           .ref('customers/' + snapshot.key + '/uid')
  //           .set(id);
  //       }
  //     });
  // };
  createUser = () => {
    // let that = this;
    this.processing = true;
    //validate form
    if (!this.customer.email) {
      return alert('enter an email address');
    }
    if (!this.password) {
      return alert('enter a password to continue');
    }
    if (!this.passwordConfirm) {
      return alert('confirm your password to continue');
    }
    if (this.password !== this.passwordConfirm) {
      return alert('passwords dont match');
    }
    if (!this.customer.name) {
      return alert('You must enter a first name');
    }
    if (!this.customer.surname) {
      return alert('You must enter a last name');
    }
    if (!this.customer.phone) {
      return alert('You must enter a phone number');
    }
    if (this.customerType == 'patient' && !this.customer.idExpirationDate) {
      return alert('you must enter a medical mj card expiration date');
    }
    if (this.customerType == 'patient' && !this.customer.licenseNumber) {
      return alert('you must enter a valid medical mj card number');
    }
    // check if user exists in database
    let t = this;
    this.checkIfInFirebase(this.customer.email).then(() => {
      if (t.existsInFirebase == true) {
        t.firebase.default
          .auth()
          .createUserWithEmailAndPassword(t.customer.email, t.password)
          .then(function () {
            t.processing = false;
          })
          .catch(() => {
            t.processing = false;
          });
        return t.processRegistrationTasks(t.greenBitsId);
      } else {
        t.firebase.default
          .auth()
          .createUserWithEmailAndPassword(t.customer.email, t.password)
          .then(function () {
            // new user => create profile in greenbits
            t.processing = false;
          })
          .catch(() => {
            t.processing = false;
          });
        return t.processRegistrationTasks();
      }
    });

    return;
  };
  createGreenBitsProfile = () => {
    let that = this;
    fetch('/api/createProfile', { method: 'POST', body: JSON.stringify(that.customer) })
      .then(r => r.json().then(data => ({ status: r.status, body: data })))
      .then(obj => {
        if (obj.status == 200) {
          if (obj.body.errors) {
            if (obj.body.errors.id_number) {
              console.log('that id number is taken already.');
              return;
            }
          } else {
            if (that.customer.type == 'customer') {
              that.registeredCustomer = {
                ...that.registeredCustomer,
                ...obj.body.customer,
              };
              that.registeredCustomer.email = that.customer.email;
              that.registeredCustomer.last_name = that.customer.surname;
              that.registeredCustomer.phone = that.customer.phone;
              this.firebase.default
                .database()
                .ref('customers')
                .push(this.registeredCustomer)
                .then(() => {
                  return;
                });
              return;
            }
            if (that.customer.type == 'patient') {
              that.registeredCustomer = {
                ...that.registeredCustomer,
                ...obj.body.patient,
              };
              that.registeredCustomer.email = that.customer.email;
              that.registeredCustomer.last_name = that.customer.surname;
              that.registeredCustomer.phone = that.customer.phone;
              this.firebase.default
                .database()
                .ref('customers')
                .push(this.registeredCustomer)
                .then(() => {
                  return;
                });
              return;
            }
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  checkIfInFirebase = async i => {
    let t = this;
    await this.firebase.default
      .database()
      .ref('customers')
      .orderByChild('email')
      .equalTo(i)
      .once('value')
      .then(function (snapshot) {
        if (snapshot.exists()) {
          snapshot.forEach(function (childSnap) {
            let x = childSnap.val();
            if (x.id) {
              t.existsInFirebase = true;
              t.greenBitsId = x.id;
            } else {
              t.existsInFirebase = false;
            }
          });
        } else {
          t.existsInFirebase = false;
        }
      });
  };

  processRegistrationTasks = (i?) => {
    if (!i) {
      this.createGreenBitsProfile();
      // create user in firebase because they dont exist;
    } else {
      // augment profile with new orders and points
      let t = this;
      this.firebase.default
        .database()
        .ref('customers')
        .orderByChild('email')
        .equalTo(this.customer.email)
        .once('value')
        .then(function (snapshot) {
          if (snapshot.exists()) {
            snapshot.forEach(function (childSnap) {
              let x = childSnap.val();
              if (x.id) {
                t.existsInFirebase = true;
                t.greenBitsId = x.id;
                return (
                  fetch('/api/profile?q=' + t.greenBitsId + '&searchType=true')
                    // .then(response => response.json())
                    .then(() => {
                      t.processing = false;
                    })
                    .catch(err => {
                      console.log(err);
                      t.processing = false;
                    })
                );
              }
            });
          }
        });
    }
  };
  hideAnnouncementBanner = x => {
    this.showBanner = !x;
  };
  login = () => {
    let that = this;
    //Login User with Email and Password
    if (!this.customer.email) {
      return this.presentErrorToast('You must provide an email address to login.');
    }
    if (!this.password) {
      return this.presentErrorToast('You must provide a password to login.');
    }
    that.presentErrorToast('Syncing order history');
    this.firebase.default
      .auth()
      .signInWithEmailAndPassword(this.customer.email, this.password)
      .then(function () {
        that.checkIfInFirebase(that.customer.email).then(() => {
          return fetch('/api/profile?q=' + that.greenBitsId + '&searchType=true')
            .then(response => response.json())
            .catch(err => {
              console.log(err);
            });
        });
        // that.processRegistrationTasks(success.user.email);
      })
      .catch(function (error) {
        that.presentErrorToast(error.message);
      });
  };

  render() {
    return [
      <xhl-header active={this.active} user={this.user} firebase={this.firebase} />,
      <ion-content>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Login</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-label>Email</ion-label>
            <ion-input class="input" placeholder="you@emailaddress.com" type="email" value={this.customer.email} onKeyUp={ev => this.handleEmailChange(ev)}></ion-input>
            <ion-label>Password</ion-label>
            <ion-input class="input" value={this.password} onKeyUp={ev => this.handlePasswordChange(ev)} type="password"></ion-input>

            {this.userCreation ? (
              <ion-button
                expand="full"
                disabled={this.processing}
                onClick={() => {
                  this.createUser();
                }}
              >
                {this.processing ? <ion-spinner /> : 'Create an account'}
              </ion-button>
            ) : (
              <ion-button
                expand="full"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </ion-button>
            )}
            <div class="actions">
              <ion-router-link href="/forgot-password">
                <ion-label>Reset password</ion-label>
              </ion-router-link>
            </div>
          </ion-card-content>
        </ion-card>
      </ion-content>,
    ];
  }
}
