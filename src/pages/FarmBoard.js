import React from "react";
import Layout from "container/Layout";
import FarmsEmptyState from "components/EmptyStates/FarmsEmptyState";
import { Heading, Box } from "@chakra-ui/core";

const FarmBoard = () => {
  return (
    <Layout showRightSideContentType="annoucement">
      <Box>
        <FarmsEmptyState />
      </Box>
      <Box>
      <Box p={{ md: 8 }} mt={{ md: 20 }}>
        <Box>
          <Heading as="h6" fontSize={25} >
            {"You currently have no farm(s) to show"}
          </Heading>
        </Box>
      </Box>
      </Box>
    </Layout>
  );
};

export default FarmBoard;
