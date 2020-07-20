import { createStore } from 'redux';

import rootReducer from './modules/cart/reducer';

const store = createStore(rootReducer);

export default store;
