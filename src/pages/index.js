import { lazy } from 'react'

const Auth = lazy(() => import('./auth'))
const Farm = lazy(() => import('./farm'))
const Forum = lazy(() => import('./forum'))
const Guide = lazy(() => import('./guide'))
const Logout = lazy(() => import('./logout'))
const Wallet = lazy(() => import('./wallet'))
const Profile = lazy(() => import('./profile'))
const NotFound = lazy(() => import('./not-found'))
const Dashboard = lazy(() => import('./dashboard'))
const Warehouse = lazy(() => import('./warehouse'))
const FarmBoard = lazy(() => import('./farm-board'))
const FarmWallet = lazy(() => import('./farm-wallet'))
const Marketplace = lazy(() => import('./market-place'))
const Cooperative_ = lazy(() => import('./cooperative'))
const Payment = lazy(() => import('./start-farm/payment'))
const StartFarm = lazy(() => import('./start-farm/index'))
const CooperativeMain = lazy(() => import('./cooperative-main'))
const CooperativeIntro = lazy(() => import('./cooperativeIntro'))
const CooperativeInvite = lazy(() => import('./cooperative-invite'))
const PaymentPaystack = lazy(() => import('./start-farm/payment-paystack'))
const StartFarmIndividual = lazy(() => import('./start-farm/individual'))
const StartFarmCooperative = lazy(() => import('./start-farm/cooperative'))

const Pages = {
  Auth,
  Farm,
  Forum,
  Guide,
  Wallet,
  Logout,
  Payment,
  Profile,
  NotFound,
  Dashboard,
  FarmBoard,
  StartFarm,
  FarmWallet,
  Marketplace,
  Warehouse,
  Cooperative_,
  PaymentPaystack,
  CooperativeInvite,
  CooperativeIntro,
  CooperativeMain,
  StartFarmIndividual,
  StartFarmCooperative
}

export default Pages
