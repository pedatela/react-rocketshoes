import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'

const sagaMiddleware = createSagaMiddleware();
const enhancer = process.env.NODE_ENV === 'DEVELOPMENT' ? applyMiddleware(sagaMiddleware) : applyMiddleware(sagaMiddleware)
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga)

export default store;