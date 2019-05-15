import { spawn } from 'redux-saga/effects';

import { saga as peopleSaga } from '../ducks/people';
import { saga as authSaga } from '../ducks/auth';
import { saga as eventsSaga } from '../ducks/events';
import { saga as channelSaga } from '../ducks/channel';


export default function* rootSaga() {
  yield spawn(peopleSaga);
  yield spawn(authSaga);
  yield spawn(eventsSaga);
  yield spawn(channelSaga);
}