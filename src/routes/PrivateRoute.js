import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { authContext } from '../context/authContext';
import { replaceURI } from '../helpers/misc';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(authContext);

  const getPage = (props) => {
    if (isAuthenticated()) {
      return <Component {...props} />;
    }
    return replaceURI('AUTH', "/redirects?from='BUYER'");
  };
  return <Route {...rest} render={getPage} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

export default PrivateRoute;
