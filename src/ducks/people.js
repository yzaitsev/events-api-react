import firebase from 'firebase'
import { appName } from '../config';
import { Record as SchemaRecord, OrderedMap } from 'immutable';
import { fbDatatoEntities } from './utils';
import { createSelector } from 'reselect'
// saga effects
import {put, call, take, takeEvery, all, select, fork, spawn, cancel, cancelled, race} from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
// redux form
import { reset } from 'redux-form';


const ReducerState = SchemaRecord({
  entities: new OrderedMap()
})

const PersonRecord = SchemaRecord({
  uid: null,
  firstname: null,
  lastname: null,
  email: null,
  events: []
})


export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;


// Actions Constants Types
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`;
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`;

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;
export const FETCH_ALL_ERROR = `${prefix}/FETCH_ALL_ERROR`;

export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`


// Reducer
export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch(type) {
    case ADD_PERSON_SUCCESS: 
      return state.setIn(['entities', payload.uid], PersonRecord(payload))

    case FETCH_ALL_SUCCESS:
      return state.set('entities', fbDatatoEntities(payload, PersonRecord))

    case ADD_EVENT_SUCCESS:
      return state.setIn(['entities', payload.personUid, 'events'], payload.events)

    default:
      return state;
  }
}

// Action creator
export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: person
  }
}


export function fetchAll() {
  return {
    type: FETCH_ALL_REQUEST
  }
}


export function addEventToPerson(eventUid, personUid) {
  return {
    type: ADD_EVENT_REQUEST,
    payload: { eventUid, personUid }
  }
}




/**
 * Selectors
 */

export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const peopleListSelector = createSelector(
  entitiesSelector,
  entities => entities.valueSeq().toArray()
)
export const idSelector = (_, props) => props.uid
export const personSelector = createSelector(entitiesSelector, idSelector, (entitties, id) => entitties.get(id))




// Saga generator function hundler
export const addPersonSaga = function* (action) {
  const peopleRef = firebase.database().ref('/people');
  try {
    const ref = yield call([peopleRef, peopleRef.push], action.payload);
    yield put({
      type: ADD_PERSON_SUCCESS,
      payload: { ...action.payload, uid: ref.key }
    });

    yield put(reset('person'));
  } catch(err) {
    yield put({
      type: ADD_PERSON_ERROR,
      err
    })
  } 
}

export const fetchAllSaga = function* (action) {
  const peopleRef = firebase.database().ref('/people')
  
  try {
    const data = yield call([peopleRef, peopleRef.once], 'value');
    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    })
  } catch(err) {

  }
}


export const addEventSaga = function* ({ payload: { eventUid, personUid } }) {
  const eventsRef = firebase.database().ref(`people/${personUid}/events`)
  const state = yield select(stateSelector)
  const events = state.getIn(['entities', personUid, 'events']).concat(eventUid);

  try {
    yield call([eventsRef, eventsRef.set], events)
    yield put({
        type: ADD_EVENT_SUCCESS,
        payload: {
            personUid,
            events
        }
    })
  } catch (_) {
  }
}


export const backgroundSyncSaga = function * () {
  try {
      while (true) {
          yield call(fetchAllSaga)
          yield delay(2000)
      }
  } finally {
      if (yield  cancelled()) {
          console.log('---', 'cancelled sync saga')
      }
  }
}

  /*
    const task = yield fork(backgroundSyncSaga)
    yield delay(6000)
    yield cancel(task)
  */

// Channel example
export const cancellableSync = function * () {
  let task;

  while(true) {
    const { payload } = yield take('@@router/LOCATION_CHANGE');

    if (payload && payload.pathname && payload.pathname.includes('people')) {
      task = yield fork(realtimeSync);

    } else if (task) {
      yield cancel(task)
    }
  }
}

const createPeopleSocket = () => eventChannel(emmit => {
  const ref = firebase.database().ref('people')
  const callback = (data) => emmit({ data })
  ref.on('value', callback)

  return () => {
    console.log('---', 'unsubscribing')
    ref.off('value', callback)
  }
})


export const realtimeSync = function * () {
  const chan = yield call(createPeopleSocket)
  try {
      while (true) {
          const {data} = yield take(chan)

          yield put({
              type: FETCH_ALL_SUCCESS,
              payload: data.val()
          })
      }
  } finally {
      yield call([chan, chan.close])
      console.log('---', 'cancelled realtime saga')
  }
}







export const saga = function* () {
  yield spawn(cancellableSync);
  yield all([
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    yield takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    yield takeEvery(ADD_EVENT_REQUEST, addEventSaga)
  ])
}

