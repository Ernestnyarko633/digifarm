import { Box, Flex, Text, Avatar, Spinner } from '@chakra-ui/react'
import DynamicFarm from 'components/Dynamic'
import Header from 'container/Header'
import useAuth from 'context/auth'
import React, { useState, useEffect, useRef } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'
import { useParams } from 'react-router-dom'
import Share from 'components/Share'
import useFetch from 'hooks/useFetch'
import { dateIntervals } from 'helpers/misc'

export default function Farm() {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { id } = useParams()

  const ref = useRef(null)
  const [state, setState] = useState('compA')
  const [isOpen, setIsOpen] = useState(false)
  const [image, takeScreenShot] = useScreenshot()
  const [reload, setReload] = useState(0)
  const [location, setLocation] = useState([])
  const [center, setCenter] = useState([])
  const triggerReload = () => setReload(prevState => prevState + 1)

  const {
    getMyFarmFeeds,
    getAllTasks,
    getMyFarm,
    getActivities,
    getMyScheduledTasks
  } = useApi()

  const {
    data: farm,
    isLoading: farmIsLoading,
    error: farmHasError
  } = useFetch(null, getMyFarm, reload, id)

  useEffect(() => {
    let location_ = []
    let center_ = []
    let _location = farm?.order?.product?.location
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
  }, [farm])

  const {
    data: farmFeeds,
    isLoading: farmFeedsIsLoading,
    error: farmFeedsHasError
  } = useFetch(
    `${farm?.order?.product?._id}_farm_feeds`,
    farm?.order?.product?._id ? getMyFarmFeeds : null,
    reload,
    {
      farm: farm?.order?.product?._id
    }
  )

  const {
    data: ScheduledTasks,
    isLoading: ScheduledTasksIsLoading,
    error: ScheduledTasksHasError
  } = useFetch(
    `${farm?.order?.product?._id}_scheduled_tasks`,
    farm?.order?.product?._id ? getMyScheduledTasks : null,
    reload,
    {
      farm: farm?.order?.product?._id
    }
  )

  const {
    data: myFarmActivities,
    isLoading: myFarmActivitiesIsLoading,
    error: myFarmActivitiesHasError
  } = useFetch(
    `${farm?.order?.product?._id}_activities`,
    farm?.order?.product?._id ? getActivities : null,
    reload,
    {
      farm: farm?.order?.product?._id
    }
  )

  const {
    data: tasks,
    isLoading: tasksIsLoading,
    error: tasksHasError
  } = useFetch('tasks', getAllTasks, reload)

  const isLoading =
    farmFeedsIsLoading ||
    farmIsLoading ||
    ScheduledTasksIsLoading ||
    myFarmActivitiesIsLoading ||
    tasksIsLoading
  const hasError =
    farmFeedsHasError ||
    farmHasError ||
    ScheduledTasksHasError ||
    myFarmActivitiesHasError ||
    tasksHasError

  const onClose = () => setIsOpen(false)

  const onOpen = () => setIsOpen(true)

  const getImage = () => {
    takeScreenShot(ref.current)
    onOpen()
  }

  return (
    <Box pos='relative' ref={ref}>
      <Share isOpen={isOpen} onClose={onClose} image={image} />
      <Header />
      {isLoading && (
        <Flex
          w='100%'
          h={{ md: '900px' }}
          align={{ md: 'center' }}
          justify={{ md: 'center' }}
        >
          <Spinner color={{ md: 'cf.400' }} />
        </Flex>
      )}
      <Flex
        pos='fixed'
        top={20}
        w='100%'
        bg='cf-dark.600'
        align='center'
        justify='space-between'
        px={{ md: 20 }}
        h={{ md: 16 }}
        zIndex={50}
      >
        <Flex align='center'>
          <Box
            w={8}
            h={8}
            as={Avatar}
            src={user?.avatar}
            rounded='100%'
            bg='gray.400'
          />
          <Text ml={5}>{`${user?.firstName}`}'s farm</Text>
        </Flex>
        <Flex align='center'>
          <Box
            as='button'
            role='button'
            aria-label='farm button'
            px={{ md: 6 }}
            color={state === 'compA' ? 'cf.400' : ''}
            onClick={() => setState('compA')}
          >
            Farm
          </Box>
          <Box
            as='button'
            role='button'
            aria-label='document button'
            px={{ md: 6 }}
            color={state === 'compB' ? 'cf.400' : ''}
            onClick={() => setState('compB')}
          >
            Documents
          </Box>
          <Box
            as='button'
            role='button'
            aria-label='gallery button'
            px={{ md: 6 }}
            color={state === 'compC' ? 'cf.400' : ''}
            onClick={() => setState('compC')}
          >
            Gallery
          </Box>
          <Box
            as='button'
            role='button'
            aria-label='warehouse button'
            px={{ md: 6 }}
            color={state === 'compD' ? 'cf.400' : ''}
            onClick={() => setState('compD')}
          >
            Warehouse
          </Box>
        </Flex>
      </Flex>

      <Box bg='white'>
        {!isLoading && location?.length > 0 && (
          <DynamicFarm
            center={center}
            loading={isLoading}
            error={hasError}
            farm={state}
            tasks={tasks}
            activities={myFarmActivities}
            ScheduledTasks={ScheduledTasks}
            digitalFarmerFarm={farm}
            farmfeeds={farmFeeds}
            location={location}
            dateIntervals={dateIntervals}
            reload={reload}
            onOpen={getImage}
            reloads={[triggerReload]}
          />
        )}
        {isLoading && (
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            mx='auto'
            reload={() => {
              hasError && triggerReload()
            }}
            loading={isLoading}
            error={hasError}
            text={
              !hasError
                ? 'Standby as we load your current farms and pending orders'
                : 'Something went wrong, please dont fret'
            }
          />
        )}
      </Box>
    </Box>
  )
}
