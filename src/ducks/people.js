import firebase from 'firebase'
import { appName } from '../config';
import { Record as SchemaRecord, OrderedMap } from 'immutable';
import { fbDatatoEntities } from './utils';
import { createSelector } from 'reselect'
// saga effects
import { put, call, takeEvery, all } from 'redux-saga/effects';
// redux form
import { reset } from 'redux-form';


const ReducerState = SchemaRecord({
  entities: new OrderedMap()
})

const PersonRecord = SchemaRecord({
  uid: null,
  firstname: null,
  lastname: null,
  email: null
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



// Reducer
export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch(type) {
    case ADD_PERSON_SUCCESS: 
      return state.seIn(['entities', payload.uid], PersonRecord(payload))

    case FETCH_ALL_SUCCESS:
      return state.set('entities', fbDatatoEntities(payload, PersonRecord))

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


/**
 * Selectors
 */

export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const peopleListSelector = createSelector(
  entitiesSelector,
  entities => entities.valueSeq().toArray()
)


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

export const saga = function* () {
  yield all([
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    yield takeEvery(FETCH_ALL_REQUEST, fetchAllSaga)
  ])
}

