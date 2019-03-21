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
const enhance = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger)

const store = createStore(rootReducer(history), {}, enhance);

// dev only!!!
window.store = store;

// running the rootSaga
sagaMiddleware.run(rootSaga)

export default store;