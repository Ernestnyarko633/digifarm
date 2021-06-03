/*eslint-disable*/
import { Avatar, Box, Grid, Heading, Flex, Text, Link } from '@chakra-ui/react'
import EventCard from 'components/Cards/EventCard'
import React from 'react'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'
import { Button } from 'components'
import useApi from 'context/api'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'
import { Link as ReachRouter } from 'react-router-dom'

const RightSidebar = ({ onOpen, setSelectedData }) => {
  const [doc, setDocData] = React.useState(null)
  const [reload, setReload] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const { getCooperatives } = useApi()
  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch(null, getCooperatives, reload)


  const mapKey = index => index
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  React.useEffect(() => {
    let mounted = true
    if (mounted && !doc) {
      const fetchData = async () => {
        setLoading(true)
        const response = await Client.query(
          Prismic.Predicates.at('document.type', 'announcements')
        )
        if (response) {
          setDocData(response.results)
        }

        setLoading(false)
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, doc])

  return (
    <Box
      pt={{ base: 12, md: 28 }}
      right={{ md: 0 }}
      bg={{ md: 'white' }}
      as='aside'
      bottom={{ md: 0 }}
      pos={{ md: 'fixed' }}
      px={{ md: 5, xl: 10 }}
      h={{ lg: '100vh' }}
      w={{ md: '22%', xl: '25%' }}
      overflowY='scroll'
    >
      <Heading
        as='h4'
        textTransform='uppercase'
        fontSize={{ base: 'lg', md: '2xl' }}
        fontWeight={700}
        borderBottomWidth={1}
        borderBottomColor='gray.300'
        pb={2}
      >
        Events
      </Heading>

    {  (loading) ? (<FetchCard
      direction="column"
      align="center"
      justify="center"
      mx="auto"
      reload={null}
      loading={loading}
      error={null}
      text="Standby as we load your cooperatives"
     
     />) : <Grid gap={4} mt={4} minH={{ base: 30, md: 64 }}>
        {doc?.map((event, i) => (
          <EventCard
            key={mapKey(i)}
            onOpen={onOpen}
            setSelectedData={setSelectedData}
            event={event}
          />
        ))}
      </Grid>}
     { (isLoading || error) ? (<FetchCard
      direction="column"
      align="center"
      justify="center"
      mx="auto"
      reload={() => {
       
          triggerReload();
      }}
      loading={isLoading}
      error={error}
      text="Standby as we load your cooperatives"
     
     />) : <Box mt='76px'>
        <Heading
          as='h4'
          fontSize={{ base: 'lg', md: '2xl' }}
          fontWeight={700}
          borderBottomWidth={1}
          borderBottomColor='gray.300'
          pb={2}
        >
          My cooperatives
        </Heading>
        {
        
        
        data?.length
          ? data?.map(coop => (
              <Box
                borderWidth={1}
                borderColor='gray.300'
                borderRadius='10px'
                maxW={{ md: 87 }}
                w={{ md: 87 }}
                h={{ md: '199px' }}
                my='16px'
              >
              <Flex p='16px'>
                  <Avatar name={coop?.name} src={coop?.imageUrl} size='xl' />
                  <Box ml={3}>
                  <Heading fontSize='20px'>{coop?.name}</Heading>
                  <Text fontSize='14px' pt='10px'>
                      {coop?.product?.cropVariety?.crop?.name}{' '}
                      <Text as='span'>
                      ( {coop?.product?.cropVariety?.crop?.sciName})
                    </Text>{' '}
                      <Text as='span'> # {coop?.product?.name}</Text>
                    </Text>
                  <Text pt='6px'> {coop?.users?.length} members</Text>
                </Box>
                </Flex>
              <Flex justify='center' pb='24px'>
                  <Link
                    as={ReachRouter}
                    to={{
                      pathname: `/cooperative-main/${coop?._id}`,
                      state: { _id: coop?._id }
                    }}
                    _hover={{ textDecor: 'none' }}
                  >
                  <Button
                      btntitle='View details'
                      color='#31BC2E'
                      colorScheme='none'
                      borderWidth={1}
                      w={{ base: '250px', md: '345px' }}
                      borderColor='gray.300'
                      borderRadius='md'
                      fontSize='14px'
                    />
                </Link>
                </Flex>
            </Box>
            ))
          : null}
      </Box>}
    </Box>
  )
}

export default RightSidebar
