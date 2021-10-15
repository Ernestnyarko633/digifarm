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
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'
import CooperativesCard from 'components/Cards/CooperativesCard'
import FarmManagerUpdateCard from 'components/Cards/FarmManagerUpdateCard'
import { useQuery } from 'react-query'
import { usePrismic } from 'hooks/useFarmBoard'

const RightSidebar = ({ onOpen, setSelectedData }) => {
  const { getCooperatives } = useApi()
  const {
    managerUpdates: farmUpdates,
    announcements,
    loading,
    refetch: PrismicRefetch,
    error: PrismicError
  } = usePrismic()

  const { data, isLoading, error, refetch } = useQuery('cooperatives', () =>
    getCooperatives()
  )

  const triggerReload = () => {
    PrismicError && PrismicRefetch()
    error && refetch()
  }

  const Header = ({ title }) => {
    return (
      <Heading
        as='h4'
        textTransform='uppercase'
        fontSize={{ base: 'lg', md: '1xl' }}
        fontWeight={700}
        borderBottomColor='gray.300'
        pb={2}
      >
        {title}
      </Heading>
    )
  }

  Header.propTypes = {
    title: PropTypes.string
  }

  const mapKey = index => index

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
      <Box>
        <Tabs>
          <TabList borderBottomWidth={1} mx='auto'>
            <Tab _selected={{ color: 'cf.400' }} mx='left'>
              <Header title='Updates' />
            </Tab>

            <Tab _selected={{ color: 'cf.400' }} mx='auto'>
              <Header title='Events' />
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box my={2}>
                {loading ? (
                  <FetchCard
                    align='center'
                    direction='column'
                    mx='auto'
                    justify='center'
                    h={{ xl: 80 }}
                    w='100%'
                    loading={loading}
                    reload={null}
                    text='Loading updates'
                    error={null}
                  />
                ) : (
                  <>
                    {farmUpdates?.length > 0 ? (
                      <Box h={{ base: 90, md: 90 }}>
                        <Grid overflowY='scroll' gap={4} my={4} px={2}>
                          {farmUpdates?.map((update, i) => (
                            <FarmManagerUpdateCard
                              key={mapKey(i)}
                              update={update}
                            />
                          ))}
                        </Grid>
                      </Box>
                    ) : (
                      <Box w='80%' m='auto'>
                        <Text
                          py='auto'
                          as='h4'
                          fontSize={{ base: 'sm', md: 'md' }}
                          align='center'
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
                      <Box w='80%' m='auto'>
                        <Text
                          as='h4'
                          py='auto'
                          align='center'
                          fontSize={{ base: 'sm', md: 'md' }}
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
          w='100%'
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
              {data.data?.map((coop, i) => (
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
