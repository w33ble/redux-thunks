# redux-thunks

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/w33ble/redux-thunks/master/LICENSE)
[![Build Status](https://travis-ci.org/w33ble/redux-thunks.svg?branch=master)](https://travis-ci.org/w33ble/redux-thunks)
[![Coverage](https://img.shields.io/codecov/c/github/w33ble/redux-thunks.svg)](https://codecov.io/gh/w33ble/redux-thunks)
[![npm](https://img.shields.io/npm/v/redux-thunks.svg)](https://www.npmjs.com/package/redux-thunks)
![Project Status](https://img.shields.io/badge/status-experimental-orange.svg)

Simple thunk creator for redux.

This is meant to smooth over the use of [redux-thunk](https://github.com/gaearon/redux-thunk) mixed with the use of [redux-actions](https://github.com/acdlite/redux-actions). 

## Installation

```
$ yarn add redux-thunks
```

or

```
$ npm install --save redux-thunks
```

## Usage

Best used along side `redux-actions`.

### Action definition

```js
import { createAction } from 'redux-actions';
import { createThunk } from 'redux-thunks';

export const setAmount = createAction('SET_AMOUNT');

export const incrementAsync = createThunk('INCREMENT_ASYNC', ({ dispatch, getState }, amount) => {
  doAsyncMath(getState(), amount).then(val => dispatch(setAmount(val)));
});
```

### Use in component/container

```js
dispatch(incrementAsync, 10); // adds 10
```

## API

### createThunk

#### `createThunk('name', { dispatch, [getStore] }, [...args])`

The syntax is very similar to that of `createAction`, and it smooths over the differences by similarly exposing a `toString` method on the thunk creator. 

`createThunk` takes two arguments, a name, and a function to execute when the action is dispatched. The first argument of the function will be an object with `dispatch` and `getState`, as provided by `redux-thunk`. Any additional arguments will be anything specified at the dispatch call site. It's expected that at least one other action will be dispatched from the handler function.

#### License

MIT © [w33ble](https://github.com/w33ble)