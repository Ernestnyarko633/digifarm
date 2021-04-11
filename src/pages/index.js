import { lazy } from 'react'

const Cooperative = lazy(() => import('./start-farm/cooperative'))
const Individual = lazy(() => import('./start-farm/individual'))
const StartFarm = lazy(() => import('./start-farm/index'))
const Marketplace = lazy(() => import('./market-place'))
const Warehouse = lazy(() => import('./warehouse'))
const FarmWallet = lazy(() => import('./farm-wallet'))
const FarmBoard = lazy(() => import('./farm-board'))
const Dashboard = lazy(() => import('./dashboard'))
const NotFound = lazy(() => import('./not-found'))
const Profile = lazy(() => import('./profile'))
const Logout = lazy(() => import('./logout'))
const Forum = lazy(() => import('./forum'))
const Auth = lazy(() => import('./auth'))
const Farm = lazy(() => import('./farm'))
const Guide = lazy(() => import('./guide'))
const Wallet = lazy(() => import('./wallet'))
const Payment = lazy(() => import('./start-farm/payment'))
const Banner = lazy(() => import('./banner'))

const Pages = {
  Auth,
  Farm,
  Forum,
  Logout,
  Payment,
  Profile,
  NotFound,
  Dashboard,
  FarmBoard,
  StartFarm,
  FarmWallet,
  Individual,
  Marketplace,
  Cooperative,
  Warehouse,
  Guide,
  Banner,
  Wallet
  // Receipt
}

export default Pages
