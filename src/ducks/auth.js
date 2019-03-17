import firebase, { appName } from '../config';
import { Record } from 'immutable';
import { all, take, call, put } from 'redux-saga/effects';

// bad code it's temporary
import store from '../redux/store';

// Module name
export const moduleName = 'auth';

// Actions types
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;


const ReducerSchema = Record({
  user: null,
  error: null,
  loading: false,
})


// Reducer
export default function reducer(state = new ReducerSchema(), action) {
  const { type, payload, error } = action;

  switch(type) {
    case SIGN_UP_REQUEST:
      return state.set('loading', true);

    case SIGN_UP_SUCCESS:
      return state.set('loading', false)
                  .set('user', payload.user )
                  .set('error', null);

    case SIGN_UP_ERROR:
      return state.set('loading', false)
                  .set('error', error)

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



export function* signUpSaga() {
  const auth = firebase.auth();

  while(true) {
    const { payload: {email, password} } = yield take(SIGN_UP_REQUEST); // get all AC and filtred by type

    try {
      const user = yield call([auth,auth.createUserWithEmailAndPassword], email, password);
      yield put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    } catch(error) {
      yield put({
        type: SIGN_UP_ERROR,
        error
      })
    }

  }
}


firebase.auth().onAuthStateChanged( user => {
  store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })
})



export function* saga() {
  yield all([
    signUpSaga()
  ]);
}