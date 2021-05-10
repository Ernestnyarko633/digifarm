/* eslint-disable */
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import {
  Grid,
  GridItem,
  Heading,
  Image,
  Icon,
  FormControl,
  Input,
} from "@chakra-ui/react";
import Support from "../../Support";
import { Avatar } from "@chakra-ui/avatar";
import { HiLocationMarker } from "react-icons/hi";

const MotionGrid = motion(Grid);
import PropTypes from "prop-types";

const Acreage = ({ farm, order, selectedType }) => {
  return (
    <Box>
      <MotionGrid templateColumns={{ md: "repeat(2, 1fr)" }}>
        <GridItem
          borderRightColor="gray.400"
          borderRightWidth={{ md: 1 }}
          h={{ md: 123 }}
          px={{ base: 6, md: 20, lg: 10 }}
          borderBottomWidth={{ base: 1, md: 0 }}
          py={{ base: 10, md: 6 }}
        >
          <Image src={require("../../../assets/images/invite.png").default} />
          <Box mt={10}>
            <Support />
          </Box>
        </GridItem>

        <GridItem>
          <Flex
            align="center"
            p={{ base: 4, md: 6, lg: 10 }}
            mt={{ base: 6, md: 0 }}
          >
            <Avatar
              src={require("../../../assets/images/user-avatar.png").default}
              size="lg"
            />
            <Box ml={2}>
              <Text fontWeight={700} fontSize={{ md: "xl" }}>
                {selectedType.type}
              </Text>
              <Text mt={-2}>
                Cooperative name: <Text as="span">Name</Text>
              </Text>
            </Box>
          </Flex>

          <Flex
            align={{ md: "center" }}
            justify="space-between"
            borderTopWidth={1}
            borderBottomWidth={1}
            borderColor="gray.200"
            py={6}
            mt={{ base: 2, md: 4 }}
            px={{ base: 4, md: 6, lg: 10 }}
            direction={{ base: "column", md: "row" }}
          >
            <Flex align="center">
              <Avatar src={farm.cropVariety.imageUrl} />
              <Box ml={2}>
                <Heading as="h3" fontSize="xl" textTransform="uppercase">
                  {order?.product?.cropVariety?.crop?.name ||
                    farm?.cropVariety?.crop?.name}
                </Heading>
                <Text fontSize="xs" textColor="gray.500" mt={-1}>
                  (
                  {order?.product?.cropVariety?.name || farm?.cropVariety?.name}
                  ) #{order?.product?.name || farm?.name}
                </Text>
              </Box>
            </Flex>

            <Flex align="center" color="gray.500" mt={{ base: 2, md: 0 }}>
              <Icon as={HiLocationMarker} />
              <Text fontSize="xs">
                {farm?.location.name}, {farm?.location.state}
              </Text>
            </Flex>
          </Flex>

          <Box p={{ base: 4, md: 6, lg: 10 }}>
            <Heading as="h4" fontSize={{ md: "xl" }}>
              Total Number of acres
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Enter the total number of acres you want to farm with your
              cooperative members
            </Text>

            <Box mt={4} mb={2}>
              <Text fontWeight={600}>Total acres</Text>
            </Box>

            <Box>
              <Box bg="gray.100" w="100%" p={2} mb={2}>
                <Text>1 acres = $1500</Text>
              </Box>
              <FormControl>
                <Input
                  placeholder="Eg. 10"
                  _focus={{ borderColor: "cf.800" }}
                />
              </FormControl>
            </Box>
          </Box>
        </GridItem>
      </MotionGrid>
    </Box>
  );
};

Acreage.propTypes = {
  farm: PropTypes.object,
  order: PropTypes.object,
  selectedType: PropTypes.object,
};

export default Acreage;
