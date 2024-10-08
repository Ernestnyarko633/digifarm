/* eslint-disable no-console */
import { Box, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react'
import Button from 'components/Button'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BsArrowRight } from 'react-icons/bs'
import FarmDocumentCard from '../Cards/FarmDocumentCard'
import Doc from 'assets/images/doc.png'
import FetchCard from 'components/FetchCard'
import { Status } from 'helpers/misc'
import useFarm from 'context/farm'
export default function Individual({
  digitalFarmerFarm,
  activities,
  farmfeeds,
  tasks,
  ScheduledTasks,
  viewDoc,
  //errors
  farmFeedsHasError,
  ScheduledTasksHasError,
  myFarmActivitiesHasError,
  tasksHasError,
  //loading
  farmFeedsIsLoading,
  ScheduledTasksIsLoading,
  myFarmActivitiesIsLoading,
  tasksIsLoading
}) {
  const {
    ScheduledTasksRefetch,
    farmFeedsRefetch,
    tasksRefetch,
    myFarmActivitiesRefetch
  } = useFarm()
  const loading =
    farmFeedsIsLoading ||
    ScheduledTasksIsLoading ||
    myFarmActivitiesIsLoading ||
    tasksIsLoading
  const error =
    farmFeedsHasError ||
    ScheduledTasksHasError ||
    myFarmActivitiesHasError ||
    tasksHasError
  const [tempActs, setTempActs] = useState([])
  const [moreButton, setShowMoreButton] = useState(false)
  const [toggleText, setToggleText] = useState(false)
  const [reload, setReload] = useState(0)

  const triggerReload = () => {
    setReload(prevState => prevState + 1)
  }
  useEffect(() => {
    const _activities = _array =>
      activities?.forEach((_activity, index) => {
        if (index < 4) {
          _array.push(_activity)
        }
      })
    const _less = () => {
      let array = []
      if (activities?.length) {
        if (activities?.length > 4) setShowMoreButton(true)
        _activities(array)
      }
      if (array) {
        setToggleText(false)
        return setTempActs(array)
      }
      return setTempActs(activities)
    }
    _less()
  }, [activities, reload])

  const toggle = () => {
    if (tempActs?.length < activities?.length) {
      setToggleText(true)
      setTempActs(activities)
    }
    if (tempActs?.length === activities?.length) {
      triggerReload()
    }
  }

  const totalAmount = __activity => {
    let totaledAmount = 0
    let tempTasks = tasks?.filter(
      _task => _task.activity?._id === __activity._id
    )
    if (tempTasks) {
      tempTasks.forEach(_task => {
        totaledAmount = totaledAmount + _task?.budget
      })
    }
    return totaledAmount
  }

  return (
    <Box w='100%'>
      {loading || error ? (
        <Box pt={{ md: 10 }}>
          <FetchCard
            w='100%'
            direction='column'
            align='center'
            justify='center'
            mx='auto'
            reload={() => {
              farmFeedsHasError && farmFeedsRefetch()
              ScheduledTasksHasError && ScheduledTasksRefetch()
              myFarmActivitiesHasError && myFarmActivitiesRefetch()
              tasksHasError && tasksRefetch()
            }}
            loading={loading}
            error={error}
            text='Standby as we load your documents'
          />
        </Box>
      ) : (
        <>
          {tempActs?.length === 0 && (
            <Flex w='100%' justify='center' align='center' direction='column'>
              <Image src={Doc} py={{ md: 10 }} />
              <Heading as='h6' fontSize={18} fontWeight={800} mb={{ md: 5 }}>
                Your document is empty
              </Heading>
              <Text fontSize='xs'>
                Documents like receipts, contracts will show up here
              </Text>
            </Flex>
          )}
          <Grid
            templateColumns={{ md: 'repeat(2, 1fr)' }}
            gap={10}
            w={{ base: '100%' }}
          >
            {activities?.length > 0 &&
              tempActs?.length > 0 &&
              tempActs?.map(_activity => {
                return (
                  <FarmDocumentCard
                    farmfeeds={farmfeeds}
                    viewDoc={viewDoc}
                    key={_activity?._id}
                    digitalFarmerFarm={digitalFarmerFarm}
                    __activityID={_activity?._id}
                    title={_activity?.title}
                    ScheduledTasks={ScheduledTasks.filter(
                      _completedTask =>
                        _activity?._id ===
                          _completedTask?.task?.activity?._id &&
                        _completedTask?.status === Status?.COMPLETED
                    )}
                    tasksNumber={
                      tasks?.filter(
                        _task => _task?.activity?._id === _activity?._id
                      )?.length + 1
                    }
                    amount={
                      digitalFarmerFarm?.order?.acreage * totalAmount(_activity)
                    }
                  />
                )
              })}
          </Grid>

          {moreButton && (
            <Flex align='center' justify='center' mt={{ base: 6, md: 16 }}>
              <Button
                btntitle={!toggleText ? 'Show more' : 'Show less'}
                icon={BsArrowRight}
                bg='white'
                borderWidth={1}
                borderColor='cf.green'
                color='cf.green'
                rounded='30px'
                h={{ base: 10, md: 14 }}
                width={{ base: 40, md: 56 }}
                _hover={{ bg: 'white' }}
                shadow='none'
                fontSize='md'
                onClick={() => {
                  toggle()
                }}
              />
            </Flex>
          )}
        </>
      )}
    </Box>
  )
}

Individual.propTypes = {
  digitalFarmerFarm: PropTypes.any,
  activities: PropTypes.any,
  tasks: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  viewDoc: PropTypes.bool,
  farmfeeds: PropTypes.any,
  farmFeedsHasError: PropTypes.any,
  ScheduledTasksHasError: PropTypes.any,
  myFarmActivitiesHasError: PropTypes.any,
  tasksHasError: PropTypes.any,
  farmFeedsIsLoading: PropTypes.bool,
  ScheduledTasksIsLoading: PropTypes.bool,
  myFarmActivitiesIsLoading: PropTypes.bool,
  tasksIsLoading: PropTypes.bool,
  reloads: PropTypes.array
}
