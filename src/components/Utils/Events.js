import React from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/core";
import AnnouncementCard from "../Cards/AnnouncementCard";

const Events = () => {
  return (
    <Box>
      <Flex direction="column" p={3}>
        <Box>
          <Heading as="h6" fontSize={15}>
            EVENTS
          </Heading>
        </Box>
        <Box mb={4}>
          <Text text fontSize="xs" color="#9b9b9b">
            {"Growing conditions are currently perfect."} <br />
            {" Some irrigation work is being performed."}
          </Text>
        </Box>
        <Box>
            <AnnouncementCard/>
        </Box>
      </Flex>
    </Box>
  );
};

export default Events;
