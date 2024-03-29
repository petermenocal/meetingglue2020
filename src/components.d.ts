/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppCvbs {
    }
    interface AppForgotPassword {
        "active": any;
        "firebase": any;
        "successMessage": boolean;
        "user": any;
    }
    interface AppHome {
        "active": any;
        "firebase": any;
        "rfps": any[];
        "user": any;
    }
    interface AppHotels {
        "active": any;
        "firebase": any;
        "hotels": any[];
        "user": any;
    }
    interface AppLogin {
        "active": any;
        "firebase": any;
        "formLoginMode": boolean;
        "user": any;
        "userCreation": boolean;
    }
    interface AppPopover {
    }
    interface AppProfile {
        "active": any;
        "deviceUUID": any;
        "fbkey": any;
        "firebase": any;
        "orders": any[];
        "profile": any;
        "sorted": any[];
        "user": any;
    }
    interface AppRfpDetail {
    }
    interface AppRfps {
        "active": any;
        "firebase": any;
        "user": any;
    }
    interface AppRoot {
        "deviceUUID": any;
        "version": string;
    }
    interface MgAccordion {
        "color": string;
        "description": string;
        "hotel": any;
        "label": string;
        "width": string;
    }
    interface RfpDraggable {
        "dropData": any;
        "droppable": any;
    }
    interface RfpDroppable {
        "complete": (ev: any, data: any) => Promise<void>;
    }
    interface RfpNegotiate {
        "active": any;
        "db": any;
        "firebase": any;
        "rfpid": any;
        "user": any;
    }
    interface XhlHeader {
        "active": any;
        "color": string;
        "firebase": any;
        "mode": any;
        "user": any;
    }
    interface XhlHero {
        "buttonColor": string;
        "headline": any;
        "image": any;
        "link": any;
        "linkTitle": any;
        "small": boolean;
        "text": any;
    }
}
declare global {
    interface HTMLAppCvbsElement extends Components.AppCvbs, HTMLStencilElement {
    }
    var HTMLAppCvbsElement: {
        prototype: HTMLAppCvbsElement;
        new (): HTMLAppCvbsElement;
    };
    interface HTMLAppForgotPasswordElement extends Components.AppForgotPassword, HTMLStencilElement {
    }
    var HTMLAppForgotPasswordElement: {
        prototype: HTMLAppForgotPasswordElement;
        new (): HTMLAppForgotPasswordElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppHotelsElement extends Components.AppHotels, HTMLStencilElement {
    }
    var HTMLAppHotelsElement: {
        prototype: HTMLAppHotelsElement;
        new (): HTMLAppHotelsElement;
    };
    interface HTMLAppLoginElement extends Components.AppLogin, HTMLStencilElement {
    }
    var HTMLAppLoginElement: {
        prototype: HTMLAppLoginElement;
        new (): HTMLAppLoginElement;
    };
    interface HTMLAppPopoverElement extends Components.AppPopover, HTMLStencilElement {
    }
    var HTMLAppPopoverElement: {
        prototype: HTMLAppPopoverElement;
        new (): HTMLAppPopoverElement;
    };
    interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {
    }
    var HTMLAppProfileElement: {
        prototype: HTMLAppProfileElement;
        new (): HTMLAppProfileElement;
    };
    interface HTMLAppRfpDetailElement extends Components.AppRfpDetail, HTMLStencilElement {
    }
    var HTMLAppRfpDetailElement: {
        prototype: HTMLAppRfpDetailElement;
        new (): HTMLAppRfpDetailElement;
    };
    interface HTMLAppRfpsElement extends Components.AppRfps, HTMLStencilElement {
    }
    var HTMLAppRfpsElement: {
        prototype: HTMLAppRfpsElement;
        new (): HTMLAppRfpsElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLMgAccordionElement extends Components.MgAccordion, HTMLStencilElement {
    }
    var HTMLMgAccordionElement: {
        prototype: HTMLMgAccordionElement;
        new (): HTMLMgAccordionElement;
    };
    interface HTMLRfpDraggableElement extends Components.RfpDraggable, HTMLStencilElement {
    }
    var HTMLRfpDraggableElement: {
        prototype: HTMLRfpDraggableElement;
        new (): HTMLRfpDraggableElement;
    };
    interface HTMLRfpDroppableElement extends Components.RfpDroppable, HTMLStencilElement {
    }
    var HTMLRfpDroppableElement: {
        prototype: HTMLRfpDroppableElement;
        new (): HTMLRfpDroppableElement;
    };
    interface HTMLRfpNegotiateElement extends Components.RfpNegotiate, HTMLStencilElement {
    }
    var HTMLRfpNegotiateElement: {
        prototype: HTMLRfpNegotiateElement;
        new (): HTMLRfpNegotiateElement;
    };
    interface HTMLXhlHeaderElement extends Components.XhlHeader, HTMLStencilElement {
    }
    var HTMLXhlHeaderElement: {
        prototype: HTMLXhlHeaderElement;
        new (): HTMLXhlHeaderElement;
    };
    interface HTMLXhlHeroElement extends Components.XhlHero, HTMLStencilElement {
    }
    var HTMLXhlHeroElement: {
        prototype: HTMLXhlHeroElement;
        new (): HTMLXhlHeroElement;
    };
    interface HTMLElementTagNameMap {
        "app-cvbs": HTMLAppCvbsElement;
        "app-forgot-password": HTMLAppForgotPasswordElement;
        "app-home": HTMLAppHomeElement;
        "app-hotels": HTMLAppHotelsElement;
        "app-login": HTMLAppLoginElement;
        "app-popover": HTMLAppPopoverElement;
        "app-profile": HTMLAppProfileElement;
        "app-rfp-detail": HTMLAppRfpDetailElement;
        "app-rfps": HTMLAppRfpsElement;
        "app-root": HTMLAppRootElement;
        "mg-accordion": HTMLMgAccordionElement;
        "rfp-draggable": HTMLRfpDraggableElement;
        "rfp-droppable": HTMLRfpDroppableElement;
        "rfp-negotiate": HTMLRfpNegotiateElement;
        "xhl-header": HTMLXhlHeaderElement;
        "xhl-hero": HTMLXhlHeroElement;
    }
}
declare namespace LocalJSX {
    interface AppCvbs {
    }
    interface AppForgotPassword {
        "active"?: any;
        "firebase"?: any;
        "successMessage"?: boolean;
        "user"?: any;
    }
    interface AppHome {
        "active"?: any;
        "firebase"?: any;
        "rfps"?: any[];
        "user"?: any;
    }
    interface AppHotels {
        "active"?: any;
        "firebase"?: any;
        "hotels"?: any[];
        "user"?: any;
    }
    interface AppLogin {
        "active"?: any;
        "firebase"?: any;
        "formLoginMode"?: boolean;
        "user"?: any;
        "userCreation"?: boolean;
    }
    interface AppPopover {
    }
    interface AppProfile {
        "active"?: any;
        "deviceUUID"?: any;
        "fbkey"?: any;
        "firebase"?: any;
        "orders"?: any[];
        "profile"?: any;
        "sorted"?: any[];
        "user"?: any;
    }
    interface AppRfpDetail {
    }
    interface AppRfps {
        "active"?: any;
        "firebase"?: any;
        "user"?: any;
    }
    interface AppRoot {
        "deviceUUID"?: any;
        "version"?: string;
    }
    interface MgAccordion {
        "color"?: string;
        "description"?: string;
        "hotel"?: any;
        "label"?: string;
        "onToggleEv"?: (event: CustomEvent<any>) => void;
        "width"?: string;
    }
    interface RfpDraggable {
        "dropData"?: any;
        "droppable"?: any;
    }
    interface RfpDroppable {
        "onElementDropped"?: (event: CustomEvent<any>) => void;
    }
    interface RfpNegotiate {
        "active"?: any;
        "db"?: any;
        "firebase"?: any;
        "rfpid"?: any;
        "user"?: any;
    }
    interface XhlHeader {
        "active"?: any;
        "color"?: string;
        "firebase"?: any;
        "mode"?: any;
        "user"?: any;
    }
    interface XhlHero {
        "buttonColor"?: string;
        "headline"?: any;
        "image"?: any;
        "link"?: any;
        "linkTitle"?: any;
        "small"?: boolean;
        "text"?: any;
    }
    interface IntrinsicElements {
        "app-cvbs": AppCvbs;
        "app-forgot-password": AppForgotPassword;
        "app-home": AppHome;
        "app-hotels": AppHotels;
        "app-login": AppLogin;
        "app-popover": AppPopover;
        "app-profile": AppProfile;
        "app-rfp-detail": AppRfpDetail;
        "app-rfps": AppRfps;
        "app-root": AppRoot;
        "mg-accordion": MgAccordion;
        "rfp-draggable": RfpDraggable;
        "rfp-droppable": RfpDroppable;
        "rfp-negotiate": RfpNegotiate;
        "xhl-header": XhlHeader;
        "xhl-hero": XhlHero;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-cvbs": LocalJSX.AppCvbs & JSXBase.HTMLAttributes<HTMLAppCvbsElement>;
            "app-forgot-password": LocalJSX.AppForgotPassword & JSXBase.HTMLAttributes<HTMLAppForgotPasswordElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-hotels": LocalJSX.AppHotels & JSXBase.HTMLAttributes<HTMLAppHotelsElement>;
            "app-login": LocalJSX.AppLogin & JSXBase.HTMLAttributes<HTMLAppLoginElement>;
            "app-popover": LocalJSX.AppPopover & JSXBase.HTMLAttributes<HTMLAppPopoverElement>;
            "app-profile": LocalJSX.AppProfile & JSXBase.HTMLAttributes<HTMLAppProfileElement>;
            "app-rfp-detail": LocalJSX.AppRfpDetail & JSXBase.HTMLAttributes<HTMLAppRfpDetailElement>;
            "app-rfps": LocalJSX.AppRfps & JSXBase.HTMLAttributes<HTMLAppRfpsElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "mg-accordion": LocalJSX.MgAccordion & JSXBase.HTMLAttributes<HTMLMgAccordionElement>;
            "rfp-draggable": LocalJSX.RfpDraggable & JSXBase.HTMLAttributes<HTMLRfpDraggableElement>;
            "rfp-droppable": LocalJSX.RfpDroppable & JSXBase.HTMLAttributes<HTMLRfpDroppableElement>;
            "rfp-negotiate": LocalJSX.RfpNegotiate & JSXBase.HTMLAttributes<HTMLRfpNegotiateElement>;
            "xhl-header": LocalJSX.XhlHeader & JSXBase.HTMLAttributes<HTMLXhlHeaderElement>;
            "xhl-hero": LocalJSX.XhlHero & JSXBase.HTMLAttributes<HTMLXhlHeroElement>;
        }
    }
}
