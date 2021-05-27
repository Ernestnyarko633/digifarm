/* eslint-disable */
import { Avatar, Box, Grid, Heading, Flex, Text , Link} from "@chakra-ui/react";
import EventCard from "components/Cards/EventCard";
import React from "react";
import Prismic from "prismic-javascript";
import getConfig from "utils/configs";
import { Button } from "components";
import useApi from 'context/api'
import useFetch from "hooks/useFetch";
import FetchCard from "components/FetchCard";
import { Link as ReachRouter } from 'react-router-dom'


const RightSidebar = ({ onOpen, setSelectedData }) => {
  const [doc, setDocData] = React.useState(null);
  const [reload, setReload] = React.useState(0)

  const { getCooperatives } = useApi()
  const triggerReload = () => setReload(prevState => prevState + 1)


  const {data, isLoading, error} =useFetch(null, getCooperatives, reload)
  console.log('data',data)


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

      <Grid gap={4} mt={4} minH={{ base: 30, md: 64 }}>
        {doc?.map((event, i) => (
          <EventCard
            key={mapKey(i)}
            onOpen={onOpen}
            setSelectedData={setSelectedData}
            event={event}
          />
        ))}
      </Grid>
      <Box mt='76px'>
          <Heading
            as="h4"
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight={700}
            borderBottomWidth={1}
            borderBottomColor="gray.300"
            pb={2}
          >
            My cooperatives
          </Heading>

          {
            isLoading || error ?(
              <Box  my={4}>
                  <FetchCard
                  direction='column'
                  align='center'
                  justify='center'
                  reload={triggerReload}
                  loading={isLoading}
                  error={error}
                  text='loading cooperatives...'
                />
              </Box>
            ): (
                <Box borderWidth={1} borderColor='gray.300' borderRadius='10px'  maxW={{ md: 87 }} w={{ md: 87 }} h={{ md:'199px'}} my='16px'>
                  <Flex p='16px'>
                    <Avatar name='Kim' size='xl' />
                    <Box ml={3}>
                      <Heading fontSize='20px' >{data?.name}</Heading>
                      <Text fontSize='14px' pt='10px'>{data?.product?.cropVariety?.crop?.name} <Text as='span'>(  {data?.product?.cropVariety?.crop?.sciName})</Text> <Text as='span'> # {data?.product?.name}</Text></Text>
                      <Text pt='6px'> {data?.users?.length} members</Text>
                    </Box>
                  </Flex>
                  <Flex justify='center' pb='24px' >
                    <Link as={ReachRouter} 
                      to={{
                        pathname: `/cooperative-main/${data?._id}`,
                        state: { _id: data?._id }
                      }}
                      _hover={{ textDecor: 'none' }}
                    >
                      <Button btntitle='View details' color='#31BC2E' colorScheme='none' borderWidth={1} w='345px' 
                          borderColor='gray.300'
                          borderRadius='md' fontSize='14px'/>
                    </Link>
                  </Flex>
                </Box>
            )
          }
      </Box>
    </Box>
  );
};

export default RightSidebar;
