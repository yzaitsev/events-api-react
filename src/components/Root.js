import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { moduleName, signOut } from '../ducks/auth';

// route components 
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import PeoplePage from './routes/PeoplePage';
import EventsPage from './routes/EventsPage';
import ChannelPage from './routes/channel-page';
import ProtectedRoute from './common/ProtectedRoute';

import CustomDragLayer from './custom-drag-layer';


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
        <ul>
          <li><Link to='/admin'>admin</Link></li>
          <li><Link to='/people'>people</Link></li>
          <li><Link to='/events'>events</Link></li>
          <li><Link to='/channel'>channel</Link></li>
        </ul>
        <ProtectedRoute path='/admin' component={AdminPage} />
        <ProtectedRoute path='/people' component={PeoplePage} />
        <ProtectedRoute path='/events' component={EventsPage} />
        <ProtectedRoute path='/channel' component={ChannelPage} />
        <Route path='/auth' component={AuthPage} />
        <CustomDragLayer />
      </div>
    );
  }
}

export default connect( state => ({
  signedIn: !!state[moduleName].user
}), { signOut }, null, { pure: false } )(Root);