# webpack-library-boilerplate

A boilerplate to build JavaScript library with ES6 module and UMD version.

> CSS file will not be included in production build.

## Development guide

1. Update `package.json`
   - `name`: output file name
   - `prettyName`: output library name
   - ...
2. Put your script in `src/_index.js`, do not rename this file.
3. Edit dev site in folder `web`

## Deployment

Run `./web` in live server

```shell
npm run dev
```

Build files from `./src` to `./dist`

```shell
npm run prod
```

Build sources from `./web` to `./build`

```shell
npm run build
```

Build files from `./src` to `./dist` then publish to `npm`

```shell
npm run publish
```