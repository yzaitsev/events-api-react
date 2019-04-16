import firebase from 'firebase'
import { appName } from '../config';
import { Record as SchemaRecord, List } from 'immutable';
// saga effects
import { put, call, takeEvery } from 'redux-saga/effects';
// redux form
import { reset } from 'redux-form';


const ReducerState = SchemaRecord({
  entities: new List()
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



// Reducer
export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch(type) {
    case ADD_PERSON_SUCCESS: 
      return state.update('entities', entities => entities.push(new PersonRecord(payload)))

    default:
      return state;
  }
}

// Action creator
export function addPerson(person) {
  console.log(`--- person: `, person)
  return {
    type: ADD_PERSON_REQUEST,
    payload: person
  }
}

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
    console.log(`----err: `, err)
  } 
}

export const saga = function* () {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}