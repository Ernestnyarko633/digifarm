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



import FarmCard from "../Cards/FarmCard";

const FarmsEmptyState = () => {
  

  return (
    <Box bg="rgba(155, 155, 155, 0.1)">
      <Box p={{ md: 8 }} mt={{ md: 20 }}>
        <Box>
          <Flex direction="row" w="100%">
            <Box w="50%">
              <Flex p={5} direction="column" w="100%">
                <Box >
                  <Heading as="h6" fontSize={18} letterSpacing={2}>
                    {"Welcome to your farm board"}
                  </Heading>
                  <Text fontSize="xs" color="#9b9b9b" mt={{ md: -2 }}>
                    {
                      "Here's where you view, share and like all the news from your farm(s)"
                    }
                  </Text>
                </Box>
                <Flex position="absolute" bottom={250} w={"220px"}>
                  <Text text>
                    Gain points to increase your chances of getting stars
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box w="50%">
              <FarmCard
                minWidth="50%"
                w={{ xs: "70%", md: "90%" }}
                h={{ xs: "340px", md: "340px" }}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default FarmsEmptyState;
