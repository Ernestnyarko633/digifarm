/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Grid, Heading, Flex, Text, Link } from '@chakra-ui/react'
import EventCard from 'components/Cards/EventCard'
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

  const { data, isLoading, error } = useFetch(
    'my_coop',
    getCooperatives,
    reload
  )

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
      {loading ? (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          mx='auto'
          w={{ xl: 24 }}
          h={{ xl: 80 }}
          reload={null}
          loading={loading}
          error={null}
          text='Loading events'
        />
      ) : (
        <Grid gap={4} mt={4}>
          {doc?.map((event, i) => (
            <EventCard
              key={mapKey(i)}
              onOpen={onOpen}
              setSelectedData={setSelectedData}
              event={event}
            />
          ))}
        </Grid>
      )}
      {isLoading || error ? (
        <FetchCard
          m='auto'
          w={{ xl: 24 }}
          h={{ xl: 80 }}
          direction='column'
          align='center'
          justify='center'
          reload={triggerReload}
          loading={isLoading}
          error={error}
          text='Loading cooperatives'
        />
      ) : (
        !!data?.length && (
          <Box mt={{ xl: 14 }}>
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
            {data.map(coop => (
              <Box
                borderWidth={1}
                borderColor='gray.300'
                borderRadius='10px'
                key={coop._id}
                my={{ lg: 4 }}
              >
                <Flex p={{ xl: 4 }}>
                  <Avatar name={coop?.name} src={coop?.imageUrl} size='lg' />
                  <Box ml={3}>
                    <Heading
                      as='h5'
                      fontSize={{ md: 'sm', xl: 'md', '5xl': 'lg' }}
                    >
                      {coop?.name}
                    </Heading>
                    <Text fontSize='sm' pt={2} lineHeight='shorter'>
                      {coop?.product?.cropVariety?.crop?.name} (
                      {coop?.product?.cropVariety?.crop?.sciName}) #
                      {coop?.product?.name}
                    </Text>
                    <Text fontSize='sm' pt={{ base: 1, lg: 2 }}>
                      {coop?.users?.length} members
                    </Text>
                  </Box>
                </Flex>
                <Flex justify='center' pb={{ xl: 4 }}>
                  <Link
                    as={ReachRouter}
                    to={{
                      pathname: `/cooperative-main/${coop?._id}`,
                      state: { _id: coop?._id }
                    }}
                    _hover={{ textDecor: 'none' }}
                    width='80%'
                  >
                    <Button
                      btntitle='View details'
                      color='#31BC2E'
                      colorScheme='none'
                      borderWidth={1}
                      width='100%'
                      borderColor='gray.300'
                      borderRadius='md'
                      fontSize='14px'
                    />
                  </Link>
                </Flex>
              </Box>
            ))}
          </Box>
        )
      )}
    </Box>
  )
}

RightSidebar.propTypes = {
  onOpen: PropTypes.func.isRequired,
  setSelectedData: PropTypes.any
}

export default RightSidebar
