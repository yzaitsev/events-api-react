import axios from 'axios';
import firebase from '../config';
import { fork, spawn, take, put, call, cancel, cancelled } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { appName } from '../config';


/**
 * Constants
 */
export const moduleName = 'channel';
export const prefix = `${appName}/${moduleName}`;

export const TIMEOUT_RUN = `${prefix}/TIMEOUT_RUN`;
export const TIMEOUT_CANCEL = `${prefix}/TIMEOUT_CANCEL`;

export const UPLOAD_FILE = `${prefix}/UPLOAD_FILE`;
export const UPLOAD_FILE_SUCCESS = `${prefix}/UPLOAD_FILE_SUCCESS`;
export const UPLOAD_FILE_ERROR = `${prefix}/UPLOAD_FILE_ERROR`;


/**
 * Reducer
 */



 export default function reducer(state = {}, action) {
  const { type, payload } = action;

  switch(type) {

    default:
      return state;
  }
 }



 /**
  * Actions
  */

export const timeoutRun = () => ({ type: TIMEOUT_RUN })
export const timeoutCancel = () => ({ type: TIMEOUT_CANCEL })

export const uploadFile = (file) => ({ type: UPLOAD_FILE, payload: file })





  /**
   * Sagas
   */

  // BTNChannels
  const btnChannelSocket = () => eventChannel(emmit => {
    let count = 1;
    const timeId = setInterval(() => {
      count++;
      emmit(count);
    }, 1000);

    return () => clearTimeout(timeId)
  });



  const btnChannelWrap = function* () {
    const chan = btnChannelSocket()

    try {
      while (true) {
        const data = yield take(chan);
        console.log(`------- chan data: `, data)
      }
    }
    finally {
      if (yield cancelled(chan)) {
        chan.close()
        console.log(`---- channel canceled`)
      }
    }
  } 


  const btnChannelSaga = function* () {
    let task;

    while(true) {
      yield take(TIMEOUT_RUN);
      task = yield fork(btnChannelWrap);

      yield take(TIMEOUT_CANCEL);
      if (task) yield cancel(task)
    }
  }

// ./ BTNChannels





export const saga = function* () {
  yield spawn(btnChannelSaga);
}