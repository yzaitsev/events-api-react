import { appName } from '../config';
import { Record as SchemaRecord, List } from 'immutable';
// saga effects
import { put, call, takeEvery } from 'redux-saga/effects';
// utils
import { generateId } from './utils';

const ReducerState = SchemaRecord({
  entities: new List()
})

const PersonRecord = SchemaRecord({
  id: null,
  firstname: null,
  lastname: null,
  email: null
})


export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;


// Actions Constants Types
export const ADD_PERSON = `${prefix}/ADD_PERSON`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;



// Reducer
export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch(type) {
    case ADD_PERSON: 
      return state.update('entities', entities => entities.push(new PersonRecord(payload)))

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

// Saga generator function hundler
export const addPersonSaga = function* (action) {
  const id = yield call(generateId);

  yield put({
    type: ADD_PERSON,
    payload: { ...action.payload, id }
  })
}

export const saga = function* () {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}