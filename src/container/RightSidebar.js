import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Heading } from '@chakra-ui/react'
import EventCard from 'components/Cards/EventCard'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'
import CooperativesCard from 'components/Cards/CooperativesCard'
import { useQuery } from 'react-query'

const RightSidebar = ({ onOpen, setSelectedData }) => {
  const [doc, setDocData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const { getCooperatives } = useApi()

  const { data, isLoading, error, refetch } = useQuery('cooperatives', () =>
    getCooperatives()
  )

  const triggerReload = () => refetch()

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
      as='aside'
      right={{ md: 0 }}
      bg={{ md: 'white' }}
      bottom={{ md: 0 }}
      h={{ lg: '100vh' }}
      pos={{ md: 'fixed' }}
      px={{ md: 5, xl: 5 }}
      pt={{ base: 12, md: 24 }}
      pb={{ base: 24, md: 0 }}
      w={{ md: '22%', xl: '22%' }}
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

      <Box h='45%' px={2} my={2}>
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
          <>
            <Grid gap={4} mt={4} mb={4}>
              {doc?.map((event, i) => (
                <EventCard
                  key={mapKey(i)}
                  onOpen={onOpen}
                  setSelectedData={setSelectedData}
                  event={event}
                />
              ))}
            </Grid>

            <Grid gap={4} mt={4} mb={4} d={{ base: 'grid', md: 'none' }}>
              {doc?.map((event, i) => (
                <EventCard
                  key={mapKey(i)}
                  onOpen={onOpen}
                  setSelectedData={setSelectedData}
                  event={event}
                />
              ))}
            </Grid>
          </>
        )}
      </Box>

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
        !!data?.data?.length && (
          <>
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
            <Box
              overflowY='scroll'
              my={{ base: 3, xl: 2 }}
              h={{ base: '20%', xl: '40%' }}
              px={2}
            >
              <Box d={{ base: 'none', md: 'block' }}>
                <Box>
                  {data?.data?.map(coop => (
                    <CooperativesCard coop={coop} key={coop._id} />
                  ))}
                </Box>
              </Box>

              <Box d={{ base: 'block', md: 'none' }} overflowY='scroll'>
                {data?.data?.map(coop => (
                  <CooperativesCard coop={coop} key={coop._id} />
                ))}
              </Box>
            </Box>
          </>
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
