import React, { useState } from 'react'
import Layout from 'container/Layout'
import { Box, Flex, Icon, Text, Heading } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'
import BuyerCard from 'components/Cards/BuyerCard'
// import IllustrationImage from '../assets/images/home/illustration.png'
import transaction1 from '../assets/images/transaction1.png'
import transaction2 from '../assets/images/transaction2.png'
import group from '../assets/images/group.png'

// import Oval from '../assets/images/Oval.svg'
import WarehouseCard from 'components/Cards/WarehouseCard'
// import ArrowButton from '../components/Button/ArrowButton'
import useApi from '../context/api'
import useAuth from 'context/auth'
/* eslint-disable */
import { motion } from "framer-motion";
import AboutBuyer from "components/Modals/AboutBuyer";
import BuyerEmptyState from "components/EmptyStates/BuyerEmptyState";
import useFetch from "hooks/useFetch";
import { Button } from "carbon-components-react";
import useComponent from "context/component";
import { useLocation } from "react-router-dom";

// const MotionFlex = motion.custom(Flex)
// const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const Marketplace = () => {
  document.title = "Complete Farmer | Farmer's Market";
  const { getSourcingOrders, getMyFarms } = useApi();
  const [varieties, setVarieties] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const { isAuthenticated } = useAuth();
  const { user } = isAuthenticated();
  const [loading, setLoading] = useState("fetching");
  const [reload, setReload] = React.useState(0);
  const [state, setState] = React.useState(0);
  const { state: myfarm } = useLocation();

  const toggle = (value) => {
    return setState(value);
  };

  const {
    data: SourcingOrders,
    isLoading: SourcingOrdersIsLoading,
    error: SourcingOrdersHasError,
  } = useFetch("s_orders", getSourcingOrders, reload, {
    cropVariety: myfarm?.order?.product?.cropVariety?._id,
  });

  return (
    <Layout>
      <Box pt={12} px={24}  >
        <Heading>Farmer's Market </Heading>
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
            If produce in the warehouse are not sold within 2 weeks, they will
            automatically be sold to a buyer
          </Text>
        </Box>

        <Box mt={20}>
          <WarehouseCard
            sellButton={false}
            _id={myfarm._id}
            key={myfarm?.name}
            name={`${myfarm?.order?.product?.cropVariety?.crop?.name} Warehouse`}
            location={`${myfarm?.order?.product?.location?.name},${myfarm?.order?.product?.location?.state}`}
            image={`${myfarm?.order?.product?.cropVariety?.imageUrl}`}
            quantity={myfarm?.storage?.quantity}
            weight={myfarm?.storage?.weight}
            bags={myfarm?.storage?.numberOfBags}
            mr={3}
            ml={14}
          />
        </Box>
        </Box>

       <Box py={12} px={24} mt={20} bgColor='#ECECEC'>
        <Heading >Buyers you can sell to</Heading>
        <Flex
          align="center"
          borderBottomWidth={1}
          borderBottomColor="cf-dark.300"
          pb={-1}
          mt={4}
        >
          <Box
            cursor="pointer"
            fontWeight={state === 0 ? "bold" : "normal"}
            cursor="pointer"
            onClick={() => toggle(0)}
            borderBottomWidth={state === 0 && 2}
            borderBottomColor="cf.400"
            pb={3}
            color={state === 0 ? "cf.400" : "gray.700"}
          >
            Ready Buyers
          </Box>
          <Box mx={10} />
          <Box
            cursor="pointer"
            fontWeight={state === 1 ? "bold" : "normal"}
            cursor="pointer"
            onClick={() => toggle(1)}
            borderBottomWidth={state === 1 && 2}
            borderBottomColor="cf.400"
            pb={3}
            color={state === 1 ? "cf.400" : "gray.700"}
          >
            Ongoing Transactions
          </Box>
          <Box mx={10} />
          <Box
            cursor="pointer"
            fontWeight={state === 2 ? "bold" : "normal"}
            cursor="pointer"
            onClick={() => toggle(2)}
            borderBottomWidth={state === 2 && 2}
            borderBottomColor="cf.400"
            pb={3}
            color={state === 2 ? "cf.400" : "gray.700"}
          >
            Past Transactions
          </Box>
        </Flex>
        {state === 0 && 
          SourcingOrders?.map((buyers) => (
            // add condition for when there are no buyer and error handling
            <BuyerCard _id={buyers._id} key={buyers._id} buyers={buyers} myfarm={myfarm}/>
          ))}
        {state === 0 && SourcingOrders?.length ===0 &&(
            <BuyerEmptyState
            image={group}
            ml={90}
            />
          )}
         
        {state === 1 && (
          <BuyerEmptyState
            image={transaction1}
            note={"No ongoing transaction yet"}
            info={"Ongoing transactions will be available here"}
            ml={90}
          />
        )}
        {state === 2 && (
          <BuyerEmptyState
            image={transaction2}
            note={"You haven't made any transactions"}
            info={"Past transaction history will show here"}
            ml={90}
          />
        )}
     </Box>
    </Layout>
  );
};

export default Marketplace;
