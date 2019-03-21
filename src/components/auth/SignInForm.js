import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { validate as emailValidate } from 'email-validator';

import ErrorField from '../common/ErrorField';


class SignInForm extends Component {  
  
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h2>Sign In - вход на сайт</h2>
        <form onSubmit={handleSubmit}>
          <Field name='email' component={ErrorField} />
          <Field name='password' type='password' component={ErrorField} />
          <div>
            <input type='submit'/>
          </div>
        </form>
      </div>
    );
  }
}


const validate = ({email, password}) => {
  const errors = {};

  if (!email) errors.email = 'email is required';
  else if ( !emailValidate(email) ) errors.email = 'invalid email';
  
  if (!password) errors.password = 'password is required';
  else if (password.length < 8) errors.password = 'to short';

  return errors;
}


export default reduxForm({
  form: 'auth',
  validate
})(SignInForm);