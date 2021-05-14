/* eslint-disable */
import { Box, Grid, Heading } from "@chakra-ui/react";
import EventCard from "components/Cards/EventCard";
import React from "react";
import Prismic from "prismic-javascript";
import getConfig from "utils/configs";

const RightSidebar = ({ onOpen, setSelectedData }) => {
  const [doc, setDocData] = React.useState(null);

  const mapKey = (index) => index;
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig();

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN,
  });

  React.useEffect(() => {
    let mounted = true;
    if (mounted && !doc) {
      const fetchData = async () => {
        const response = await Client.query(
          Prismic.Predicates.at("document.type", "announcements")
        );
        if (response) {
          setDocData(response.results);
        }
      };
      fetchData();
    }
    return () => (mounted = false);
  }, [Client, doc]);

  return (
    <Box
      pt={{ base: 12, md: 28 }}
      right={{ md: 0 }}
      bg={{ md: "white" }}
      as="aside"
      bottom={{ md: 0 }}
      pos={{ md: "fixed" }}
      px={{ md: 5, xl: 10 }}
      h={{ lg: "100vh" }}
      w={{ md: "22%", xl: "25%" }}
      overflowY="scroll"
    >
      <Heading
        as="h4"
        textTransform="uppercase"
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight={700}
        borderBottomWidth={1}
        borderBottomColor="gray.300"
        pb={2}
      >
        Events
      </Heading>

      <Grid gap={4} mt={4} minH={{ base: 64, md: 90 }}>
        {doc?.map((event, i) => (
          <EventCard
            key={mapKey(i)}
            onOpen={onOpen}
            setSelectedData={setSelectedData}
            event={event}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default RightSidebar;
