import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { replaceURI } from '../helpers/misc';
import useAuth from 'context/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  const getPage = (props) => {
    if (isAuthenticated()) {
      return <Component {...props} />;
    }
    return replaceURI('AUTH', "/redirects?from='DIGITAL_FARMER'");
  };
  return <Route {...rest} render={getPage} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

export default PrivateRoute;
