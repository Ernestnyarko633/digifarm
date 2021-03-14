/*eslint-disable*/
import { Box, Flex, Text, Avatar , Stack,  Skeleton} from '@chakra-ui/react'
import DynamicFarm from 'components/Dynamic'
import Header from 'container/Header'
import useAuth from 'context/auth'
import React from 'react'
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

  const ref = React.useRef(null)
  const [state, setState] = React.useState('compA')
  const [isOpen, setIsOpen] = React.useState(false)
  const [image, takeScreenShot] = useScreenshot()
  const [reload, setReload] = React.useState(0)
  const [location, setLocation] = React.useState([])
  const triggerReload = () => setReload(prevState => prevState + 1)

  const {
    getMyFarmFeeds,
    getSourcingOrders,
    getAllTasks,
    getMyFarm,
    getActivities,
    getMyScheduledTasks
  } = useApi()

  const {
    data: yourFarm,
    isLoading: yourFarmIsLoading,
    error: yourFarmHasError
  } = useFetch(`${id}_digital_farmer_farm`, getMyFarm, reload, id)

  console.log("yourFarm", yourFarm)
  React.useEffect(() => {
    let location_ = []
    let _location = yourFarm?.order?.product?.location
    const getCoords = () =>
      _location?.coords?.forEach(coordinate => {
        return location_?.push(
          coordinate.split(',').map(item => {
            return parseFloat(item, 10)
          })
        )
      })
    getCoords()
    setLocation(location_)
  }, [yourFarm])

  const {
    data: yourFarmFeeds,
    isLoading: yourFarmFeedsIsLoading,
    error: yourFarmFeedsHasError
  } = useFetch(`${yourFarm?.order?.product?._id}_farm_feeds`, getMyFarmFeeds, reload, {
    farm: yourFarm?.order?.product?._id
  })

  const {
    data: SourcingOrders,
    isLoading: SourcingOrdersIsLoading,
    error: SourcingOrdersHasError
  } = useFetch(`${yourFarm?.order?.product?.cropVariety._id}_sourcing_orders`, getSourcingOrders, reload, {
    cropVariety: yourFarm?.order?.product?.cropVariety._id
  })

  const {
    data: ScheduledTasks,
    isLoading: ScheduledTasksIsLoading,
    error: ScheduledTasksHasError
  } = useFetch(`${yourFarm?.order?.product?._id}_scheduled_tasks`, getMyScheduledTasks, reload, {
    farm: yourFarm?.order?.product?._id
  })

  const {
    data: myFarmActivities,
    isLoading: myFarmActivitiesIsLoading,
    error: myFarmActivitiesHasError
  } = useFetch(`${yourFarm?.order?.product?.protocol?._id}_activities`, getActivities, reload, {
    protocol: yourFarm?.order?.product?.protocol?._id
  })

  const {
    data: tasks,
    isLoading: tasksIsLoading,
    error: tasksHasError
  } = useFetch(`tasks`, getAllTasks, reload)
  
  const isLoading =
  SourcingOrdersIsLoading ||
  yourFarmFeedsIsLoading ||
  yourFarmIsLoading ||
  ScheduledTasksIsLoading || myFarmActivitiesIsLoading || tasksIsLoading
  const hasError =
  SourcingOrdersHasError ||
  yourFarmFeedsHasError ||
  yourFarmHasError ||
  ScheduledTasksHasError || myFarmActivitiesHasError || tasksHasError

  
  console.log(isLoading, hasError, ScheduledTasks, yourFarm, yourFarmFeeds, "mustshow", location)
  const onClose = () => setIsOpen(false)

  const onOpen = () => setIsOpen(true)

  const getImage = () => {
    takeScreenShot(ref.current)
    onOpen()
  }

  if(isLoading){
    return(
      <Stack p={10} mt={24} spacing={4} w="auto" h="auto">
        <Skeleton bg='gray.100' height='20%' rounded='lg' />
        <Skeleton bg='gray.100' height='20%' rounded='lg' />
        <Skeleton bg='gray.100' height='20%' rounded='lg' />
        <Skeleton bg='gray.100' height='20%' rounded='lg' />
    </Stack>
    )
  }
  return (
    <Box pos='relative' ref={ref}>
      <Share isOpen={isOpen} onClose={onClose} image={image} />
      <Header />
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
            loading={isLoading}
            error={hasError}
            farm={state}
            tasks={tasks}
            activities={myFarmActivities}
            ScheduledTasks={ScheduledTasks}
            digitalFarmerFarm={yourFarm}
            farmfeeds={yourFarmFeeds}
            location={location}
            dateIntervals={dateIntervals}
            reload={reload}
            onOpen={getImage}
            reloads={[triggerReload]}
            sourcingOrders={SourcingOrders?.filter(order => order.demand === 0)}
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
