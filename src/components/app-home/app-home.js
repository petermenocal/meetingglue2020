var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, Prop } from '@stencil/core';
let AppHome = class AppHome {
    componentWillLoad() {
        let auth = this.firebase.default.auth().currentUser;
        if (auth) {
            this.firebase.default
                .database()
                .ref('customers')
                .orderByChild('email')
                .equalTo(auth.email)
                .on('value', function (snapshot) {
                let data = snapshot.val();
                //  :)
                if (data.id) {
                    fetch('/api/profile?q=' + data.id + '&searchType=true');
                }
            });
        }
    }
    render() {
        return [
            h("xhl-header", { active: this.active, user: this.user, firebase: this.firebase }),
            h("ion-content", null,
                h("xhl-hero", { class: "ion-hide-md-down", headline: "Your new favorite dispensary", text: "The best strains, the purest concentrates, the tastiest edibles -- all under one roof.", link: "/", linkTitle: "start shopping", image: "hero-home.jpg", buttonColor: "secondary" }),
                h("xhl-hero", { small: true, class: "ion-hide-md-up", headline: "Your new favorite dispensary", text: "The best strains, the purest concentrates, the tastiest edibles -- all under one roof.", link: "/shop", linkTitle: "start shopping", image: "hero-home-small.jpg" }),
                h("xhl-hero-centered", { headline: "ROAR Concentrates", text: "From sugars to live resin, we've got you covered.", link: "/shop", backgroundColor: "bg-black", linkTitle: "start shopping", image: "hero-roar.png" }),
                h("xhl-hero-centered", { headline: "Effex Supply Co.", text: "Fresh cannabis flower grown in Las Vegas by locals who care.", link: "/shop", backgroundColor: "bg-pink", textColor: "text-black", linkTitle: "start shopping", image: "hero-effex.png" }),
                h("xhl-feature-block", null),
                h("xhl-compliance-banner", null)),
        ];
    }
};
__decorate([
    Prop()
], AppHome.prototype, "user", void 0);
__decorate([
    Prop()
], AppHome.prototype, "firebase", void 0);
__decorate([
    Prop()
], AppHome.prototype, "active", void 0);
AppHome = __decorate([
    Component({
        tag: 'app-home',
        styleUrl: 'app-home.css',
    })
], AppHome);
export { AppHome };
