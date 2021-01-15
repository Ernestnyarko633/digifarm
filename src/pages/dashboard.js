import GetStartedNowCard from 'components/Cards/GetStartedNowCard'
import OrdersCard from 'components/Cards/OrdersCard'
import Cooperative from 'components/Cooperative'
import HomeEmptyState from 'components/EmptyStates/HomeEmptyState'
import Greetings from 'components/Utils/Greetings'
import Layout from 'container/Layout'
import React from 'react'

const Dashboard = () => {
  document.title = 'Complete Farmer | Dashboard'

  return (
    <Layout>
      <Greetings />
      <OrdersCard />
      <Cooperative />
      <HomeEmptyState />
      <GetStartedNowCard />
    </Layout>
  )
}

export default Dashboard
