import React from "react";
import { Box, Flex, Image, Heading, Icon, Text } from "@chakra-ui/core";
import ginger from "../../../assets/images/startfarm/ginger.png";
import FarmInfo from "components/Cards/FarmInfo";
import { Support, Schedule, Update } from "theme/Icons";
import PayOption from "components/Cards/PayOption";
import visa from "../../../assets/images/startfarm/visa.png";

const PaymentOption = ({
  icon,
  title,
  theme,
  description,
  notice,
  percent,
  dropDown,
}) => {
  return (
    <Box w={{ md: "100%" }} my={10}>
      <Flex align="center">
        <Box py={{ md: 10 }} m={8}>
          <Image src={ginger} alt="ginger" />
        </Box>
        <Flex direction="column">
          <Heading as="h6" fontSize="2xl" ml={5}>
            Choose your payment Option
          </Heading>
          <PayOption
            icon={visa}
            title="Card"
            theme="For card payments"
            description="Stated USD prices are converted to Ghana cedis equivalent to the current exchange rate and payments it is processed in."
            notice="All transactions are charged a transaction fee of"
            percent="1.95%"
          />
          <PayOption
            icon={visa}
            title="Bank Payment"
            theme="For bank payment"
            description="Please note that bank transfer will take at most 2 weeks before money is transferred"
            notice="Contact support for any help"
            dropDown
          />
        </Flex>
      </Flex>

      <Flex align="center" justify="space-between">
        <Box textAlign="center" w={{ md: "100%" }} px={8}>
          <Heading as="h6" fontSize="md">
            What is included in this farm
          </Heading>
          <Flex justify="space-between" align="center" fontSize="sm">
            <Flex align="center">
              <Icon as={Update} color="cf.400" />
              <Text ml={1}>Farm Updates</Text>
            </Flex>
            <Flex align="center">
              <Icon as={Support} color="cf.400" />
              <Text ml={1}>Support</Text>
            </Flex>
            <Flex align="center">
              <Icon as={Schedule} color="cf.400" />
              <Text ml={1}>Scheduled Farm Visits</Text>
            </Flex>
          </Flex>
        </Box>
        <FarmInfo />
      </Flex>
    </Box>
  );
};

export default PaymentOption;
