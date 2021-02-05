var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, Prop, State } from '@stencil/core';
import { toastController } from '@ionic/core';
let AppForgotPassword = class AppForgotPassword {
    constructor() {
        this.successMessage = false;
    }
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
            h("xhl-header", { active: this.active, user: this.user, firebase: this.firebase }),
            h("ion-content", null, !this.successMessage ? (h("ion-card", null,
                h("ion-card-header", null,
                    h("ion-card-title", null, "Reset Password")),
                h("ion-card-content", null,
                    h("ion-label", null, "Email"),
                    h("ion-input", { value: this.email, onKeyUp: ev => this.handleEmailChange(ev) }),
                    h("ion-button", { expand: "full", onClick: () => {
                            this.sendPasswordResetEmail();
                        } }, "Reset password"),
                    h("ion-router-link", { href: "/login" },
                        h("ion-label", null,
                            "Registered already? ",
                            h("strong", null, "Log in.")))))) : (h("ion-card", null,
                h("ion-card-header", null,
                    h("ion-card-title", null, "Check your email")),
                h("ion-card-content", null, "We have sent an email to the address on file. If you have an account, you can use the link in that email to reset your password.")))),
        ];
    }
};
__decorate([
    Prop()
], AppForgotPassword.prototype, "user", void 0);
__decorate([
    Prop()
], AppForgotPassword.prototype, "firebase", void 0);
__decorate([
    State()
], AppForgotPassword.prototype, "email", void 0);
__decorate([
    Prop()
], AppForgotPassword.prototype, "active", void 0);
__decorate([
    Prop()
], AppForgotPassword.prototype, "successMessage", void 0);
AppForgotPassword = __decorate([
    Component({
        tag: 'app-forgot-password',
        styleUrl: 'app-forgot-password.css',
        shadow: true,
    })
], AppForgotPassword);
export { AppForgotPassword };
