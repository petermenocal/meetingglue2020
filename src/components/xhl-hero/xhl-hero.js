var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, Prop, Host, getAssetPath } from '@stencil/core';
let XhlHero = class XhlHero {
    constructor() {
        this.small = false;
        this.buttonColor = 'primary';
    }
    render() {
        return (h(Host, null,
            h("slot", null,
                h("div", null,
                    h("ion-grid", { class: "text" },
                        h("ion-col", null,
                            h("ion-row", null,
                                h("ion-text", { class: "headline" }, this.headline)),
                            h("ion-row", null,
                                h("ion-text", { class: "caption" }, this.text)),
                            h("ion-row", null,
                                h("a", { href: this.link }, this.linkTitle)))),
                    h("ion-img", { class: this.small ? 'image-small' : 'image', src: getAssetPath(`./assets/${this.image}`) })))));
    }
};
__decorate([
    Prop()
], XhlHero.prototype, "headline", void 0);
__decorate([
    Prop()
], XhlHero.prototype, "text", void 0);
__decorate([
    Prop()
], XhlHero.prototype, "link", void 0);
__decorate([
    Prop()
], XhlHero.prototype, "linkTitle", void 0);
__decorate([
    Prop()
], XhlHero.prototype, "image", void 0);
__decorate([
    Prop()
], XhlHero.prototype, "small", void 0);
__decorate([
    Prop()
], XhlHero.prototype, "buttonColor", void 0);
XhlHero = __decorate([
    Component({
        tag: 'xhl-hero',
        styleUrl: 'xhl-hero.css',
        shadow: true,
        assetsDirs: ['assets'],
    })
], XhlHero);
export { XhlHero };
