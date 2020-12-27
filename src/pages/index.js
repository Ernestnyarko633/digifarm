import React from 'react'

const Dashboard = React.lazy(() => import('./Dashboard'))
const FarmBoard = React.lazy(() => import('./FarmBoard'))
const FarmWallet = React.lazy(() => import('./FarmWallet'))
const Marketplace = React.lazy(() => import('./Marketplace'))
const StartFarm = React.lazy(() => import('./StartFarm/index'))
const Individual = React.lazy(() => import('./StartFarm/Individual'))
const Cooperative = React.lazy(() => import('./StartFarm/Cooperative'))
const Forum = React.lazy(() => import('./Forum'))
const NotFound = React.lazy(() => import('./NotFound'))
const Document = React.lazy(()=> import('./Document'))
const Warehouse = React.lazy(()=> import('./Warehouse'))

const Pages = {
  Dashboard,
  FarmBoard,
  FarmWallet,
  Marketplace,
  StartFarm,
  Individual,
  Cooperative,
  Forum,
  NotFound,
  Document,
  Warehouse
}

export default Pages
