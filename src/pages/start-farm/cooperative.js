/* eslint-disable */
import React from "react";
import Header from "container/Header";
import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/layout";
import { Link as ReachRouter } from "react-router-dom";
import CooperativeCard from "components/Cards/CooperativeCard";
import { Button } from "components";
import useAuth from "context/auth";
import PropTypes from "prop-types";
import useFetch from "hooks/useFetch";
import useApi from "context/api";
import FetchCard from "components/FetchCard";
import useStartFarm from "context/start-farm";


const Cooperative = ({ location: { selected }, history }) => {
  const { isAuthenticated } = useAuth();
  const { user } = isAuthenticated();
  const {triggerReload, cooperativeTypes, coopTError, coopTLoading, setSelectedCooperativeType} = useStartFarm()
  document.title = "Complete Farmer | Cooperative";
  const [selectedType, setSelectedType] = React.useState("");


  
  return (
    <Box>
      <Header />
      <Flex
        direction="column"
        w="100vw"
        h={{ md: "92vh" }}
        align="center"
        justify="center"
        mt={{ base: 32, md: 0 }}
      >
      { (coopTLoading || coopTError) ?
      <FetchCard
            direction='column'
            align='center'
            justify='center'
            w='100%'
            mx='auto'
            reload={() => triggerReload()}
            loading={coopTLoading}
            error={coopTError}
            text={"Standby as we load cooperative types"}
          />:
      <>
        <Box textAlign="center" mb={20}>
          <Text>Welcome {user?.firstName}</Text>
          <Heading as="h4" fontSize={{ base: "xl", md: "2xl" }}>
            Select your cooperative type
          </Heading>
        </Box>
        <Grid
          templateColumns={{ md: "repeat(4, 1fr)" }}
          gap={6}
          px={{ base: 4, md: 0 }}
        >
          {cooperativeTypes.map((item) => (
            <CooperativeCard
              key={item?.name}
              item={item}
              selected={selectedType?.name === item?.name}
              onClick={() => {
                setSelectedCooperativeType(item)
                return setSelectedType(item)}}
            />
          ))}
        </Grid>

        <Flex mt={{ base: 14, md: 20 }} mb={{ base: 10, md: 0 }}>
          <Link
            as={ReachRouter}
            to="/start-farm"
            _hover={{ textDecor: "none" }}
          >
            <Button
              btntitle="Back"
              px={{ base: 10, md: 20 }}
              h={{ base: 10, md: 12 }}
              fontSize={{ base: "sm", md: "md" }}
              bg="transparent"
              borderWidth={1}
              borderColor="gray.300"
              color="gray.500"
              mr={{ base: 6, md: 10 }}
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
            />
          </Link>

          <Link
            as={ReachRouter}
            to={{ pathname: "/start-farm/cooperative-farms", selectedType }}
            _hover={{ textDecor: "none" }}
          >
            <Button
              btntitle="Continue"
              px={{ base: 10, md: 20 }}
              h={{ base: 10, md: 12 }}
              fontSize={{ base: "sm", md: "md" }}
              disabled={!selectedType}
            />
          </Link>
        </Flex>
        </>
        }
      </Flex>
    </Box>
  );
};

Cooperative.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default Cooperative;
