/* eslint-disable */
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import EventCard from 'components/Cards/EventCard';
import React from 'react';
import Prismic from 'prismic-javascript';
import getConfig from 'utils/configs';

const RightSidebar = () => {
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig();

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN,
  });

  const [doc, setDocData] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    if (mounted && !doc) {
      const fetchData = async () => {
        const response = await Client.query(
          Prismic.Predicates.at('document.type', 'announcements')
        );
        if (response) {
          setDocData(response.results);
        }
      };
      fetchData();
    }
    return () => (mounted = false);
  }, [Client, doc]);

  console.log('events', doc);

  return (
    <Box
      pt={28}
      right={0}
      bg='white'
      as='aside'
      bottom={0}
      pos='fixed'
      px={{ md: 10 }}
      h={{ lg: '100vh' }}
      w={{ md: '22%' }}
    >
      <Heading
        as='h4'
        textTransform='uppercase'
        fontSize={{ md: '2xl' }}
        fontWeight={700}
        borderBottomWidth={1}
        borderBottomColor='gray.300'
        pb={2}
      >
        Events
      </Heading>

      <Text fontSize='sm' color='gray.500' mt={3}>
        Growing conditions are currently perfect. Some irriagation work is being
        performed
      </Text>

      <Grid gap={4} mt={{ md: 4 }} maxH={{ md: 90 }}>
        <EventCard />
        <EventCard />
      </Grid>
    </Box>
  );
};

export default RightSidebar;
