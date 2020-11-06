import React from 'react';

const Dashboard = React.lazy(() => import('./Dashboard'));
const NotFound = React.lazy(() => import('./NotFound'));

const Pages = {
  Dashboard,
  NotFound,
};

export default Pages;
