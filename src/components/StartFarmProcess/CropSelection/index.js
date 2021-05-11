import React, { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

import useStartFarm from "context/start-farm";
import useApi from "context/api";

import useFetch from "hooks/useFetch";

import Tabs from "components/Tabs/Tabs";
import FetchCard from "components/FetchCard";
import FarmDetails from "./FarmDetails";
import { Button } from "../../index";

const CropSelection = () => {
  const { handleNext } = useStartFarm();

  const [reload, setReload] = useState(0);

  const { getCropCategories } = useApi();

  const triggerReload = () => setReload((prevState) => prevState + 1);

  const { data, isLoading, error } = useFetch(
    "categories",
    getCropCategories,
    reload
  );

  let categories = [];

  if (data) {
    categories = [{ _id: "defualt", title: "Top-selling farms" }, ...data];
  }

  return (
    <Box w="90%" mx="auto" mt={{ base: 20, md: 0 }}>
      <Box textAlign="center" py={10}>
        <Heading as="h4" size={{ base: "lg", md: "xl" }}>
          Which Farm is right for you?
        </Heading>
      </Box>
      <Box pos="relative">
        {isLoading || error ? (
          <FetchCard
            w="100%"
            mx="auto"
            align="center"
            justify="center"
            direction="column"
            error={error}
            loading={isLoading}
            reload={triggerReload}
          />
        ) : (
          <Tabs
            py="0"
            px="0"
            boxWidth="100%"
            direction={{ base: "column", md: "row" }}
            display={{ base: "flex", md: "block" }}
            width={{ base: "100%", md: "initial" }}
          >
            {categories?.map((cat) => (
              <Box key={cat._id} label={cat.title}>
                <FarmDetails
                  catName={cat.title}
                  query={
                    cat._id !== "defualt" && { category: cat._id, status: 1 }
                  }
                />
              </Box>
            ))}
          </Tabs>
        )}
      </Box>
      <Box textAlign="right" my={6}>
        {!isLoading && (
          <Button
            btntitle="Continue"
            w={{ base: 70, md: 40 }}
            h={12}
            ms
            fontSize="md"
            onClick={handleNext}
          />
        )}
      </Box>
    </Box>
  );
};

export default CropSelection;
