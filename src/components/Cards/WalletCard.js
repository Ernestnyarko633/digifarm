/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon } from '@chakra-ui/react'
import { Box, Flex, Grid, Heading, Link, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import ExpenditureCard from './ExpenditureCard'
import { getFormattedMoney } from 'helpers/misc'
import Button from 'components/Button'
import { Link as ReachRouter } from 'react-router-dom'
import { HiLocationMarker } from 'react-icons/hi'
import { FirstLettersToUpperCase } from 'helpers/misc'
import { useQuery } from 'react-query'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard/index'
import useWallet from 'context/wallet'

const WalletCard = ({ acreage, price, farm }) => {
  const { farmExpense } = useWallet()
  const { getAllTasks, getActivities, getMyScheduledTasks, getMyFarmFeeds } =
    useApi()

  const {
    data: myFarmActivities,
    isLoading: myFarmActivitiesIsLoading,
    error: myFarmActivitiesHasError,
    refetch: myFarmActivitiesRefetch
  } = useQuery(
    [`${farm?.order?.product?._id}_activities`, farm?.order?.product?._id],
    () =>
      farm?.order?.product?._id &&
      getActivities({
        farm: farm?.order?.product?._id
      })
  )

  const {
    data: tasks,
    isLoading: tasksIsLoading,
    error: tasksHasError,
    refetch: tasksRefetch
  } = useQuery(
    ['tasks' + farm?.order?.product?._id, farm?.order?.product?._id],
    async () =>
      farm?.order?.product?._id &&
      (await getAllTasks({
        farm: farm?.order?.product?._id
      }))
  )

  console.log(tasks, 'tasks')

  const {
    data: ScheduledTasks,
    isLoading: ScheduledTasksIsLoading,
    error: ScheduledTasksHasError,
    refetch: ScheduledTasksRefetch
  } = useQuery(
    [`${farm?.order?.product?._id}_scheduled_tasks`, farm?.order?.product?._id],
    () =>
      farm?.order?.product?._id &&
      getMyScheduledTasks({
        farm: farm?.order?.product?._id
      })
  )

  const {
    data: farmFeeds,
    isLoading: farmFeedsIsLoading,
    error: farmFeedsHasError,
    refetch: farmFeedsRefetch
  } = useQuery(
    [`${farm?.order?.product?._id}_farm_feeds`, farm?.order?.product?._id],
    () =>
      farm?.order?.product?._id &&
      getMyFarmFeeds({
        farm: farm?.order?.product?._id
      })
  )

  const triggerReload = () => {
    ScheduledTasksHasError && ScheduledTasksRefetch()
    tasksHasError && tasksRefetch()
    myFarmActivitiesHasError && myFarmActivitiesRefetch()
    farmFeedsHasError && farmFeedsRefetch()
  }

  const loading =
    ScheduledTasksIsLoading ||
    tasksIsLoading ||
    myFarmActivitiesIsLoading ||
    farmFeedsIsLoading

  const error =
    ScheduledTasksHasError ||
    tasksHasError ||
    myFarmActivitiesHasError ||
    farmFeedsHasError

  return (
    <Box
      rounded='xl'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      bg='white'
      w={{ base: 82, md: 80 }}
      minH={{ md: 'auto' }}
    >
      <Box p={{ base: 4, md: 6 }} w='100%'>
        <Flex align='center' mb={4}>
          <Box mr={4}>
            <Avatar
              boxSize={16}
              bgColor='white'
              borderWidth='1px'
              borderColor='gray.300'
              src={farm?.order?.product?.cropVariety?.imageUrl}
            />
          </Box>

          <Flex direction='row' w='100%' justify='space-between'>
            <Flex align='flex-start' direction='column'>
              <Heading as='h4' fontSize={{ base: 'lg', md: '2xl' }}>
                {farm?.order?.product?.cropVariety?.crop?.name}
              </Heading>
              <Text
                ml={1}
                as='span'
                fontSize={{ base: 'tiny', md: 'sm' }}
                color='gray.500'
              >
                ({farm?.order?.product?.cropVariety?.name}) {farm?.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Divider orientation='horizontal' />

        <Flex direction='row' my={4}>
          <Icon
            mt={1}
            mr={1}
            as={HiLocationMarker}
            boxSize={4}
            color='gray.400'
          />
          <Text color='gray.500' mt={0} fontSize={{ base: 'xs', md: 'sm' }}>
            {FirstLettersToUpperCase(
              `${farm?.order?.product?.location?.name}, ${farm?.order?.product?.location?.country}`.toLowerCase()
            )}
          </Text>
        </Flex>

        {error || loading ? (
          <Box>
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              mx='auto'
              reload={() => {
                return (
                  (!farm?.length ||
                    !tasks?.data?.length ||
                    !myFarmActivities?.data?.length ||
                    !ScheduledTasks?.data?.length) &&
                  triggerReload()
                )
              }}
              loading={loading}
              error={error}
              text='Standby as we load your wallet and receipts'
            />
          </Box>
        ) : (
          <Grid gap={4}>
            <ExpenditureCard
              bg='yellow.light'
              amount={getFormattedMoney(
                farm?.order?.acreage *
                  farmExpense(
                    myFarmActivities?.data,
                    tasks?.data,
                    ScheduledTasks?.data
                  )
              )}
              action='spent'
              color='yellow.deep'
            />
            <ExpenditureCard
              bg='cf.light'
              action='available'
              amount={getFormattedMoney(farm?.order?.cost || price)}
            />
          </Grid>
        )}
        <Box mt={6}>
          <Link
            as={ReachRouter}
            to={{
              pathname: `/wallets/${farm?._id}`,
              state: {
                farm: farm || {},
                activities: myFarmActivities?.data || [],
                tasks: tasks?.data || [],
                farmfeeds: farmFeeds?.data || [],
                ScheduledTasks: ScheduledTasks?.data || [],
                wallet: getFormattedMoney(farm?.order?.cost || price),
                balance:
                  farm?.order?.cost >=
                  farm?.order?.acreage *
                    farmExpense(
                      myFarmActivities?.data,
                      tasks?.data,
                      ScheduledTasks?.data
                    )
                    ? getFormattedMoney(
                        farm?.order?.cost -
                          farm?.order?.acreage *
                            farmExpense(
                              myFarmActivities?.data,
                              tasks?.data,
                              ScheduledTasks?.data
                            )
                      )
                    : 0,
                expense: getFormattedMoney(
                  farm?.order?.acreage *
                    farmExpense(
                      myFarmActivities?.data,
                      tasks?.data,
                      ScheduledTasks?.data
                    )
                )
              }
            }}
            _hover={{ textDecor: 'none' }}
          >
            <Button
              btntitle='View farm wallet'
              width='100%'
              h={12}
              fontSize={{ base: 'md', md: 'lg' }}
              isDisabled={loading && !error}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

WalletCard.propTypes = {
  acreage: PropTypes.any,
  price: PropTypes.any,
  name: PropTypes.any,
  farm: PropTypes.object.isRequired
}

export default WalletCard
