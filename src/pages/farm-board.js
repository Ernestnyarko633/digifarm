import React from 'react';
import Layout from 'container/Layout';
import Greetings from 'components/Utils/FarmBoardGreetings';
import FarmBoardContent from 'components/FarmBoard/FarmBoard';
import GetStartedNowCard from 'components/Cards/GetStartedNowCard';

const FarmBoard = () => {
  document.title = 'Complete Farmer | Farmboard';
  return (
    <Layout showRightSideContentType='events'>
      <Greetings />
      {false && <GetStartedNowCard />}
      <FarmBoardContent />
    </Layout>
  );
};
export default FarmBoard;
