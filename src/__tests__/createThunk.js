import test from 'ava';
import { createThunk } from '../../';

let thunkObj;
const store = {};

test.beforeEach(() => {
  thunkObj = {
    dispatch: () => 'action dispatcher',
    getState: () => 'state',
  };

  // mock dispatch function
  store.dispatch = (action, ...args) => {
    const output = action(...args);
    if (typeof output === 'function') return output(thunkObj.dispatch, thunkObj.getState);
    return output;
  };
});

test('exports a creator function', (t) => {
  const output = createThunk('name', () => {});
  t.true(typeof output === 'function');
});

test('creator function has toString method', (t) => {
  const name = 'some super fancy name';
  const output = createThunk(name, () => {});
  t.true(typeof output.toString === 'function');
  t.true(output.toString() === name);
  t.true(String(output) === name); // check native casting as well
});

test('creator returns a thunk', (t) => {
  const output = createThunk('name', () => {});
  const dispatched = output('some', 'args');
  t.true(typeof dispatched === 'function');
});

test('handler function gets dispatch and getState', (t) => {
  t.plan(2);

  const handler = ({ dispatch, getState }) => {
    t.is(dispatch, thunkObj.dispatch);
    t.is(getState, thunkObj.getState);
  };

  const action = createThunk('name', handler);
  store.dispatch(action);
});

test('handler function gets action type', (t) => {
  t.plan(1);

  const actionType = 'TYPE_NAME';

  const handler = ({ type }) => {
    t.is(type, actionType);
  };

  const action = createThunk(actionType, handler);
  store.dispatch(action);
});

test('handler function gets dispatcher arguments', (t) => {
  t.plan(4);

  const handler = ({ dispatch, getState }, h, w) => {
    t.is(dispatch, thunkObj.dispatch);
    t.is(getState, thunkObj.getState);
    t.is(h, 'hello');
    t.is(w, 'world');
  };

  const action = createThunk('name', handler);
  store.dispatch(action, 'hello', 'world');
});
