import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Heading } from '@chakra-ui/react'
import EventCard from 'components/Cards/EventCard'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'
import useApi from 'context/api'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'
import CooperativesCard from 'components/Cards/CooperativesCard'
import { Scrollbars } from 'react-custom-scrollbars-2'

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
      as='aside'
      right={{ md: 0 }}
      bg={{ md: 'white' }}
      bottom={{ md: 0 }}
      h={{ lg: '100vh' }}
      pos={{ md: 'fixed' }}
      px={{ md: 5, xl: 5 }}
      pt={{ base: 12, md: 24 }}
      pb={{ base: 24, md: 0 }}
      w={{ md: '22%', xl: '25%' }}
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

      <Box h='45%' overflowY='hidden' px={2} my={2}>
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
          <Scrollbars style={{ height: '100%' }}>
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
          </Scrollbars>
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
        !!data?.length && (
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
            <Box my={{ base: 3, xl: 2 }} h={{ base: '20%', xl: '40%' }} px={2}>
              <Scrollbars style={{ height: '100%' }}>
                <Box>
                  {data.map(coop => (
                    <CooperativesCard coop={coop} key={coop._id} />
                  ))}
                </Box>
              </Scrollbars>
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
