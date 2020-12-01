import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Progress,
  Text,
} from "@chakra-ui/core";
import { Button } from "components";
import Tabs from "components/Tabs/Tabs";
import React from "react";
import AboutFarm from "./AboutFarm";
import FarmDetails from "./FarmDetails";
import FarmImage from "./FarmImage";

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
