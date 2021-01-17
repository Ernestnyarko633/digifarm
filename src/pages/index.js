import React from 'react'

const Cooperative = React.lazy(() => import('./start-farm/cooperative'))
const Individual = React.lazy(() => import('./start-farm/individual'))
const StartFarm = React.lazy(() => import('./start-farm/index'))
const Marketplace = React.lazy(() => import('./market-place'))
const FarmWallet = React.lazy(() => import('./farm-wallet'))
const FarmBoard = React.lazy(() => import('./farm-board'))
const Dashboard = React.lazy(() => import('./dashboard'))
const Warehouse = React.lazy(() => import('./warehouse'))
const NotFound = React.lazy(() => import('./not-found'))
const Document = React.lazy(() => import('./document'))
const Profile = React.lazy(() => import('./profile'))
const Logout = React.lazy(() => import('./logout'))
const Forum = React.lazy(() => import('./forum'))
const Auth = React.lazy(() => import('./auth'))

const Pages = {
  Auth,
  Forum,
  Logout,
  Profile,
  NotFound,
  Document,
  Dashboard,
  FarmBoard,
  StartFarm,
  Warehouse,
  FarmWallet,
  Individual,
  Marketplace,
  Cooperative
}

export default Pages
