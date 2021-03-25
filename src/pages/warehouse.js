/* eslint-disable */

import React, { useState } from "react";
import Layout from "container/Layout";
import {
  Heading,
  Box,
  Flex,
  Icon,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { IoWarningOutline } from "react-icons/io5";
import WarehouseCard from "components/Cards/WarehouseCard";
import useApi from "context/api";
import useAuth from "context/auth";
import useFetch from "hooks/useFetch";
import FarmsEmptyState from "components/EmptyStates/FarmsEmptyState";
import Greetings from "components/Utils/Greetings";
import { getCurrentDayParting } from "helpers/misc";
import BuyerEmptyState from "components/EmptyStates/BuyerEmptyState";
import vector from "../assets/images/vector.png";
import FetchCard from "components/FetchCard";

const Warehouse = () => {
  document.title = "Complete Farmer | Warehouse";
  const { getMyFarms } = useApi();
  const { isAuthenticated } = useAuth();
  const { user } = isAuthenticated();
  const [reload, setReload] = React.useState(0);
  const { message } = getCurrentDayParting();

  const {
    data: myfarms,
    isLoading: myFarmsIsLoading,
    error: myFarmsHasError,
  } = useFetch("my_farms", getMyFarms, reload, { user: user?._id });
  console.log(myfarms, "farms");

  const isLoading = myFarmsIsLoading;
  const hasError = myFarmsHasError;
  const filteredFarms = myfarms?.filter(farm => farm.storage.quantity > 0)

  return (
    <Layout>
      {myfarms?.length > 0 ? (
        <>
          {myfarms?.length === 1 && myfarms[0].storage.quantity === 0 ? (
            <>
              <Greetings title={"Warehouse"} />
              <Box
                borderRadius={10}
                borderWidth={2}
                borderColor="rgba(255, 246, 216, 1)"
                bgColor="rgba(255, 246, 216, 1)"
                p={1}
                mt={-70}
                position="absolute"
                ml={20}
              >
                <Icon as={IoWarningOutline} color="#D08F31" w={5} h={5} />
                <Text as="span" fontSize="14px" color="black" px={2}>
                  If produce in the warehouse are not sold within 2 weeks, they
                  will automatically be sold to a buyer
                </Text>
              </Box>
              <Center>
                <BuyerEmptyState
                  image={vector}
                  note={"Warehouse is currently empty"}
                  info={
                    "Warehouse will automatically show up when the produce are harvested and ready to sell"
                  }
                />
              </Center>
            </>
          ) : ( 
            <>
            { 
              isLoading || hasError ? (
                <FetchCard
                  w="100%"
                  mx="auto"
                  align="center"
                  justify="center"
                  direction="column"
                  error={hasError}
                  loading={isLoading}
                />
              ) : (
                <Box py={12} px={24}>
                  <Heading>Warehouse </Heading>
                  <Box
                    borderRadius={40}
                    borderWidth={2}
                    borderColor="rgba(208, 143, 49, 0.1)"
                    bgColor="rgba(208, 143, 49, 0.1)"
                    p={2}
                    position="absolute"
                  >
                    <Icon as={IoWarningOutline} color="#D08F31" w={5} h={5} />
                    <Text
                      as="span"
                      fontWeight="bold"
                      fontSize="14px"
                      color="#D08F31"
                      px={2}
                    >
                      If produce in the warehouse are not sold within 2 weeks,
                      they will automatically be sold to a buyer
                    </Text>
                  </Box>
                  <Box mt={20}>
                    {filteredFarms?.map((myfarm) => (
                      <WarehouseCard
                        sellButton={true}
                        _id={myfarm._id}
                        key={myfarm?.name}
                        mr={3}
                        ml={14}
                        myfarm={myfarm}
                      />
                    ))}
                  </Box>
                </Box>
              )

            }
            </>
          )}
        </>
      ) : (
        <>
          <Greetings
            title={`${message} Farmer ${user?.firstName}`}
            text="Get started by farming individually or with a group."
          />
          <FarmsEmptyState />
        </>
      )}
    </Layout>
  );
};

export default Warehouse;
