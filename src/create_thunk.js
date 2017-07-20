exports.createThunk = function createThunk(name, fn) {
  const actionCreator = (...args) => (dispatch, getState) => fn({ dispatch, getState }, ...args);

  // mimic redux-actions' .toString() functionality
  actionCreator.toString = () => name.toString();

  return actionCreator;
};
