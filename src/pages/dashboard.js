import React from 'react';
import Layout from 'container/Layout';

import useApi from 'context/api';
import useFetch from 'hooks/useFetch';

import FetchCard from 'components/FetchCard';
import GetStartedNowCard from 'components/Cards/GetStartedNowCard';
import FarmOrderSection from 'components/Dashboard/FarmOrderSection';
import HomeEmptyState from 'components/EmptyStates/HomeEmptyState';
import Greetings from 'components/Utils/Greetings';

const Dashboard = () => {
  document.title = 'Complete Farmer | Dashboard';

  const [reloadMyFarms, setReloadMyFarms] = React.useState(0);
  const [reloadMyOrders, setReloadMyOrders] = React.useState(0);

  const { getMyFarms, getMyOrders } = useApi();

  const triggerReloadMyFarms = () =>
    setReloadMyFarms((prevState) => prevState + 1);

  const triggerReloadMyOrders = () =>
    setReloadMyOrders((prevState) => prevState + 1);

  const {
    data: myFarms,
    isLoading: myFarmsIsLoading,
    error: myFarmsHasError,
  } = useFetch('my_farms', getMyFarms, reloadMyFarms);

  const {
    data: myOrder,
    isLoading: myOrdersIsLoading,
    error: myOrdersHasError,
  } = useFetch('my_orders', getMyOrders, reloadMyOrders);

  const isLoading = myFarmsIsLoading || myOrdersIsLoading;
  const hasError = myFarmsHasError || myOrdersHasError;

  return (
    <Layout>
      <Greetings />
      {isLoading || hasError ? (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          mx='auto'
          w={90}
          reload={() => {
            !myFarms?.length && triggerReloadMyFarms();
            !myOrder?.length && triggerReloadMyOrders();
          }}
          loading={isLoading}
          error={hasError}
        />
      ) : myFarms?.length && myOrder?.length ? (
        <FarmOrderSection farms={myFarms} orders={myOrder} />
      ) : (
        <HomeEmptyState />
      )}
      <GetStartedNowCard />
    </Layout>
  );
};

export default Dashboard;
