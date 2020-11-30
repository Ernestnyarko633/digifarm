import React from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  Flex,
  ListItem,
  List,
  Avatar,
  Text,
  Image,
  Icon,
} from "@chakra-ui/core";
import { TimeIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { BsCircle, BsQuestionCircleFill } from "react-icons/bs";
import PropTypes from "prop-types";

const FarmCard = ({
  name,
  location,
  image,
  weight,
  bags,
  quantity,
  condition,
  mr,
  ml,
  w,
  h,
  ...rest
}) => {
  return (
    <Box>
      <Flex justify="center">
        <Box
          {...rest}
          boxShadow="0px 0px 15px 5px #ccc"
          rounded={30}
          bg="white"
          w={w || "100%"}
          h={h || "100%"}
          mr={mr}
          ml={ml}
          p={8}
        >
          <Flex mb={4} direction="row" align="center">
            <Avatar bg="gray.100" mr={5}>
              <Image src={image} />
            </Avatar>
            <Box ml={2}>
              <Heading as="h6" fontSize={25}>
                {name || "Task of the day"}
              </Heading>
              <Text fontSize="xs" color="#9b9b9b" mt={{ md: -2 }}>
                {location || "Finish all tasks to earn rewards"}
              </Text>
            </Box>
          </Flex>
          <Divider borderColor="gray.300" />
          <Box>
            <Flex w="100%">
              <Box ml={2} w="100%">
                <Flex direction="row" align="center" justify="space-between">
                  <Flex direction="row" align="center">
                    <TimeIcon mr={2} />
                    <Heading as="h6" fontSize={{ md: "md" }}>
                      {name || "TASK 1"}
                    </Heading>
                  </Flex>
                  <Box>
                    <CheckCircleIcon color="cf.400" />
                  </Box>
                </Flex>
                <Text fontSize="xs" color="#9b9b9b" mt={{ md: -2 }}>
                  {location ||
                    "Update your bank details with the correct information"}
                </Text>
              </Box>
            </Flex>
            <Divider borderColor="gray.300" />
          </Box>
          <Box>
            <Flex>
              <Box ml={2}>
                <Flex direction="row" align="center" justify="space-between">
                  <Flex direction="row" align="center">
                    <TimeIcon mr={2} />
                    <Heading as="h6" fontSize={{ md: "md" }}>
                      {name || "TASK 2"}
                    </Heading>
                  </Flex>
                  <Box>
                    <Icon as={BsCircle} color="cf.400" />
                  </Box>
                </Flex>
                <Text fontSize="xs" mt={{ md: -2 }} color="#9b9b9b">
                  {location ||
                    "Update your bank details with the correct information"}
                </Text>
              </Box>
            </Flex>
            <Divider borderColor="gray.300" />
          </Box>
          <Box>
            <Flex>
              <Box ml={2}>
                <Flex direction="row" align="center" justify="space-between">
                  <Flex direction="row" align="center">
                    <TimeIcon mr={2} />
                    <Heading as="h6" fontSize={{ md: "md" }}>
                      {name || "TASK 3"}
                    </Heading>
                  </Flex>
                  <Box>
                    <Icon as={BsCircle} color="cf.400" />
                  </Box>
                </Flex>
                <Text fontSize="xs" mt={{ md: -2 }} color="#9b9b9b">
                  {location ||
                    "Update your bank details with the correct information"}
                </Text>
              </Box>
            </Flex>
            <Divider borderColor="gray.300" />
            <Flex ml={2} py={3}>
              <Box>
                <Flex direction="row" >
                  <Icon mr={2} mt={1} as={BsQuestionCircleFill} color="cf.400"/>
                  <Flex  direction="column" >
                    <Text fontSize={9} color="cf.400">
                      {location || "Reward: 2 points"}
                    </Text>
                    <Text fontSize={7} color="#9b9b9b">
                      {location || "get 20 points to earn a badge"}
                      <br></br>
                      {"get 20 points to earn a badge"}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

FarmCard.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  buttontitle: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  bags: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  mr: PropTypes.any,
};
export default FarmCard;
