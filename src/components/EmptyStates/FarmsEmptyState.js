import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  Text,
} from "@chakra-ui/core";

import CropCard from "components/Cards/CropCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import CorporateIllustration from "../../assets/images/emptystate/corporate.png";
import PotatoImg from "../../assets/images/emptystate/potato.png";
import FarmCard from "../Cards/FarmCard";

const FarmsEmptyState = () => {
  const availableFarms = [
    {
      id: 1,
      title: "Sweet Potato",
      subtitle: "From $ 750/acre",
      img: PotatoImg,
      acreage: "1000 acres left",
      benefits: [
        "Agyata, Eastern region, Ghana",
        "1,200 acres available",
        "Up to 25% Expected yield/acre",
        "USD 150 (ROI) Projected market value of yield",
        "10 months",
      ],
    },
    {
      id: 2,
      title: "Sweet Potato",
      subtitle: "From $ 750/acre",
      img: PotatoImg,
      acreage: "1000 acres left",
      benefits: [
        "Agyata, Eastern region, Ghana",
        "1,200 acres available",
        "Up to 25% Expected yield/acre",
        "USD 150 (ROI) Projected market value of yield",
        "10 months",
      ],
    },
  ];

  return (
    <Box bg="rgba(155, 155, 155, 0.1)">
      <Box p={{ md: 8 }} mt={{ md: 20 }}>
        <Box> 
          <Flex direction="row" w="100%">
            <Box w="50%" >
              <Text>Hello</Text>
            </Box>
            <Box w="50%">
              <FarmCard w="60%" h="380px"/>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default FarmsEmptyState;
