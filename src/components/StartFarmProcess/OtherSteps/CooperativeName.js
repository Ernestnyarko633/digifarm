/* eslint-disable */
import React from "react";
import { Flex } from "@chakra-ui/layout";
import PropTypes from "prop-types";

const CooperativeName = ({ farm }) => {
  console.log("farm", farm);
  return (
    <Flex align="center" justify="center" mt={20}>
      Hello Display
    </Flex>
  );
};

CooperativeName.propTypes = {
  farm: PropTypes.object,
};

export default CooperativeName;
