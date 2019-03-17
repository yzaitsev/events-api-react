import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp, moduleName } from '../../ducks/auth';

import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import Loader from '../common/Loader';



class AuthPage extends Component {
  
  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Auth page</h1>  
        <NavLink to='/auth/signin' activeStyle={{clolr: 'red'}} style={styleLink}>sign in</NavLink>
        <NavLink to='/auth/signup' activeStyle={{clolr: 'red'}} style={styleLink}>sign up</NavLink>
        <Route path='/auth/signin' render={ () => <SignInForm onSubmit={this.handleSignIn} /> } />
        <Route path='/auth/signup' render={ () => <SignUpForm onSubmit={this.handleSignUp} /> } /> 
        { loading && <Loader /> }
      </div>
    );
  }

  handleSignIn = ({email, password}) => console.log('------------------- values: ', email, password)
  handleSignUp = ({email, password}) => this.props.signUp(email, password)
}


export default connect(state => ({
  loading: state[moduleName].loading
}), { signUp })(AuthPage);


const styleLink = {
  fontSize: '20px',
  display: 'inline-block',
  marginRight: '10px'
}