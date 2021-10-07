/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Grid,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react'
import EventCard from 'components/Cards/EventCard'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'
import useApi from 'context/api'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'
import CooperativesCard from 'components/Cards/CooperativesCard'
import FarmManagerUpdateCard from 'components/Cards/FarmManagerUpdateCard'
import { useFarmData } from 'hooks/useFarmData'

const RightSidebar = ({ onOpen, setSelectedData }) => {
  const [announcements, setAnnouncementsData] = React.useState(null)
  const [managerUpdates, setManagerUpdatesData] = React.useState(null)
  const [errors, setErrors] = React.useState(null)

  const [reload, setReload] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const { getCooperatives } = useApi()
  const { myFarms } = useFarmData()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch(null, getCooperatives, reload)

  const mapKey = index => index
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  React.useEffect(() => {
    let mounted = true
    if (mounted && (!announcements || !managerUpdates)) {
      const fetchData = async () => {
        try {
          setLoading(true)
          // await news and video prismic documents
          const [announcements_response, managerUpdates_response] =
            await Promise.all([
              Client.query(
                Prismic.Predicates.at('document.type', 'announcements'),
                {
                  pageSize: 200
                }
              ),
              Client.query(
                Prismic.Predicates.at('document.type', 'manager_update'),
                { pageSize: 200 }
              )
            ])

          // if response exists set the corresponding data
          if (announcements_response)
            setAnnouncementsData(announcements_response?.results || [])
          if (managerUpdates_response)
            setManagerUpdatesData(managerUpdates_response?.results || [])
        } catch (err) {
          // catch errors if any and st them
          setErrors(err?.message || err || 'Could not fetch data')
        } finally {
          //finally set loading too false
          setLoading(false)
        }
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, announcements, managerUpdates])

  // filtering farm manager updates to get updates for farms bought by digital farmer;
  const farmUpdates =
    managerUpdates
      ?.filter(update => {
        const x = myFarms?.find(
          farm => farm?.order?.product?._id === update?.data?.farm_id[0]?.text
        )
        if (x) {
          return update
        }
        return null
      })
      .sort(
        (a, b) =>
          new Date(b.first_publication_date) -
          new Date(a.first_publication_date)
      ) || []

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
      {/* {loading ? (
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
          text='Loading farm manager`s updates'
        />
      ) : (
        <>
          {farmUpdates ? (
            <>
              <Heading
                as='h4'
                textTransform='uppercase'
                fontSize={{ base: 'lg', md: '1xl' }}
                fontWeight={700}
                borderBottomWidth={1}
                borderBottomColor='gray.300'
                pb={2}
              >
                Manager's Update
              </Heading>
              <Box
                overflowY='scroll'
                px={2}
                my={2}
                h={{ base: '20%', xl: '30%' }}
              >
                {farmUpdates?.map((update, i) => (
                  <FarmManagerUpdateCard key={mapKey(i)} update={update} />
                ))}
              </Box>
            </>
          ) : null}
        </>
      )}
      <Heading
        as='h4'
        textTransform='uppercase'
        fontSize={{ base: 'lg', md: '1xl' }}
        fontWeight={700}
        borderBottomWidth={1}
        borderBottomColor='gray.300'
        pb={2}
      >
        Events
      </Heading>
      <Box h='25%' px={2} my={2}>
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
              {announcements?.map((event, i) => (
                <EventCard
                  key={mapKey(i)}
                  onOpen={onOpen}
                  setSelectedData={setSelectedData}
                  event={event}
                />
              ))}
            </Grid>

            {/* <Grid gap={4} mt={4} mb={4} d={{ base: 'grid', md: 'none' }}>
              {doc?.map((event, i) => (
                <EventCard
                  key={mapKey(i)}
                  onOpen={onOpen}
                  setSelectedData={setSelectedData}
                  event={event}
                />
              ))}
            </Grid> */}
      {/* </> */}
      {/* )} */}
      {/* </Box> */}
      <Box>
        <Tabs>
          <TabList borderBottomWidth={1} mx='auto'>
            <Tab _selected={{ color: 'cf.400' }} mx='auto'>
              <Heading
                as='h4'
                textTransform='uppercase'
                fontSize={{ base: 'lg', md: '1xl' }}
                fontWeight={700}
                borderBottomColor='gray.300'
                pb={2}
              >
                Manager's Update
              </Heading>
            </Tab>

            <Tab _selected={{ color: 'cf.400' }} mx='auto'>
              <Heading
                as='h4'
                textTransform='uppercase'
                fontSize={{ base: 'lg', md: '1xl' }}
                fontWeight={700}
                borderBottomColor='gray.300'
                pb={2}
              >
                Events
              </Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box my={2}>
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
                    text='Loading farm manager`s updates'
                  />
                ) : (
                  <>
                    {farmUpdates?.length > 0 ? (
                      <Grid
                        // h={{ base: '20%', xl: '45%' }}
                        overflowY='scroll'
                        h={{ base: 80, md: 90 }}
                        gap={4}
                        mt={4}
                        mb={4}
                        px={2}
                      >
                        {farmUpdates?.map((update, i) => (
                          <FarmManagerUpdateCard
                            key={mapKey(i)}
                            update={update}
                          />
                        ))}
                      </Grid>
                    ) : (
                      <Box w='40%' m='auto'>
                        <Text
                          as='h4'
                          py='auto'
                          align='center'
                          fontSize={{ base: 'sm', md: 'md' }}
                          fontWeight='bold'
                          pb={2}
                        >
                          There's currently no update.
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box h={{ base: 80, md: 90 }} px={2} my={2}>
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
                    {announcements?.length > 0 ? (
                      <Grid
                        // h={{ base: '20%', xl: '45%' }}
                        overflowY='scroll'
                        gap={4}
                        mt={4}
                        mb={4}
                      >
                        {announcements?.map((event, i) => (
                          <EventCard
                            key={mapKey(i)}
                            onOpen={onOpen}
                            setSelectedData={setSelectedData}
                            event={event}
                          />
                        ))}
                      </Grid>
                    ) : (
                      <Box w='40%' m='auto'>
                        <Text
                          as='h4'
                          py='auto'
                          align='center'
                          fontSize={{ base: 'sm', md: 'md' }}
                          fontWeight='bold'
                          pb={2}
                        >
                          There are currently no upcoming events.
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
              fontSize={{ base: 'lg', md: '1xl' }}
              fontWeight={700}
              textTransform='uppercase'
              borderBottomWidth={1}
              borderBottomColor='gray.300'
              pb={2}
            >
              My cooperatives
            </Heading>
            <Box
              overflowY='scroll'
              d={{ base: 'block', md: 'block' }}
              my={{ base: 3, xl: 2 }}
              h={{ base: 80, md: 90 }}
              px={2}
            >
              {data.map((coop, i) => (
                <CooperativesCard coop={coop} key={mapKey(i)} />
              ))}
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
