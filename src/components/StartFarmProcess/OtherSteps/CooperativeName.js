/* eslint-disable */
import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { Avatar } from "@chakra-ui/avatar";
import { FormControl, FormLabel, Icon, Input } from "@chakra-ui/react";
import { HiPencil } from "react-icons/all";

const CooperativeName = ({ farm }) => {
  console.log("farm", farm);
  return (
    <Flex align="center" justify="center" direction="column">
      <Box pos="relative">
        <Avatar
          src={require("../../../assets/images/user-avatar.png").default}
          size="xl"
        />
        <FormControl>
          <FormLabel>
            <Flex
              align="center"
              justify="center"
              color="white"
              h={8}
              w={8}
              rounded="100%"
              bg="cf.800"
              pos="absolute"
              right={0}
              bottom={0}
              cursor="pointer"
            >
              <Icon as={HiPencil} />
            </Flex>
            <Input
              type="file"
              h="100%"
              w="100%"
              opacity={0}
              pos="absolute"
              // id={field.name}
              // name={field.name}
              // accept={accept}
              // onChange={handleChange}
            />
          </FormLabel>
        </FormControl>
      </Box>
      <Box mt={6}>
        <Heading as="h4" fontSize={{ base: "lg", md: "xl" }} fontWeight={700}>
          Give your cooperative a cool name
        </Heading>

        <FormControl mt={4}>
          <Input
            placeholder="Eg. CompleteNation"
            rounded={0}
            _focus={{ borderColor: "cf.800" }}
          />
        </FormControl>
      </Box>
    </Flex>
  );
};

CooperativeName.propTypes = {
  farm: PropTypes.object,
};

export default CooperativeName;
