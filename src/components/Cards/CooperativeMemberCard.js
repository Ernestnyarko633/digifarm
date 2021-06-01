/* eslint-disable */
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Grid, GridItem } from "@chakra-ui/react";
import { FormInput } from "../Form";
import Icon from "@chakra-ui/icon";
import { MdClose } from "react-icons/all";

const CooperativeMemberCard = ({
  values,
  value,
  name,
  onChange,
  onBlur,
  remove,
}) => {
  return (
    <Box bg="gray.50" rounded="md" p={4} my={5} pos="relative">
      <Flex align="center" fontSize="sm">
        <Text color="black" fontWeight={700}>
          Member 1
        </Text>
        <Box
          bg="gray.100"
          py={1}
          px={5}
          ml={3}
          fontSize="xs"
          rounded="sm"
          color="gray.500"
        >
          1 acres = $1500
        </Box>
      </Flex>

      {values.length > 1 && (
        <Box
          pos="absolute"
          right={3}
          top={3}
          as="button"
          role="button"
          aria-label="close button"
          onClick={() => remove(values.length - 1)}
        >
          <Icon as={MdClose} />
        </Box>
      )}

      <Grid templateColumns={{ md: "repeat(5, 1fr)" }} gap={4} mt={4}>
        <GridItem colSpan={3}>
          <FormInput
            type="email"
            placeholder="email@example.com"
            bg="gray.100"
            borderBottomColor="none"
            value={value.email}
            name={`${name}email`}
            onChange={onChange}
            onBlur={onBlur}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            placeholder="10 Acres"
            bg="gray.100"
            borderBottomColor="none"
            value={value.acreage}
            name={`${name}acreage`}
            onChange={onChange}
            onBlur={onBlur}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CooperativeMemberCard;
