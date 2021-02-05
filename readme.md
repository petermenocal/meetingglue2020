# Exhale Brands Website

![build](https://github.com/petermenocal/exhalebrandswww/workflows/Deploy%20to%20Firebase%20Hosting%20on%20merge/badge.svg?branch=master)

Public facing website for Las Vegas dispensary Exhale.

Located at [exhalebrands.com](https://exhalebrands.com)

## Features

- `@ionic/core` for the UI.
- Stencil for the application logic and routing
- Push Notifications setup
- Unit Tests
- Pre-rendering
- Lazy-loading and code splitting
- Intelligent Polyfills
- Modern mode: ES6/ESM for new browser, ES5 for older
- Service Worker, App manifest, iOS meta tags
- Theming using CSS variables

## Production

To build for production, run:

```bash
npm run build
```

A production build includes:

- Minified code bundles
- Generated Service workers
- App manifest

## Hosting

[Firebase Hosting](https://firebase.google.com/docs/hosting/).

## H2 Push

We recommend setting up HTTP2 Push on Firebase. H2 Push may sound complicated, but it's actually a simple concept. To learn about it, take a look at this [article](https://en.wikipedia.org/wiki/HTTP/2_Server_Push).

To set this up for `my-app`:

- Do a production build of the app: `npm run build`
- Serve your WWW folder locally using a local http server and open in your browser.
  - https://www.npmjs.com/package/http-server works pretty well for this. You can serve your www folder by running `http-server www`.
- Open the DevTools and look at the network tab.
  - Reload the page and you should see all of your files show up in the network tab. Excluding the `sw.js` file, these are the files you want to H2 push.
- List these files in the link headers of your firebase.json file. For a syntax reference, review this [article](https://w3c.github.io/preload/#server-push-http-2)

## Service Workers

Service workers are generated via the Stencil build tool. For more information on how they can be configured, see the [Service Worker docs](https://stenciljs.com/docs/service-workers).

## Developing with a Service Worker

For most cases, you'll want to develop your app without generating a Service Worker. But if you'd like to test out Web Push Notifications or Background Sync, you'll need to have one generated. To generate a Service Worker during dev builds, we've added the npm script:

```
npm run start.sw
```

This will start a dev build and generate a Service Worker as well.

## Unit Tests

To run the unit tests once, run:

```bash
npm test
```

To run the unit tests and watch for file changes during development, run:

```bash
npm run test.watch
```

## Testing your PWA's performance

We recommend using https://www.webpagetest.org/easy with the `Run Lighthouse Audit` option turned on.
This will give you an in depth look into your app's load performance on the average device connected to the average network.
For more info on how to use webpagetest check out [this article](https://zoompf.com/blog/2015/07/the-seo-experts-guide-to-web-performance-using-webpagetest-2)