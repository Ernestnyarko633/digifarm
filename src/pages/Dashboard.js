import HomeEmptyState from 'components/EmptyStates/HomeEmptyState';
import Greetings from 'components/Utils/Greetings';
import Layout from 'container/Layout';
import React from 'react';

const Dashboard = () => (
  <Layout>
    <Greetings />
    <HomeEmptyState />
  </Layout>
);

export default Dashboard;
