import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import React from "react";
import PaymentOption from "./PaymentOption";
import Confirmation from "./Confirmation";

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
        borderWidth={1}
        borderColor="gray.400"
        rounded="md"
        overflow="hidden"
      >
        <PaymentOption />
        borderColor='gray.200' rounded='md' overflow='hidden' >
        <Confirmation />
      </Box>
    </Box>
  );
};

export default OtherSteps;
