/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import FetchCard from 'components/FetchCard'
import {
  Box,
  Grid,
  Text,
  Icon,
  Flex,
  Select,
  Heading,
  Divider,
  useToast,
  Skeleton,
  GridItem
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import useFetch from 'hooks/useFetch'
import useExternal from 'context/external'
import useStartFarm from 'context/start-farm'

import BaseSelect from 'components/Form/BaseSelect'
import FormRadio from 'components/Form/FormRadio'

import { getFormattedMoney } from 'helpers/misc'

import Constants from 'constant'

import AcreageInput from './AcreageInput'
import Map from 'components/Map/Map'
import { dateIntervals } from 'helpers/misc'
import useApi from 'context/api'

const options = ['Yes', 'No']

const MotionGrid = motion.custom(Grid)

const ChooseAcreage = ({ farm }) => {
  const { eosSearch } = useApi()
  const [isLoading, setLoading] = React.useState(false)
  const [location, setLocation] = React.useState([])
  const [center, setCenter] = React.useState([])
  const [reload, setReload] = React.useState(0)

  const triggerMapReload = () => setReload(prevState => prevState++)

  const {
    cycle,
    acreage,
    setCycle,
    currency,
    wantCycle,
    setCurrency,
    setWantCycle,
    exchangeRate,
    setExchangeRate
  } = useStartFarm()
  const { getExchangeRate } = useExternal()
  const toast = useToast()

  React.useEffect(() => {
    if (farm) {
      let location_ = []
      let center_ = []
      let _location = farm?.location
      let _center = _location?.center
      const strToNumber = (value, array) =>
        value?.forEach(coordinate => {
          return array?.push(
            coordinate.split(',').map(item => {
              return parseFloat(item, 10)
            })
          )
        })
      strToNumber(_location?.coords, location_)
      strToNumber(_center, center_)
      setLocation(location_)
      setCenter(center_)
    }
  }, [farm])

  let eosViewIdPayload = {
    fields: ['sceneID', 'cloudCoverage'],
    limit: 1,
    page: 1,
    search: {
      date: {
        from: dateIntervals()?.ThirtyDaysAgo,
        to: dateIntervals()?.today
      },
      cloudCoverage: {
        from: 0,
        to: 60
      },
      shape: {
        type: 'Polygon',
        coordinates: [location]
      }
    },
    sort: {
      date: 'desc'
    }
  }

  const {
    data: EOSViewID,
    isLoading: EOSViewIDIsLoading,
    error: EOSViewIDHasError
  } = useFetch(
    null,
    farm?._id && location.length > 0 ? eosSearch : null,
    reload,
    eosViewIdPayload,
    'sentinel2'
  )

  React.useEffect(() => {
    if (currency.id !== 'US') {
      ;(async () => {
        try {
          setLoading(true)
          const query = 'USD_' + currency.currencyId
          const res = await getExchangeRate({ q: query })
          if (res.data[query]) {
            setExchangeRate(res.data[query])
          }
        } catch (error) {
          toast({
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
            title: 'An error occurred.',
            description:
              (error?.data?.message ||
                error?.message ||
                'Unknown error occurred') + '.'
          })
        } finally {
          setLoading(false)
        }
      })()
    } else {
      setExchangeRate(1)
    }
  }, [setExchangeRate, getExchangeRate, currency, toast])

  const loading = EOSViewIDIsLoading
  const error = EOSViewIDHasError
  return (
    <MotionGrid templateColumns={{ md: 'repeat(2, 1fr)' }}>
      <GridItem w='100%' h='100%'>
        {(loading || error) && (
          <Flex w='100%' h='100%'>
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              mx='auto'
              reload={() => {
                error && triggerMapReload()
              }}
              loading={loading}
              error={error}
              text={
                !error
                  ? 'Standby as we load the map'
                  : 'Something went wrong, please dont fret'
              }
            />
          </Flex>
        )}
        {!loading && !error && EOSViewID?.results && (
          <Flex
            w='100%'
            h='90%'
            as={Map}
            viewID={EOSViewID?.results[0]?.view_id}
            loading={loading}
            error={error}
            band={null}
            center={center || location[0] || null}
            zoom={9}
          />
        )}
      </GridItem>
      <GridItem
        borderLeftWidth={1}
        borderLeftColor='gray.200'
        overflowY='scroll'
        css={{
          direction: 'ltr',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
        mb={10}
      >
        <Box css={{ direction: 'ltr' }} p={{ md: 10 }}>
          <Box>
            <Heading as='h6' size='md' mb={2}>
              About Location{' '}
              <Icon as={InfoIcon} color='cf.400' boxSize={4} mx={2} />
            </Heading>
            <Box
              rounded='md'
              padding={10}
              borderWidth={1}
              overflow='hidden'
              borderColor='gray.200'
            >
              <Box>
                <Heading as='h6' size='md'>
                  Ecological zone
                </Heading>
                <Text>Northern savanna</Text>
              </Box>
              <Divider orientation='horizontal' my={4} />
              <Box>
                <Heading as='h6' size='xs' mb={4}>
                  Weather
                </Heading>
                <Text mb={6}>
                  Weather Sandy loam soil is one of the most preferable types of
                  soil for many types of plants. Planting in loam soil with a
                  high percentage of sand is the same as planting in normal loam
                  soil, but extra amendments may be made to compensate for
                  slightly lower water
                </Text>
              </Box>
            </Box>
          </Box>
          <Box mt={10} px={{ base: 6, md: 0 }}>
            <Box>
              <Heading as='h5' size='sm'>
                Amount to get started
              </Heading>
              <Skeleton
                h={6}
                w={60}
                isLoaded={!isLoading}
                startColor='cf.300'
                endColor='cf.500'
              >
                <Flex alignItems='center' justifyContent='space-between'>
                  <Heading as='h5' fontSize='lg'>
                    {currency.currencySymbol}
                    {getFormattedMoney(farm.pricePerAcre * exchangeRate)}/
                    <Text as='span' fontWeight='normal' fontSize='sm'>
                      acre
                    </Text>
                  </Heading>
                  <Box>
                    <Select
                      w={20}
                      borderWidth={0}
                      defaultValue={JSON.stringify(currency)}
                      _focus={{
                        borderWidth: 0
                      }}
                      onChange={e => setCurrency(JSON.parse(e.target.value))}
                    >
                      {Constants.countries.map(currency => (
                        <option
                          key={currency.id}
                          value={JSON.stringify(currency)}
                        >
                          {currency.currencyId}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </Flex>
              </Skeleton>
            </Box>
            <Box
              p={5}
              mt={4}
              rounded='md'
              borderWidth={1}
              borderColor='gray.200'
            >
              <Heading as='h5' size='sm'>
                Choose number of acres to farm ({farm.acreage - acreage})
              </Heading>
              <Divider orientation='horizontal' my={5} />
              <Flex
                align='center'
                justify={{ base: 'space-between', md: 'initial' }}
              >
                <AcreageInput totalAcres={farm.acreage} />
                <Flex alignItems='center' marginLeft={{ md: 6 }}>
                  <Skeleton
                    h={6}
                    w={20}
                    isLoaded={!isLoading}
                    startColor='cf.300'
                    endColor='cf.500'
                  >
                    <Text fontSize='tiny' color='red.500'>
                      +{currency.currencySymbol}
                      {getFormattedMoney(
                        farm.pricePerAcre * exchangeRate * (acreage - 1)
                      )}
                    </Text>
                  </Skeleton>
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box mt={10} px={{ base: 6, md: 0 }}>
            <FormRadio
              icon
              state={wantCycle}
              options={options}
              onChange={e => {
                if (e === 'No') {
                  setCycle(1)
                }
                setWantCycle(e)
              }}
              title='Do you want to apply cycle for this farm?'
            />
          </Box>
          <Box my={10} px={{ base: 6, md: 0 }}>
            {wantCycle === 'Yes' && (
              <>
                <Heading as='h5' size='sm' mb={2}>
                  Choose number of cycles
                </Heading>
                <Box w='250px'>
                  <BaseSelect
                    id='cycle'
                    name='cycle'
                    value={[cycle]}
                    placeholder='1 cycle'
                    options={[2, 3, 4, 5]}
                    title='Choose number of cycle(s)'
                    setFieldValue={(name, value) => setCycle(value[0])}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </GridItem>
    </MotionGrid>
  )
}

ChooseAcreage.propTypes = {
  farm: PropTypes.object.isRequired
}

export default ChooseAcreage
