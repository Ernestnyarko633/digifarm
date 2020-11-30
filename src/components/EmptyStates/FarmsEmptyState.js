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
    <Box>
      <Box bg="rgba(155, 155, 155, 0.1)" p={{ md: 10 }} mt={{ md: 24 }}>
        {/* <Box textAlign="center">
        <Heading as="h3" fontSize={{ md: '3xl' }} mt={{ md: 6 }}>
          We are connecting the world through agriculture
        </Heading>
        <Text>
          Be part of a cooperative where you can connect to people around the
          <br />
          world and co-own a farm in Africa.
        </Text>
      </Box> */}

        {/* <Box my={{ md: 10 }} textAlign="center">
        <Link _hover={{ textDecor: 'none' }} color="cf.400" d="block" mb={4}>
          Learn more <Icon as={MdKeyboardArrowRight} />
        </Link>

        <Button colorScheme="linear" rounded="30px" w={64} h={12} shadow="md">
          Get me started now
        </Button>
      </Box> */}

        {/* <Box mx="auto" w="80%" my={{ md: 16 }}>
        <Image src={CorporateIllustration} />
      </Box> */}
        <Box p={{ md: 16 }}>
          <Flex direction="row" w="100%">
            <Box w="50%" bg="black">
              <Text>Hello</Text>
            </Box>
            <Box w="50%" bg="#00ff00">
              <Text>Hello</Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default FarmsEmptyState;
