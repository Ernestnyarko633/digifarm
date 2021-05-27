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
import { Link as ReachLink, useLocation } from "react-router-dom";
import Button from "components/Button/index";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import ArrowButton from "../Button/ArrowButton";

const MotionFlex = motion(Flex);
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const ItemTag = ({ setFilter, filter, title, setActiveFarmIndex, text }) => {
  const location = useLocation();
  const query = location.search.split("?")[1];

  const newState = query === text ? query : text;

  console.log("filter", filter);

  return (
    <Tag
      my={2}
      onClick={() => {
        setFilter(newState);
        setActiveFarmIndex(text === "all" ? 0 : null);
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
  activeFarmIndex,
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

  const [currentSlide, setCurrentSlide] = React.useState(0);

  // let arr = new Array(10).fill({
  //   name: "Jeff's farm",
  //   img: "https://completefarmer.s3.us-east-2.amazonaws.com/app/images/crops/solo-gold.png",
  //   _id: "606f58a1cf286d001193cf93",
  // });

  const handleClick = (direction) => {
    setCurrentSlide((prevState) => {
      return (farms.length + prevState + direction) % farms.length;
    });
  };

  return (
    <Box bg="white" w="100%" p={{ base: 0, md: 16 }}>
      <Flex
        align="center"
        justify="center"
        direction="column"
        w="100%"
        pos="relative"
        pt={{ base: 16, md: 0 }}
      >
        <Flex align="center" direction="row" justify="space-around" w="100%">
          <Heading as="h6" fontSize="lg">
            Your Farm(s)
          </Heading>
          <Link as={ReachLink} to="/start-farm" _hover={{ textDecor: "none" }}>
            <Button rounded="30px" btntitle="Start a farm" />
          </Link>
        </Flex>

        <Box
          pos={{ md: "absolute" }}
          left={{ md: -12 }}
          d={farms.length > 8 ? "block" : "none"}
          mt={{ base: 6, md: 0 }}
        >
          <ArrowButton handleClick={handleClick} />
        </Box>

        <Flex
          direction="column"
          align="center"
          justify="flex-start"
          maxW={{ md: 130 }}
          w={{ md: 130 }}
          overflow="hidden"
          my={10}
        >
          <MotionFlex
            align="center"
            animate={{
              x: `-${7 * currentSlide}rem`,
              transition: { duration: 0.6, ...transition },
            }}
            pos="relative"
            w="100%"
          >
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
                      setActiveFarmIndex(index);
                    }}
                  >
                    <Text
                      fontSize="sm"
                      color={index === activeFarmIndex ? "cf.800" : "gray.200"}
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
                        index === activeFarmIndex ? "cf.800" : "gray.200"
                      }
                    >
                      <Image
                        w="100%"
                        h="100%"
                        rounded="100%"
                        src={farm?.order?.product?.cropVariety?.imageUrl}
                      />
                      <Badge
                        position="absolute"
                        top={0}
                        left={2}
                        bg={
                          index === activeFarmIndex
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
          </MotionFlex>

          <Flex
            direction="row"
            w={{ md: "100%" }}
            mt={3}
            overflowX={items.length > 6 ? "scroll" : "visible"}
          >
            {items.map((item) => (
              <ItemTag
                key={item.id}
                setFilter={setFilter}
                setActiveFarmIndex={setActiveFarmIndex}
                title={item.title}
                text={item.filter}
                filter={filter}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

// ItemTag.propTypes = {
//   id: PropTypes.number,
//   setFilter: PropTypes.func,
//   setFarmIndex: PropTypes.func,
//   filter: PropTypes.string,
//   title: PropTypes.string,
//   text: PropTypes.string,
// };

YourFarmCard.propTypes = {
  farms: PropTypes.any,
  setActiveFarmIndex: PropTypes.func,
  farmName: PropTypes.any,
  setFarmName: PropTypes.func,
  setFilter: PropTypes.func,
  filter: PropTypes.any,
};

export default YourFarmCard;
