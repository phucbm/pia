# PiaJS

Leverage the use of `localStorage` and `sessionStorage`.

- Use both `localStorage` or `sessionStorage` depends on your expires setting.
- Accept any value type.

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
Pia.set('key', [1, 2], {expires: 7}); // expired ? => null
Pia.set('key', [1, 2], {expires: 7}); // not expired ? => value object
```

Create an expiring record that only valid in the current browser tab.

```js
Pia.set('key', [1, 2], {expires: 'session'});
```

### Read record

```js
Pia.get('key');
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