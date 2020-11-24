import React from 'react';

const Dashboard = React.lazy(() => import('./Dashboard'));
const FarmBoard = React.lazy(() => import('./FarmBoard'));
const FarmWallet = React.lazy(() => import('./FarmWallet'));
const Marketplace = React.lazy(() => import('./Marketplace'));
const StartFarm = React.lazy(() => import('./StartFarm/index'));
const StartFarmDetails = React.lazy(() => import('./StartFarm/Details'));
const Forum = React.lazy(() => import('./Forum'));
const NotFound = React.lazy(() => import('./NotFound'));

const Pages = {
  Dashboard,
  FarmBoard,
  FarmWallet,
  Marketplace,
  StartFarm,
  StartFarmDetails,
  Forum,
  NotFound,
};

export default Pages;
