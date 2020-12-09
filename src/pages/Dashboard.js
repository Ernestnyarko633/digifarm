import GetStartedNowCard from 'components/Cards/GetStartedNowCard'
import OrdersCard from 'components/Cards/OrdersCard'
import HomeEmptyState from 'components/EmptyStates/HomeEmptyState'
import Greetings from 'components/Utils/Greetings'
import Layout from 'container/Layout'
import React from 'react'

const Dashboard = () => (
  <Layout>
    <Greetings />
    <OrdersCard />
    <HomeEmptyState />
    <GetStartedNowCard />
  </Layout>
)

export default Dashboard
