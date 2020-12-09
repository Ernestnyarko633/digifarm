import React from "react";
import Layout from "container/Layout";
import FarmsEmptyState from "components/EmptyStates/FarmsEmptyState";
import Greetings from "components/Utils/FarmBoardGreetings";

const FarmBoard = ({}) => {
  return (
    <Layout showRightSideContentType="events">
      <Greetings />
      <FarmsEmptyState />
    </Layout>
  );
};
export default FarmBoard;
