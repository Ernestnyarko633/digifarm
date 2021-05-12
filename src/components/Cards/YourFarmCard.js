/* eslint-disable */
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Badge,
  Link,
  Tag,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReachLink } from "react-router-dom";
import Button from "components/Button/index";
//import Bitmap from 'assets/images/Bitmap.png'
import PropTypes from "prop-types";
//import { Link as ReachRouter } from 'react-router-dom'

const ItemTag = ({
  setFilter,
  setActiveFarmIndex,
  filter,
  title,
  id,
  text,
}) => (
  <Tag
    my={2}
    onClick={() => {
      setFilter(text);
      setActiveFarmIndex(id);
    }}
    color={filter === text ? "cf.800" : "gray.500"}
    textAlign="center"
    bg={filter === text ? "cf.200" : "gray.100"}
    rounded={20}
    px={5}
    py={3}
    mr={2}
    cursor="pointer"
  >
    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight={600}>
      {title}
    </Text>
  </Tag>
);

ItemTag.propTypes = {
  id: PropTypes.number,
  setFilter: PropTypes.func,
  setFarmIndex: PropTypes.func,
  filter: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};

const items = [
  { id: 0, title: "All Feeds", filter: "all" },
  { id: 1, title: "Weekly Videos", filter: "weekly videos" },
  { id: 2, title: "News", filter: "news" },
];

const YourFarmCard = ({
  farms,
  setActiveFarmIndex,
  farmName,
  setFarmName,
  setFilter,
  filter,
}) => {
  // const mapKey = (i) => i;
  const randomColors = [
    { color: "#FF9F9F" },
    { color: "#76B1F6" },
    { color: "#FF9F9F" },
    { color: "#76B1F6" },
    { color: "#FF9F9F" },
    { color: "#76B1F6" },
    { color: "#FF9F9F" },
    { color: "#76B1F6" },
    { color: "#FF9F9F" },
    { color: "#76B1F6" },
    { color: "#FF9F9F" },
    { color: "#76B1F6" },
  ];

  return (
    <Box bg="white" w="100%" p={{ base: 0, md: 16 }}>
      <Flex align="center" justify="center" direction="column" w="100%">
        <Flex align="center" direction="row" justify="space-around" w="100%">
          <Heading as="h6" fontSize="lg">
            Your Farm(s)
          </Heading>
          <Link as={ReachLink} to="/start-farm" _hover={{ textDecor: "none" }}>
            <Button rounded="30px" btntitle="Start a farm" />
          </Link>
        </Flex>

        <Flex
          direction="column"
          align="center"
          justify="flex-start"
          w="70%"
          my={10}
        >
          <Flex align="center" w="100%">
            {farms?.map((farm, index) => (
              <>
                {farm?.order?.product?._id && (
                  <Flex
                    key={index}
                    direction="column"
                    align="center"
                    justify="center"
                    mr={4}
                    onClick={() => {
                      setFarmName(farm.name);
                      setFilter("all");
                    }}
                  >
                    <Text
                      fontSize="sm"
                      color={farmName === farm.name ? "cf.800" : "gray.200"}
                      mb={3}
                    >
                      {farm.name}
                    </Text>
                    <Box
                      w={24}
                      h={24}
                      rounded="100%"
                      borderWidth="1px"
                      pos="relative"
                      borderColor={
                        farmName === farm.name ? "cf.800" : "gray.200"
                      }
                    >
                      <Image
                        w="100%"
                        h="100%"
                        rounded="100%"
                        src={farm?.order.product?.cropVariety?.imageUrl}
                      />
                      <Badge
                        position="absolute"
                        top={0}
                        left={2}
                        bg={
                          farmName === farm.name
                            ? "cf.800"
                            : randomColors[index]?.color || "#ff0000"
                        }
                        rounded="25px"
                        w={5}
                        h={5}
                      >
                        <Box rounded="25px" w="25px" h="25px" />
                      </Badge>
                    </Box>
                  </Flex>
                )}
              </>
            ))}
          </Flex>

          <Flex direction="row" w="100%" mt={1}>
            {items.map((item) => (
              <ItemTag
                key={item.id}
                setFilter={setFilter}
                setActiveFarmIndex={setActiveFarmIndex}
                id={item.id}
                title={item.title}
                text={item.filter}
                filter={filter}
              />
            ))}
            {/*<Tag*/}
            {/*  my={2}*/}
            {/*  onClick={() => {*/}
            {/*    setFilter("combined");*/}
            {/*    setActiveFarmIndex(0);*/}
            {/*  }}*/}
            {/*  color={filter === "combined" ? "cf.800" : "gray.400"}*/}
            {/*  justifyContent="center"*/}
            {/*  bgGradient={*/}
            {/*    filter === "combined"*/}
            {/*      ? "linear(to-l, #DEECDC,#EFF6ED)"*/}
            {/*      : "linear(to-l, #fff)"*/}
            {/*  }*/}
            {/*  rounded={20}*/}
            {/*  minW="12"*/}
            {/*  maxH="5"*/}
            {/*  px={5}*/}
            {/*  py={3}*/}
            {/*  mr={2}*/}
            {/*>*/}
            {/*  <Text fontSize={{ base: "10px", md: "sm" }} fontWeight={600}>*/}
            {/*    All Feeds*/}
            {/*  </Text>*/}
            {/*</Tag>*/}
            {/*<Tag*/}
            {/*  my={2}*/}
            {/*  onClick={() => {*/}
            {/*    setActiveFarmIndex(null);*/}

            {/*    setFilter("weekly videos");*/}
            {/*  }}*/}
            {/*  color={filter === "weekly videos" ? "cf.800" : "gray.400"}*/}
            {/*  justifyContent="center"*/}
            {/*  bgGradient={*/}
            {/*    filter === "weekly videos"*/}
            {/*      ? "linear(to-l, #DEECDC,#EFF6ED)"*/}
            {/*      : "linear(to-l, #fff)"*/}
            {/*  }*/}
            {/*  rounded={20}*/}
            {/*  minW="12"*/}
            {/*  maxH="5"*/}
            {/*  px={5}*/}
            {/*  py={3}*/}
            {/*  mr={2}*/}
            {/*>*/}
            {/*  <Text fontSize={{ base: "10px", md: "sm" }} fontWeight={600}>*/}
            {/*    Weekly Videos*/}
            {/*  </Text>*/}
            {/*</Tag>*/}
            {/*<Tag*/}
            {/*  my={2}*/}
            {/*  onClick={() => {*/}
            {/*    setActiveFarmIndex(null);*/}
            {/*    setFilter("news");*/}
            {/*  }}*/}
            {/*  color={filter === "news" ? "cf.800" : "gray.400"}*/}
            {/*  justifyContent="center"*/}
            {/*  bgGradient={*/}
            {/*    filter === "news"*/}
            {/*      ? "linear(to-l, #DEECDC,#EFF6ED)"*/}
            {/*      : "linear(to-l, #fff)"*/}
            {/*  }*/}
            {/*  rounded={20}*/}
            {/*  minW="12"*/}
            {/*  maxH="5"*/}
            {/*  px={5}*/}
            {/*  py={3}*/}
            {/*  mr={2}*/}
            {/*>*/}
            {/*  <Text fontWeight={600} fontSize={{ base: "10px", md: "sm" }}>*/}
            {/*    News*/}
            {/*  </Text>*/}
            {/*</Tag>*/}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

YourFarmCard.propTypes = {
  farms: PropTypes.any,
  setActiveFarmIndex: PropTypes.func,
  farmName: PropTypes.any,
  setFarmName: PropTypes.func,
  setFilter: PropTypes.func,
  filter: PropTypes.any,
};

export default YourFarmCard;
