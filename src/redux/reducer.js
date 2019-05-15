import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';
import { reducer as form } from 'redux-form';

import authReducer, { moduleName as authModule } from '../ducks/auth';
import peopleReducer, { moduleName as peopleModule } from '../ducks/people';
import eventReducer, { moduleName as eventsModule } from '../ducks/events';
import channelReducer, { moduleName as channelModule } from '../ducks/channel';

export default combineReducers({
  router: connectRouter(history),
  form,
  // custom reducers
  [authModule] : authReducer,
  [peopleModule] : peopleReducer,
  [eventsModule] : eventReducer,
  [channelModule]: channelReducer
})
