/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Divider, Icon } from "@chakra-ui/react";
import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import ExpenditureCard from "./ExpenditureCard";
import { getFormattedMoney } from "helpers/misc";
import Button from "components/Button";
import { Link as ReachRouter } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { FirstLettersToUpperCase } from "helpers/misc";
import useFetch from "hooks/useFetch";
import useApi from "context/api";
import FetchCard from "components/FetchCard/index";
import useWallet from "context/wallet";

const WalletCard = ({ acreage, price, farm }) => {
  const [reload, setReload] = useState(0);
  const { farmExpense } = useWallet();
  const { getAllTasks, getActivities, getMyScheduledTasks, getMyFarmFeeds } =
    useApi();

  const triggerReload = () => setReload((prevState) => prevState + 1);

  const {
    data: myFarmActivities,
    isLoading: myFarmActivitiesIsLoading,
    error: myFarmActivitiesHasError,
  } = useFetch(
    `${farm?.order?.product?._id}_activities`,
    getActivities,
    reload,
    {
      farm: farm?.order?.product?._id,
    }
  );

  const {
    data: tasks,
    isLoading: tasksIsLoading,
    error: tasksHasError,
  } = useFetch("tasks", getAllTasks, reload);

  const {
    data: ScheduledTasks,
    isLoading: ScheduledTasksIsLoading,
    error: ScheduledTasksHasError,
  } = useFetch(
    `${farm?.order?.product?._id}_scheduled_tasks`,
    getMyScheduledTasks,
    reload,
    {
      farm: farm?.order?.product?._id,
    }
  );

  const {
    data: farmFeeds,
    isLoading: farmFeedsIsLoading,
    error: farmFeedsHasError,
  } = useFetch(
    `${farm?.order?.product?._id}_farm_feeds`,
    farm?.order?.product?._id ? getMyFarmFeeds : null,
    reload,
    {
      farm: farm?.order?.product?._id,
    }
  );

  const loading =
    ScheduledTasksIsLoading ||
    tasksIsLoading ||
    myFarmActivitiesIsLoading ||
    farmFeedsIsLoading;
  const error =
    ScheduledTasksHasError ||
    tasksHasError ||
    myFarmActivitiesHasError ||
    farmFeedsHasError;

  return (
    <Box
      rounded="xl"
      filter="drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))"
      bg="white"
      maxW={{ md: 82 }}
      minH={{ md: "auto" }}
    >
      <Box p={{ base: 4, md: 6 }} w="100%">
        <Flex align="center" mb={4}>
          <Box mr={4}>
            <Avatar
              boxSize={16}
              bgColor="white"
              borderWidth="1px"
              borderColor="gray.300"
              src={farm?.order?.product?.cropVariety?.imageUrl}
            />
          </Box>

          <Flex direction="row" w="100%" justify="space-between">
            <Flex align="flex-start" direction="column">
              <Heading as="h4" fontSize={{ base: "lg", md: "2xl" }}>
                {farm?.order?.product?.cropVariety?.crop?.name}
              </Heading>
              <Text
                ml={1}
                as="span"
                fontSize={{ base: "tiny", md: "sm" }}
                color="gray.500"
              >
                ({farm?.order?.product?.cropVariety?.name}) {farm?.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Divider orientation="horizontal" />

        <Flex direction="row" my={4}>
          <Icon
            mt={1}
            mr={1}
            as={HiLocationMarker}
            boxSize={4}
            color="gray.400"
          />
          <Text color="gray.500" mt={0} fontSize={{ base: "xs", md: "sm" }}>
            {FirstLettersToUpperCase(
              `${farm?.order?.product?.location?.name}, ${farm?.order?.product?.location?.country}`.toLowerCase()
            )}
          </Text>
        </Flex>

        {error || loading ? (
          <Box>
            <FetchCard
              direction="column"
              align="center"
              justify="center"
              mx="auto"
              reload={() => {
                (!farm?.length ||
                  !tasks?.length ||
                  !myFarmActivities?.length ||
                  !ScheduledTasks?.length) &&
                  triggerReload();
              }}
              loading={loading}
              error={error}
              text="Standby as we load your wallet and receipts"
            />
          </Box>
        ) : (
          <Grid gap={4}>
            <ExpenditureCard
              bg="yellow.light"
              amount={getFormattedMoney(
                farmExpense(myFarmActivities, tasks, ScheduledTasks)
              )}
              action="spent"
              color="yellow.deep"
            />
            <ExpenditureCard
              bg="cf.light"
              action="available"
              amount={getFormattedMoney(farm?.order?.cost  || (price * acreage)  )}
            />
          </Grid>
        )}
        <Box mt={6}>
          <Link
            as={ReachRouter}
            to={{
              pathname: `/wallets/${farm?._id}`,
              state: {
                farm: farm || {},
                activities: myFarmActivities || [],
                tasks: tasks || [],
                farmfeeds: farmFeeds || [],
                ScheduledTasks: ScheduledTasks || [],
                wallet: getFormattedMoney( farm?.order?.cost || price * acreage ),
                balance:farm?.order?.cost >=
                farmExpense(myFarmActivities, tasks, ScheduledTasks)  ? getFormattedMoney(
                  farm?.order?.cost -
                    farmExpense(myFarmActivities, tasks, ScheduledTasks)
                ) : 0,
                expense: getFormattedMoney(
                  farmExpense(myFarmActivities, tasks, ScheduledTasks)
                ),
              },
            }}
            _hover={{ textDecor: "none" }}
          >
            <Button
              btntitle="View farm wallet"
              width="100%"
              h={12}
              fontSize={{ base: "md", md: "lg" }}
              isDisabled={loading && !error}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

WalletCard.propTypes = {
  acreage: PropTypes.any,
  price: PropTypes.any,
  name: PropTypes.any,
  farm: PropTypes.object.isRequired,
};

export default WalletCard;
