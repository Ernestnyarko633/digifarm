/* eslint-disable */
import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import PropTypes from "prop-types";
import useComponent from "context/component";

const FarmingTypeCard = ({
  subtitle,
  options,
  image,
  title,
  selected,
  onClick,
  mr,
  id,
  disabled,
}) => {
  const { handleModalClick } = useComponent();

  return (
    <Box
      w={{ md: 85 }}
      p={8}
      borderWidth={selected ? 2 : 1}
      borderColor={selected ? "cf.800" : "gray.300"}
      rounded="lg"
      textAlign="left"
      mr={mr}
      mb={{ base: 6, md: 0 }}
      onClick={onClick}
      pos="relative"
    >
      <Box pos="absolute" top={2} right={2}>
        {selected ? (
          <Icon as={FaCheckCircle} color="cf.800" boxSize={6} />
        ) : (
          <Box
            borderWidth={1}
            borderColor="gray.200"
            rounded="100%"
            w={6}
            h={6}
          />
        )}
      </Box>
      {/*{id === "cooperative" && (*/}
      {/*  <Heading fontSize="2xl" color="cf.800">*/}
      {/*    Coming Soon*/}
      {/*  </Heading>*/}
      {/*)}*/}
      <Box mb={3}>
        <Image src={image} />
      </Box>
      <Flex
        align="center"
        justify="space-between"
        borderBottomWidth={1}
        borderBottomColor="gray.200"
        pb={2}
      >
        <Box>
          <Heading as="h5" fontSize={{ md: "xl" }}>
            {title}
          </Heading>
          <Text fontSize="sm" mt={-1} color="gray.500">
            {subtitle}
          </Text>
        </Box>
      </Flex>
      <List fontSize="sm" textAlign="left" my={3} fontFamily="body">
        {options.map((item) => (
          <ListItem key={item} py={1}>
            <ListIcon as={FaCheckCircle} color="cf.800" />
            {item}
          </ListItem>
        ))}
      </List>
      <Box>
        <Box
          d="block"
          fontSize="xs"
          color="cf.800"
          mt={1}
          fontFamily="body"
          as="button"
          role="button"
          aria-label="learn more button"
          onClick={() => handleModalClick("learnmore")}
        >
          Learn more <Icon as={MdKeyboardArrowRight} />
        </Box>
      </Box>
    </Box>
  );
};

FarmingTypeCard.propTypes = {
  btntitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  subtitle: PropTypes.string,
  options: PropTypes.array,
  state: PropTypes.object,
  mr: PropTypes.any,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FarmingTypeCard;
