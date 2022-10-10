# PiaJS

[![release](https://badgen.net/github/release/viivue/pia/)](https://github.com/viivue/pia/releases/latest)
[![minified](https://badgen.net/badge/minified/2KB/cyan)](https://www.jsdelivr.com/package/gh/viivue/pia)
[![jsdelivr](https://data.jsdelivr.com/v1/package/gh/viivue/pia/badge?style=rounded)](https://www.jsdelivr.com/package/gh/viivue/pia)

> A simple, lightweight JavaScript API for handling browser storage

- Automatically switch between `localStorage` and `sessionStorage` depends on your expires setting
- Accepts any value type
- No dependency

## Cookies vs. Local Storage vs. Session Storage

|                        | Cookies            | Local Storage                     | Session Storage | 
|------------------------|--------------------|-----------------------------------|-----------------|
| **Capacity**           | 4kb                | 10mb                              | 5mb             |
| **Accessible from**    | Any window         | Any window                        | Same tab        |
| **Expires**            | Manually set       | Never (_Manually set with PiaJS_) | On tab close    |
| **Storage location**   | Browser and server | Browser only                      | Browser only    |
| **Sent with requests** | Yes                | No                                | No              |

## Usage

### Create record

Create a record, valid across the entire browser.

```js
Pia.set('key', 1); // number
Pia.set('key', [1, 2]); // array
Pia.set('key', "string"); // string
Pia.set('key', {value: "123"}); // object
Pia.set('key', true); // boolean
```

Unlike normal `localStorage` or `sessionStorage`, PiaJS uses `JSON.stringify()` to convert the value to string, so it
would accept
any type of value.

### Set expires

Create a record that expires 7 days from now.

```js
Pia.set('key', [1, 2], {expires: 7});
```

Create an expiring record that only valid in the current browser tab.

```js
Pia.set('key', [1, 2], {expires: 'session'});
```

### Read record

```js
Pia.get('key');
Pia.get('key', true); // => full value object
Pia.get('nothing'); // => null
```

### Delete record

```js
Pia.remove('key');
```

## Deployment

Run `./web` in live server

```shell
npm run dev
```

Build files from `./src` to `./dist`

```shell
npm run prod
```

<!---
Build sources from `./web` to `./build`

```shell
npm run build
```

Build files from `./src` to `./dist` then publish to `npm`

```shell
npm run publish
```
--->