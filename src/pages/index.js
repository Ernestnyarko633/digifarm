import { lazy } from 'react'

const Cooperative = lazy(() => import('./start-farm/cooperative'))
const Individual = lazy(() => import('./start-farm/individual'))
const StartFarm = lazy(() => import('./start-farm/index'))
const Marketplace = lazy(() => import('./market-place'))
const FarmWallet = lazy(() => import('./farm-wallet'))
const FarmBoard = lazy(() => import('./farm-board'))
const Dashboard = lazy(() => import('./dashboard'))
const NotFound = lazy(() => import('./not-found'))
const Document = lazy(() => import('./document'))
const Profile = lazy(() => import('./profile'))
const Logout = lazy(() => import('./logout'))
const Forum = lazy(() => import('./forum'))
const Auth = lazy(() => import('./auth'))
const Farm = lazy(() => import('./farm'))

const Pages = {
  Auth,
  Farm,
  Forum,
  Logout,
  Profile,
  NotFound,
  Document,
  Dashboard,
  FarmBoard,
  StartFarm,
  FarmWallet,
  Individual,
  Marketplace,
  Cooperative
}

export default Pages
