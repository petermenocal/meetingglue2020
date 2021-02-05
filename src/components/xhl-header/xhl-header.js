var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, Prop, getAssetPath, Host } from '@stencil/core';
import 'firebase/auth';
let XhlHeader = class XhlHeader {
    constructor() {
        this.color = 'dark';
        this.logOut = () => {
            this.firebase.default
                .auth()
                .signOut()
                .then(function () { })
                .catch(function (error) {
                // An error happened.
                console.log(error);
            });
        };
    }
    componentWillLoad() { }
    render() {
        return (h(Host, null,
            h("slot", null,
                h("ion-toolbar", { color: this.color, mode: "ios" },
                    h("ion-title", { class: "title " },
                        h("a", { href: "/" },
                            h("img", { src: getAssetPath('./assets/logo.svg'), height: "50", alt: "" }))),
                    h("ion-buttons", { class: "hide-md-up" },
                        h("ion-menu-button", null)),
                    h("ion-buttons", { class: "hide-md-down", slot: "end" },
                        h("ion-button", { href: "/", class: this.active == 'home' ? 'active' : null }, "Home"),
                        h("ion-button", { href: "/shop", class: this.active == 'shop' ? 'active' : null }, "Shop"),
                        h("ion-button", { href: "/map", class: this.active == 'map' ? 'active' : null }, "Map"),
                        h("ion-button", { href: "/contact", class: this.active == 'contact' ? 'active' : null }, "Contact"),
                        this.user ? ([
                            h("ion-button", { href: "/profile", class: this.active == 'profile' ? 'active' : null }, "My Profile"),
                            h("ion-button", { onClick: () => {
                                    this.logOut();
                                } }, "Logout"),
                        ]) : (h("ion-button", { class: this.active == 'login' ? 'active' : null, href: "/login" }, "Login")),
                        h("ion-button", { class: this.active == 'bag' ? 'active' : null, href: "/bag" },
                            h("ion-icon", { color: this.active ? 'primary' : null, icon: "cart-outline" })))))));
    }
};
__decorate([
    Prop()
], XhlHeader.prototype, "user", void 0);
__decorate([
    Prop()
], XhlHeader.prototype, "firebase", void 0);
__decorate([
    Prop()
], XhlHeader.prototype, "color", void 0);
__decorate([
    Prop()
], XhlHeader.prototype, "mode", void 0);
__decorate([
    Prop()
], XhlHeader.prototype, "active", void 0);
XhlHeader = __decorate([
    Component({
        tag: 'xhl-header',
        styleUrl: 'xhl-header.css',
        shadow: true,
        assetsDirs: ['assets'],
    })
], XhlHeader);
export { XhlHeader };
