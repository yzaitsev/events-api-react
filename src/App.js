import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store from './redux';
import history from './history';
import './config';
import Root from './components/Root';
import './mocks';
import 'react-virtualized/styles.css';

class App extends Component {
  
  
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Root />
        </ConnectedRouter>
      </Provider>

    );
  }
}


export default App;