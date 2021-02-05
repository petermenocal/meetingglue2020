var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop } from '@stencil/core';
import _ from 'lodash';
import moment from 'moment';
import JsBarcode from 'jsbarcode';
let AppProfile = class AppProfile {
    constructor() {
        this.orders = [];
        this.sorted = [];
        this.unwindOrder = async (id) => {
            let t = this;
            fetch('/api/order?orderId=' + id)
                .then(data => data.json())
                .then(parsed => (t.orders = [...t.orders, parsed]))
                .then(() => this.sortOrders());
        };
        this.sortOrders = () => {
            let arr = _.orderBy(this.orders, ['charged_on'], ['desc']);
            this.sorted = arr;
        };
        this.componentWillLoad = () => {
            let t = this;
            if (this.user && this.user.email) {
                let ref = this.firebase.default.database().ref('customers').orderByChild('email').equalTo(this.user.email);
                ref.once('value', function (snapshot) {
                    snapshot.forEach(s => {
                        t.profile = s.val();
                        t.fbkey = s.key;
                        t.profile.first_name = _.capitalize(t.profile.first_name);
                        t.profile.last_name = _.capitalize(t.profile.last_name);
                        if (t.profile && t.profile.order_ids) {
                            _.forEach(t.profile.order_ids, o => {
                                t.unwindOrder(o);
                            });
                        }
                    });
                });
            }
        };
        this.componentDidLoad = () => {
            JsBarcode(this.barcode, this.fbkey, {
                fontSize: 15,
                width: 1,
                height: 50,
            });
        };
    }
    render() {
        return (h(Host, null,
            h("slot", null,
                h("xhl-header", { active: this.active, user: this.user, firebase: this.firebase }),
                h("ion-content", null, this.profile && this.profile.email ? (h("ion-card", null,
                    h("ion-card-header", null,
                        h("ion-card-subtitle", null, "Rewards Profile"),
                        h("ion-card-title", null,
                            this.profile.first_name,
                            " ",
                            this.profile.last_name),
                        h("ion-card-subtitle", null, this.profile.email),
                        h("div", { class: "badges" },
                            h("ion-badge", { class: "badge-reward" },
                                this.profile.rewards ? this.profile.rewards : '0',
                                " rewards available"),
                            h("ion-badge", null,
                                this.profile.points ? this.profile.points : '0',
                                " points")),
                        h("div", { class: "badges" },
                            h("ion-chip", { color: "primary", outline: true }, "Earns 2 points per $1")),
                        h("div", { class: "code" },
                            h("img", { id: "barcode", ref: el => (this.barcode = el), class: "barcode" }))),
                    h("ion-card-content", null,
                        h("h3", null, "Order History"),
                        h("ion-list", null, this.sorted.map(o => (h("ion-item", { class: "item" },
                            h("div", { tabindex: "0", class: "order-item" },
                                h("div", { class: "charged_on" }, moment(o.charged_on).format('MM-DD-YYYY')),
                                h("div", null,
                                    h("ion-chip", null,
                                        "$",
                                        (o.total / 100).toFixed(2))))))))))) : (h("ion-spinner", null))))));
    }
};
__decorate([
    Prop()
], AppProfile.prototype, "user", void 0);
__decorate([
    Prop()
], AppProfile.prototype, "firebase", void 0);
__decorate([
    Prop()
], AppProfile.prototype, "deviceUUID", void 0);
__decorate([
    Prop()
], AppProfile.prototype, "active", void 0);
__decorate([
    Prop()
], AppProfile.prototype, "profile", void 0);
__decorate([
    Prop()
], AppProfile.prototype, "orders", void 0);
__decorate([
    Prop()
], AppProfile.prototype, "sorted", void 0);
__decorate([
    Prop()
], AppProfile.prototype, "fbkey", void 0);
AppProfile = __decorate([
    Component({
        tag: 'app-profile',
        styleUrl: 'app-profile.css',
        shadow: true,
    })
], AppProfile);
export { AppProfile };
