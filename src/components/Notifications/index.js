import { Box, Text, Heading, Flex, Tag } from "@chakra-ui/core";
import { Button } from "components";

const Notification = () => {
  return (
    <Box
      pos="fixed"
      top={24}
      right={10}
      w={{ md: "27%" }}
      h={{ md: "20%" }}
      boxShadow="md"
      rounded="md"
      zIndex={10}
      bg="#fff"
      py={2}
    >
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          w={{ md: "90%" }}
          mx="auto"
        >
          <Flex align="center" w={{ md: "50%" }} justify="space-between">
            <Heading as="h6" fontSize="10px">
              INVOICE DEPOSIT
            </Heading>
            <Tag
              as="tag"
              color="cf.400"
              fontSize="10px"
              bg="cf.200"
              borderRadius="none"
            >
              FINALIZE
            </Tag>
          </Flex>
          <Box fontSize="10px" color="gray.500">
            3min ago
          </Box>
        </Flex>
        <Box
          borderBottomWidth={1}
          borderColor="gray.200"
          w={{ md: "90%" }}
          mx="auto"
        ></Box>
      </Flex>

      <Flex w={{ md: "90%" }} mx="auto" justify="space-between" align="center">
        <Flex direction="column" w={{ md: "60%" }} my={2}>
          <Text fontWeight={700} fontSize="12px">
            Transaction Successful
          </Text>
          <Text fontSize="10px" color="gray.500">
            You have sold 200 tonnes of your produce to a Buyer
          </Text>
        </Flex>
        <Box>
          <Button btntitle="Download Receipt" fontSize="10px" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Notification;
