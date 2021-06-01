/* eslint-disable */
import React, {useEffect} from "react";
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
import useStartFarm from "context/start-farm";
import AcreageInput from "../OtherSteps/AcreageInput";
import { FormInput } from "../../Form";
import CooperativeMemberCard from "../../Cards/CooperativeMemberCard";
import useAuth from "context/auth";

const Acreage = ({ farm, order, selectedType, name }) => {
  const { setAdminAcres, cooperativeName, adminAcres, acreage, coopImg, setCooperativeName } = useStartFarm();
  const handleChange = (e) => {
    setAdminAcres(e.target.value);
  };

    const {isAuthenticated} = useAuth()
    const {user} = isAuthenticated()

  useEffect(() => {
    let mounted = true 
    if(!cooperativeName && mounted)return setCooperativeName(`${user?.lastName}'s Cooperative`)

    return () => (mounted = false)
  }, [cooperativeName])

  
  return (
    <MotionGrid templateColumns={{ md: "repeat(2, 1fr)" }}>
      <GridItem
        borderRightColor="gray.400"
        borderRightWidth={{ md: 1 }}
        h={{ md: 123 }}
        px={{ base: 6, md: 20, lg: 10 }}
        borderBottomWidth={{ base: 1, md: 0 }}
        py={{ base: 10, md: 6 }}
      >
        <Image
          w="100%"
          src={require("../../../assets/images/invite.png").default}
        />
        <Box mt={10}>
          <Support />
        </Box>
      </GridItem>

      <GridItem
        mt={{ base: 6, md: 0 }}
        overflowY="scroll"
        css={{
          direction: "rtl",
          scrollbarColor: "rebeccapurple",
          scrollBehavior: "smooth",
        }}
      >
        <Box css={{ direction: "ltr" }} p={{ base: 4, md: 6, lg: 10 }}>
          <Flex align="center" justify="space-between">
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
            <Flex align="center">
              <Avatar
                src={
                  coopImg
                    ? URL.createObjectURL(coopImg)
                    : require("../../../assets/images/user-avatar.png").default
                }
                size="lg"
              />
              <Box ml={2}>
                <Text fontWeight={700} fontSize={{ md: "xl" }}>
                  {selectedType?.type}
                </Text>
                <Text mt={-2}>
                  Cooperative name: <Text as="span">{name}</Text>
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Flex
            align={{ md: "center" }}
            justify="space-between"
            borderTopWidth={1}
            borderBottomWidth={1}
            borderColor="gray.200"
            py={3}
            mt={{ base: 2, md: 4 }}
            direction={{ base: "column", md: "row" }}
          >
            <Flex align="center" color="gray.500" mt={{ base: 2, md: 0 }}>
              <Icon as={HiLocationMarker} />
              <Text fontSize="xs">
                {farm?.location.name}, {farm?.location.state}
              </Text>
            </Flex>

            <Flex align="center" color="gray.500" mt={{ base: 2, md: 0 }}>
              <Text fontSize="xs">
                Cooperative type:{" "}
                <Text as="span" fontWeight={900} color="black">
                  Village (3% discount)
                </Text>
              </Text>
            </Flex>
          </Flex>

          <Box my={{ md: 10 }}>
            <Heading as="h4" fontSize={{ md: "xl" }}>
              Add Members and their acreage
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Please invite cooperative members by adding their emails and their
              respective acreages
            </Text>

            <Flex
              align="center"
              bg="gray.100"
              p={3}
              rounded="md"
              mt={{ md: 5 }}
            >
              <Box borderRightWidth={1} pr={8} borderRightColor="gray.300">
                <Text color="gray.500">
                  Member left:{" "}
                  <Text as="span" fontWeight={900} color="black">
                    5
                  </Text>
                </Text>
              </Box>
              <Box ml={{ md: 16 }}>
                <Text color="gray.500">
                  Meet the minimum acreage:{" "}
                  <Text as="span" fontWeight={900} color="black">
                    10
                  </Text>
                </Text>
              </Box>
            </Flex>

            <CooperativeMemberCard />
            <CooperativeMemberCard />
          </Box>
        </Box>
      </GridItem>
    </MotionGrid>
  );
};

Acreage.propTypes = {
  farm: PropTypes.object,
  name: PropTypes.string,
  order: PropTypes.object,
  selectedType: PropTypes.object,
};

export default Acreage;
