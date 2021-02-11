# coffee-notes

Web application for tracking information about batches of coffee you've brewed.  Enter data such as batch size, amount of grounds, which bean, etc.  Update and add a rating or a note.  Look back on your data with a multidimensional scatterplot or an aggregated bar chart.

The app is a PWA (Progressive Web App), so it can be installed to your mobile homescreen or pc desktop and accessed offline.

Uses a normalized Vuex store, aided by vuex-orm. Data is persisted to your local browser's IndexedDB (or localstorage fallback), courtesy of vuex-orm-localforage.

Charts are generated using the Vega-Lite visualization grammar. The chart specifications can be tweaked via UI controls, so you can choose which axis represents which dimension of your batches.

To explore the charts without adding data, use the Debug page to add some fake data and get a feel for the app, deleting the fake data when you are done.


## Build Setup
(built-in nuxt docs)

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
