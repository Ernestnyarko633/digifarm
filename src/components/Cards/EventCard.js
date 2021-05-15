/* eslint-disable */
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const EventCard = ({ event, onOpen, setSelectedData }) => {
  return (
    <Box
      rounded="xl"
      bgGradient="linear(to-l, #93CF88,#5AA250)"
      px={3}
      py={5}
      color="white"
      maxH={{ md: 48 }}
      h={{ md: 48 }}
      maxW={{ md: 87 }}
      w={{ md: 87 }}
      onClick={() => {
        setSelectedData(event);
        onOpen();
      }}
      cursor="pointer"
    >
      <Flex>
        <Image
          w={{ base: 16, md: 20 }}
          h={{ base: 16, md: 20 }}
          rounded="md"
          bgColor="white"
          src={event.data?.body[0]?.primary?.media?.url}
        />
        <Box ml={2}>
          <Heading as="h5" fontSize={{ md: "md", xl: "xl" }}>
            {event.data.title[0]?.text}
          </Heading>
          <Text fontSize="sm" noOfLines={3}>
            {event.data.summary[0]?.text}
          </Text>

          <Box mt={2}>
            <Text>
              Date{" "}
              <Text as="span" fontWeight={700}>
                {moment(event.data.publishing_date).format("LL")}
              </Text>
            </Text>
            <Text>
              Time{" "}
              <Text as="span" fontWeight={700}>
                {moment.utc(event.data.publishing_date).format("HH:mm")} GMT
              </Text>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

EventCard.propTypes = {
  date: PropTypes.any,
  title: PropTypes.any,
  summary: PropTypes.any,
  image: PropTypes.any,
  onOpen: PropTypes.func,
};
export default EventCard;
