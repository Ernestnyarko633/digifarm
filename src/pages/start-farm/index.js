/* eslint-disable */
import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/layout";
import { Link as ReachRouter } from "react-router-dom";

import Header from "container/Header";
import FarmingTypeCard from "components/Cards/FarmingTypeCard";

import useAuth from "context/auth";
// json
import types from "data/farm.json";
import { Button } from "components";

const StartFarm = () => {
  const { isAuthenticated } = useAuth();
  const [selected, setSelected] = React.useState("");

  const { user } = isAuthenticated();

  return (
    <>
      <Header />
      <Flex
        align="center"
        justify="center"
        direction="column"
        bgColor="white"
        w={{ md: "100vw" }}
        h={{ md: "100vh" }}
        overflow="hidden"
        mt={{ base: 20, md: 0 }}
      >
        <Box textAlign="center" mb={{ md: 12 }}>
          <Text fontFamily="light" fontSize={{ md: "3xl" }}>
            Welcome {user?.firstName}
          </Text>
          <Heading as="h4" size="xl">
            How would you like to farm with us
          </Heading>
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          px={{ base: 6, md: 0 }}
          my={{ base: 6, md: 0 }}
        >
          {types?.map((item, idx) => (
            <FarmingTypeCard
              state={item}
              key={item.id}
              btntitle="Select"
              title={item.name}
              options={item.benefits}
              subtitle={item.subtitle}
              path={`/start-farm/${item.id}`}
              mr={{ md: idx ? 0 : 5 }}
              image={
                require(`../../assets/images/startfarm/${item.img}`).default
              }
              selected={selected.name === item.name}
              onClick={() => setSelected(item)}
            />
          ))}
        </Flex>

        <Box mt={{ base: 6, md: 10 }} mb={{ base: 10, md: 0 }}>
          <Link
            as={ReachRouter}
            to={{ pathname: `/start-farm/${selected.id}`, selected }}
            _hover={{ textDecor: "none" }}
          >
            <Button
              btntitle="Continue"
              px={{ base: 10, md: 20 }}
              h={{ base: 10, md: 12 }}
              fontSize={{ base: "sm", md: "md" }}
              disabled={!selected}
            />
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default StartFarm;
