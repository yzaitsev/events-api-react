import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './reducer';
import history from '../history';

// main rootSaga watchers
import rootSaga from './saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware, logger);

const store = createStore(rootReducer, {}, enhancer);

// dev only!!!
window.store = store;

// running the rootSaga
sagaMiddleware.run(rootSaga)

export default store;