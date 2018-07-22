import User from './user';
import Global from './Global';

const stores = {
  _userStore: initialState => new User(initialState),
  _globalStore: initialState => new Global(initialState),
};

export default (store, initialState) => {
  const storeConstruct = stores[store];
  if (typeof window !== 'undefined') {
    if (!window[store]) {
      window[store] = storeConstruct(initialState);
    }
    return window[store];
  } else {
    return storeConstruct(initialState);
  }
};
