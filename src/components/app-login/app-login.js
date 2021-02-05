var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, Prop, State } from '@stencil/core';
import 'firebase/auth';
import { toastController } from '@ionic/core';
let AppLogin = class AppLogin {
    constructor() {
        this.customerType = 'customer';
        this.processing = false;
        this.showBanner = true;
        this.customer = {
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
        this.userCreation = false;
        this.formLoginMode = false;
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
        this.createUser = () => {
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
                }
                else {
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
        this.createGreenBitsProfile = () => {
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
                    }
                    else {
                        if (that.customer.type == 'customer') {
                            that.registeredCustomer = Object.assign(Object.assign({}, that.registeredCustomer), obj.body.customer);
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
                            that.registeredCustomer = Object.assign(Object.assign({}, that.registeredCustomer), obj.body.patient);
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
        this.checkIfInFirebase = async (i) => {
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
                        }
                        else {
                            t.existsInFirebase = false;
                        }
                    });
                }
                else {
                    t.existsInFirebase = false;
                }
            });
        };
        this.processRegistrationTasks = (i) => {
            if (!i) {
                this.createGreenBitsProfile();
                // create user in firebase because they dont exist;
            }
            else {
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
                                return (fetch('/api/profile?q=' + t.greenBitsId + '&searchType=true')
                                    // .then(response => response.json())
                                    .then(() => {
                                    t.processing = false;
                                })
                                    .catch(err => {
                                    console.log(err);
                                    t.processing = false;
                                }));
                            }
                        });
                    }
                });
            }
        };
        this.hideAnnouncementBanner = x => {
            this.showBanner = !x;
        };
        this.login = () => {
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
    }
    handleEmailChange(ev) {
        this.customer.email = ev.target.value;
    }
    handlePasswordChange(ev) {
        this.password = ev.target.value;
    }
    handlePasswordConfirmChange(ev) {
        this.passwordConfirm = ev.target.value;
    }
    handleFirstNameChange(ev) {
        this.customer.name = ev.target.value;
    }
    handleLastNameChange(ev) {
        this.customer.surname = ev.target.value;
    }
    handleLicenseChange(ev) {
        this.customer.licenseNumber = ev.target.value;
    }
    handleExpirationChange(ev) {
        this.customer.idExpirationDate = ev.target.value;
    }
    handlePhoneChange(ev) {
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
        }
        else {
            this.userCreation = false;
        }
    }
    setFormLoginMode() {
        this.formLoginMode = !this.formLoginMode;
    }
    forgotPassword() { }
    render() {
        return [
            h("xhl-header", { active: this.active, user: this.user, firebase: this.firebase }),
            h("ion-content", null,
                this.showBanner ? (h("ion-card", { class: "announcement" },
                    h("ion-card-content", null,
                        h("ion-card-subtitle", null, "IMPORTANT INFORMATION"),
                        h("ion-card-title", { class: "returning" },
                            h("ion-icon", { class: "alertcircle", name: "alert-circle-outline" }),
                            " Returning customers"),
                        h("div", { id: "content" },
                            h("strong", null,
                                h("em", null,
                                    h("u", null, "Create a NEW account"),
                                    " with the same information you've previously used.")),
                            h("br", null),
                            "You will receive ALL rewards credits for your purchase history with this new account. Thank you for your patience during our transition to the new system.",
                            h("br", null)),
                        h("ion-button", { size: "small", onClick: () => {
                                this.setUserCreationMode(true);
                                this.hideAnnouncementBanner(true);
                            } }, "Create my new account"),
                        h("a", { href: "mailto:info@exhalebrands.com" }, "Need help? Send us an email via info@exhalebrands.com")))) : null,
                h("ion-card", null,
                    h("ion-card-header", null,
                        h("ion-card-title", null, this.userCreation ? 'Create an account' : 'Login')),
                    h("ion-card-content", null,
                        h("ion-label", null, "Email"),
                        h("ion-input", { class: "input", placeholder: "you@emailaddress.com", type: "email", value: this.customer.email, onKeyUp: ev => this.handleEmailChange(ev) }),
                        h("ion-label", null, "Password"),
                        h("ion-input", { value: this.password, onKeyUp: ev => this.handlePasswordChange(ev), type: "password" }),
                        this.userCreation ? (h("div", null,
                            h("ion-label", null, "Password (Repeat)"),
                            h("ion-input", { value: this.passwordConfirm, onKeyUp: ev => this.handlePasswordConfirmChange(ev), type: "password" }),
                            h("ion-label", null, "First name"),
                            h("ion-input", { value: this.customer.name, onKeyUp: ev => this.handleFirstNameChange(ev), type: "text" }),
                            h("ion-label", null, "Last name"),
                            h("ion-input", { value: this.customer.surname, onKeyUp: ev => this.handleLastNameChange(ev), type: "text" }),
                            h("ion-label", null, "Phone"),
                            h("ion-label", null,
                                h("small", null, " (We use this to contact you about delivery orders.)")),
                            h("ion-input", { pattern: "tel", autocomplete: "tel", value: this.customer.phone, onKeyUp: ev => this.handlePhoneChange(ev), type: "tel" }),
                            h("ion-label", null,
                                h("b", null, "Are you a medical marijuana patient?")),
                            h("div", { class: "medical-mj" },
                                h("ion-button", { onClick: () => (this.customerType = 'customer') }, this.customerType == 'customer' ? h("b", null, "No") : h("span", null, "No")),
                                h("ion-button", { onClick: () => (this.customerType = 'patient') }, this.customerType == 'patient' ? h("b", null, "Yes") : h("span", null, "Yes"))),
                            this.customerType == 'patient' ? (h("div", null,
                                h("ion-label", { position: "floating" }, "Medical ID Number"),
                                h("ion-input", { onIonChange: ev => this.handleLicenseChange(ev), value: this.customer.licenseNumber }))) : null,
                            this.customerType == 'patient' ? (h("div", null,
                                h("ion-label", { position: "floating" }, "Medical ID Expiration Date"),
                                h("ion-input", { onIonChange: ev => this.handleExpirationChange(ev), value: this.customer.idExpirationDate }))) : null)) : null,
                        this.userCreation ? (h("ion-button", { expand: "full", disabled: this.processing, onClick: () => {
                                this.createUser();
                            } }, this.processing ? h("ion-spinner", null) : 'Create an account')) : (h("ion-button", { expand: "full", onClick: () => {
                                this.login();
                            } }, "Login")),
                        h("div", { class: "actions" },
                            !this.userCreation ? (h("a", { href: "#", class: "ion-activated", onClick: () => {
                                    this.setUserCreationMode(true);
                                } },
                                h("ion-label", null,
                                    "Don't have an account? ",
                                    h("strong", null, "Create Account")))) : (h("a", { href: "#", onClick: () => {
                                    this.setUserCreationMode(false);
                                } },
                                h("ion-label", null,
                                    "Have an account already? ",
                                    h("strong", null, "Log in"),
                                    "."))),
                            h("ion-router-link", { href: "/forgot-password" },
                                h("ion-label", null, "Reset password"))))),
                h("xhl-compliance-banner", null)),
        ];
    }
};
__decorate([
    Prop()
], AppLogin.prototype, "firebase", void 0);
__decorate([
    Prop()
], AppLogin.prototype, "user", void 0);
__decorate([
    Prop()
], AppLogin.prototype, "active", void 0);
__decorate([
    State()
], AppLogin.prototype, "greenBitsId", void 0);
__decorate([
    State()
], AppLogin.prototype, "customerType", void 0);
__decorate([
    State()
], AppLogin.prototype, "registeredCustomer", void 0);
__decorate([
    State()
], AppLogin.prototype, "processing", void 0);
__decorate([
    State()
], AppLogin.prototype, "showBanner", void 0);
__decorate([
    State()
], AppLogin.prototype, "existsInFirebase", void 0);
__decorate([
    State()
], AppLogin.prototype, "customer", void 0);
__decorate([
    State()
], AppLogin.prototype, "password", void 0);
__decorate([
    State()
], AppLogin.prototype, "passwordConfirm", void 0);
__decorate([
    Prop()
], AppLogin.prototype, "userCreation", void 0);
__decorate([
    Prop()
], AppLogin.prototype, "formLoginMode", void 0);
AppLogin = __decorate([
    Component({
        tag: 'app-login',
        styleUrl: 'app-login.css',
        shadow: true,
    })
], AppLogin);
export { AppLogin };
