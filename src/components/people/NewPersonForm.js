import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import ErrorField from '../common/ErrorField';
import { validate as emailValidate } from 'email-validator';



class NewPersonForm extends Component {
  
  
  render() {
    const { handleSubmit } = this.props;
    
    return (
      <div>
        <form onSubmit={handleSubmit} >
          <Field name='firstname' component={ErrorField} />
          <Field name='lastname' component={ErrorField} />
          <Field name='email' component={ErrorField} />
          <input type='submit' />
        </form>
      </div>
    );
  }
}

const validate = ({firstname, lastname, email}) => {
  const errors = {};
  
  if (!firstname) errors.firstname = 'Name is required';
  else if (firstname.length < 5) errors.firstname = 'Name is too short'; 

  if (!lastname) errors.lastname = 'Lastname is required';
  else if (lastname.length < 5) errors.lastname = 'Lastname is too short';
  
  if (!email) errors.email = 'Email is required';
  else if ( !emailValidate(email) ) errors.email = 'Email is invalid';

  return errors;
}


export default reduxForm({
  form: 'person',
  validate
})(NewPersonForm);