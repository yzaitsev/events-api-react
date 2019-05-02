import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { moduleName, signOut } from '../ducks/auth';

// route components 
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import PeoplePage from './routes/PeoplePage';
import EventsPage from './routes/EventsPage';
import ProtectedRoute from './common/ProtectedRoute';




class Root extends Component {  
  static propTypes = {
    // from connect
    signedIn: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
  }



  get btnLogOut() {
    return <button type='button' onClick={this.props.signOut}>log out</button>
  }

  render() {
    const { signedIn } = this.props;
    const btnLogOut = signedIn ? this.btnLogOut : null;

    return (
      <div>
        { btnLogOut }
        <ProtectedRoute path='/admin' component={AdminPage} />
        <ProtectedRoute path='/people' component={PeoplePage} />
        <ProtectedRoute path='/events' component={EventsPage} />
        <Route path='/auth' component={AuthPage} />
      </div>
    );
  }
}

export default connect( state => ({
  signedIn: !!state[moduleName].user
}), { signOut }, null, { pure: false } )(Root);