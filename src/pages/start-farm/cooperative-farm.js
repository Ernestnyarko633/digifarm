/* eslint-disable */
import React from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import useStartFarm from "context/start-farm";
import CropSelection from "components/StartFarmProcess/CropSelection";
import OtherSteps from "components/StartFarmProcess/OtherSteps";
import Header from "../../container/Header";
import CooperativeSteps from "../../components/StartFarmProcess/CooperativeSteps";

const CooperativeFarm = ({ location, history }) => {
  document.title = "Complete Farmer | Cooperative";

  const { selected } = location || {};
  const { step } = useStartFarm();

  const getContent = (value) => {
    switch (value) {
      case 0:
        return <CropSelection />;
      case 1:
        return <CooperativeSteps data={selected} history={history} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Header />
      <Box as="main" mt={{ base: 14, md: 20, xl: 24 }}>
        {getContent(step)}
      </Box>
    </Box>
  );
};

CooperativeFarm.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default CooperativeFarm;
