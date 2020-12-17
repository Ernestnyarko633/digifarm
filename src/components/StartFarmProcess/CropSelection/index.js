import {
  Box,
  Heading,
} from "@chakra-ui/core";
import Tabs from "components/Tabs/Tabs";
import React from "react";
import FarmDetails from "./FarmDetails";

const CropSelection = ({ handleNext }) => {
  const [activeKey, setActiveKey] = React.useState(0);

  return (
    <Box mt={{ md: 48 }} w="90%" mx="auto">
      <Box textAlign="center" mb={10}>
        <Heading as="h4" size="xl">
          Which Farm is right for you.
        </Heading>
      </Box>

      <Box>
        <Tabs>
          <Box label="Top-selling farm">
            <FarmDetails handleNext={handleNext} />
          </Box>
          <Box label="Grains & Cereals">
            <FarmDetails handleNext={handleNext} />
          </Box>
          <Box label="Roots & Tubers">
            <FarmDetails handleNext={handleNext} />
          </Box>
          <Box label="Vegetables & Spices">
            <FarmDetails handleNext={handleNext} />
          </Box>
        </Tabs>
      </Box>
    </Box>
  );
};

export default CropSelection;
