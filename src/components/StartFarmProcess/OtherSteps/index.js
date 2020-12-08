import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import React from "react";
import ChooseAcreage from "../OtherSteps/ChooseAcreage";
import AboutFarmManager from "./AboutFarmManager";

const OtherSteps = () => {
  return (
    <Box>
      <Flex
        align="center"
        justify="center"
        bg="gray.100"
        w="100%"
        h={20}
        mt={20}
      >
        <Heading as="h5" size="md" mr={{ md: 20 }}>
          Roots / Tubers
        </Heading>

        <Flex align="center" justify="space-between">
          <Text px={6}>Ginger</Text>
          <Text px={6}>Chilli pepper</Text>
          <Text px={6}>Tiger nut</Text>
          <Text px={6}>Sweet potato</Text>
          <Text px={6}>Sorghum</Text>
        </Flex>
      </Flex>
      <Box
        mt={{ md: 20 }}
        w="70%"
        mx="auto"
        borderWidth={2}
        borderColor="gray.400"
        rounded="md"
        overflow="hidden"
      >
        <ChooseAcreage />
        <AboutFarmManager />
      </Box>
    </Box>
  );
};

export default OtherSteps;
