import firebase, { appName } from '../config';
import { Record } from 'immutable';
import { replace } from 'connected-react-router';
import { all, take, call, put, cps, takeEvery } from 'redux-saga/effects';


// Module name
export const moduleName = 'auth';
export const prefix = `${appName}/${moduleName}`;

// Actions types
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;

export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;
export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${prefix}/SIGN_OUT_ERROR`;


export const ReducerSchema = Record({
  user: null,
  error: null,
  loading: false,
})


// Reducer
export default function reducer(state = new ReducerSchema(), action) {
  const { type, payload, error } = action;

  switch(type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
        return state.set('loading', true)

    case SIGN_IN_SUCCESS:
      return state.set('loading', false)
                  .set('user', payload.user )
                  .set('error', null);

    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
      return state.set('loading', false)
                  .set('error', error);

    case SIGN_OUT_ERROR:
    case SIGN_OUT_SUCCESS:
      return new ReducerSchema();



    default:
      return state;
  }

}
// action creator
export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  };
}


export const signUpSaga = function* () {
  const auth = firebase.auth();

  while(true) {
    const { payload: {email, password} } = yield take(SIGN_UP_REQUEST); // get all AC and filtred by type

    try {
      const user = yield call([auth,auth.createUserWithEmailAndPassword], email, password);
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })

      yield put(replace('/'))

    } catch(_) {
      yield put({type: SIGN_UP_ERROR})
      yield put(replace('/auth'))
    }
  }
}


export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function* signInSaga() {
  const auth = firebase.auth();
  
  while(true) {
    const { payload: {email, password} } = yield take(SIGN_IN_REQUEST);

    try {
      yield call([auth, auth.signInWithEmailAndPassword], email, password);
      yield call(onAuthChangedSaga);
      yield put(replace('/'));
    } catch(error) {
      yield put({
        type: SIGN_IN_ERROR,
        error
      })
    }

  }

}


export const signOut = (_) => ({
  type: SIGN_OUT_REQUEST
})

export const signOutSaga = function* () {
  const auth = firebase.auth();

  try {
    yield call([auth, auth.signOut]);
    yield put({
      type: SIGN_OUT_SUCCESS
    })

    yield put(replace('/auth'));

  } catch(error) {
    yield put({
      type: SIGN_OUT_ERROR,
      error
    })

    yield put(replace('/auth'));
  }
}


export const onAuthChangedSaga = function* () {
  const auth = firebase.auth();

  try {
    yield cps([auth, auth.onAuthStateChanged])

  } catch(user) {   
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })
  }
}



export const saga = function* () {
  yield all([
    signInSaga(),
    signUpSaga(),
    onAuthChangedSaga(),
    takeEvery(SIGN_OUT_REQUEST, signOutSaga),
  ]);
}

