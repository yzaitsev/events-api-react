import React from 'react';
import { Link } from 'react-router-dom'

const UnAuthorizade = (props) => {
  return <h1>Unauthorized, please <Link to='/auth/signin'>Sign in</Link></h1>;
};

export default UnAuthorizade;