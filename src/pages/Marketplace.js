import React from "react";
import Layout from "container/Layout";
import {
  Box,
  Heading,
  Image,
  Spacer,
  Text,
  Flex,
} from "@chakra-ui/core";
import ArrowButton from "../components/Button/ArrowButton";
import WarehouseCard from "components/Cards/WarehouseCard";
import BuyerCard from "components/Cards/BuyerCard";

import IllustrationImage from "../assets/images/home/illustration.png";
import SoyaBean from "../assets/images/startfarm/soya-beans.svg";
import Oval from "../assets/images/Oval.svg";

const warehouseGoods = [
  {
    id: 1,
    image: SoyaBean,
    name: "Soya Bean Warehouse",
    location: "AgyaAtta, Eastern Region",
    quantity: "2000 tonnes",
    weight: "200 kg",
    bags: "20 bags",
    condition: "Moist",
  },
  {
    id: 2,
    image: SoyaBean,
    name: "Soya Bean Warehouse",
    location: "AgyaAtta, Eastern Region",
    quantity: "2010 tonnes",
    weight: "300 kg",
    bags: "30 bags",
    condition: "Dry",
  },
  // {
  //   id:3,
  //   image: SoyaBean,
  //   name: 'Soya Bean Warehouse',
  //   location: 'Shai Osudoku, Eastern Region',
  //   quantity: '2010 tonnes',
  //   weight: '300 kg',
  //   bags: '30 bags',
  //   condition: 'Moist'
  // }
];

const buyers = [
  {
    id: 1,
    image: Oval,
    name: "John Clinton",
    address: "Accra | John Clinton Company Limited",
    amtLeft: "2100",
    amtNeeded: "3000",
    amtBought: "900",
    price: "$30.00",
  },
  {
    id: 2,
    image: Oval,
    name: "Georgina Adzorgenu",
    address: "Ayikuma | Approcon Enterprise Limited",
    amtLeft: "800",
    amtNeeded: "2000",
    amtBought: "1200",
    price: "$50.00",
  },
];

const Marketplace = () => {
  document.title = "COMPLETE FARMER | MARKETPLACE";

  return (
    <Layout>
      <Box pos="relative">
        <Image
          src={IllustrationImage}
          h={{ md: 115 }}
          w="100%"
          objectFit="cover"
        />
        <Box pos="absolute" top={{ md: 40 }} left={{ md: 16 }}>
          <Heading as="h3" fontSize={{ md: "4xl" }}>
            Welcome to your marketplace
          </Heading>
          <Text>Sell your produce to the right buyer at a good price</Text>
        </Box>
      </Box>
      <Box>
        <Box textAlign="center" px={{ md: 10 }} py={{ md: 8 }}>
          <Heading as="h4" fontSize={{ md: "2xl" }}>
            Here's how your farm(s) are doing
          </Heading>
        </Box>
        <Spacer />
        <ArrowButton />
      </Box>
      <Flex my={3}>
        {warehouseGoods.map((item) => (
          <WarehouseCard
            name={item.name}
            location={item.location}
            image={item.image}
            quantity={item.quantity}
            weight={item.weight}
            bags={item.bags}
            condition={item.condition}
            mr={3}
            ml={14}
          />
        ))}
      </Flex>
      <Box my={4} textAlign="center">
        <Heading as="h4" fontSize={{ md: "2xl" }}>
          Here's a list of available buyers
        </Heading>
      </Box>
      <Box>
        {buyers.map((buyer) => (
          <BuyerCard
            name={buyer.name}
            address={buyer.address}
            image={buyer.image}
            amtLeft={buyer.amtLeft}
            amtNeeded={buyer.amtNeeded}
            amtBought={buyer.amtBought}
            price={buyer.price}
          />
        ))}
      </Box>
    </Layout>
  );
};

export default Marketplace;
