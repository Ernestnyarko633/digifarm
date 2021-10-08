/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react'
import { Box, Flex, Text, Avatar, Icon, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useScreenshot } from 'use-react-screenshot'
import { Menu } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import DynamicFarm from 'components/Dynamic'
import Header from 'container/Header'
import useAuth from 'context/auth'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'
import Share from 'components/Share'
import FarmViewBanner from 'components/Modals/FarmViewBanner'
import {
  chevronDown,
  chevronUp,
  Weather,
  Calendar,
  Crop,
  FarmSchedule,
  Updates
} from 'theme/Icons'
import useComponent from 'context/component'

import { dateIntervals, isDateG8Today } from 'helpers/misc'
import { useQuery } from 'react-query'

const MotionBox = motion(Box)

export default function Farm() {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { id } = useParams()
  const { state } = useLocation()
  const ref = useRef(null)
  const [component, setComponent] = useState('compA')
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(true)
  const [image, takeScreenShot] = useScreenshot()
  const [location, setLocation] = useState([])
  const [center, setCenter] = useState([])

  // reloads

  const { compState, setCompState, setInViewProduct } = useComponent()

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
    error: farmHasError,
    refetch: farmRefetch
  } = useQuery(`selectedFarm_${id}`, () => id && !state && getMyFarm(id))

  const triggerFarmReload = () => farmRefetch()

  useEffect(() => {
    if (farm?.data?.order?.product || state?.order?.product?._id) {
      setInViewProduct(
        farm?.data?.order?.product._id || state?.order?.product?._id
      )
    }
  }, [farm?.data?.order?.product, setInViewProduct, state?.order?.product?._id])
  // lifecycle event to handle parsing of fms to coords to suitable data type for eos
  useEffect(() => {
    const new_location_coords = []
    const new_location_center = []
    const farm_location =
      state?.order?.product?.location || farm?.data?.order?.product?.location
    const farm_location_center = farm_location?.center
    // fms coords are in strings "1.2334,0.4543434"
    // function splits strings to two strings and then converts or parses them to numbers
    const strToNumber = (value, array) =>
      value?.forEach(coordinate => {
        return array?.push(
          coordinate.split(',').map(item => {
            return parseFloat(item, 10)
          })
        )
      })
    strToNumber(farm_location?.coords, new_location_coords)
    strToNumber(farm_location_center, new_location_center)
    setLocation(new_location_coords)
    setCenter(new_location_center)
  }, [farm, state?.order?.product?.location])

  const {
    data: farmFeeds,
    isLoading: farmFeedsIsLoading,
    error: farmFeedsHasError,
    refetch: farmFeedsRefetch
  } = useQuery(
    [
      `farm_feeds_${
        state?.order?.product?._id || farm?.data?.order?.product?._id
      }`,
      state?.order?.product?._id || farm?.data?.order?.product?._id
    ],
    () =>
      (state?.order?.product?._id || farm?.data?.order?.product?._id) &&
      getMyFarmFeeds({
        farm: state?.order?.product?._id || farm?.data?.order?.product?._id
      })
  )

  const {
    data: ScheduledTasks,
    isLoading: ScheduledTasksIsLoading,
    error: ScheduledTasksHasError,
    refetch: ScheduledTasksRefetch
  } = useQuery(
    [
      `scheduled_tasks_farm_${
        state?.order?.product?._id || farm?.data?.order?.product?._id
      }`,
      state?.order?.product?._id || farm?.data?.order?.product?._id
    ],
    () =>
      (state?.order?.product?._id || farm?.data?.order?.product?._id) &&
      getMyScheduledTasks({
        farm: state?.order?.product?._id || farm?.data?.order?.product?._id
      })
  )

  const {
    data: myFarmActivities,
    isLoading: myFarmActivitiesIsLoading,
    error: myFarmActivitiesHasError,
    refetch: myFarmActivitiesRefetch
  } = useQuery(
    [
      `activities_farm_${
        state?.order?.product?._id || farm?.data?.order?.product?._id
      }`,
      state?.order?.product?._id || farm?.data?.order?.product?._id
    ],
    () =>
      (state?.order?.product?._id || farm?.data?.order?.product?._id) &&
      getActivities({
        farm: state?.order?.product?._id || farm?.data?.order?.product?._id
      })
  )

  const {
    data: tasks,
    isLoading: tasksIsLoading,
    error: tasksHasError,
    refetch: tasksRefetch
  } = useQuery(
    [
      `tasks_farm_${
        state?.order?.product?._id || farm?.data?.order?.product?._id
      }`,
      state?.order?.product?._id || farm?.data?.order?.product?._id
    ],
    () =>
      (state?.order?.product?._id || farm?.data?.order?.product?._id) &&
      getAllTasks({
        farm: state?.order?.product?._id || farm?.data?.order?.product?._id
      })
  )

  const onClose = () => setIsOpen(false)
  const closed = () => setOpen(false)

  const onOpen = () => setIsOpen(true)

  const getImage = () => {
    takeScreenShot(ref.current)
    onOpen()
  }

  // trigger Reloads
  const triggerActivitiesReload = () => myFarmActivitiesRefetch()
  const triggerTasksReload = () => tasksRefetch()
  const triggerFarmFeedsReload = () => farmFeedsRefetch()
  const triggerScheduledTasksReload = () => ScheduledTasksRefetch()

  const menus = [
    { name: 'Farm', comp: 'compA' },
    { name: 'Documents', comp: 'compB' },
    { name: 'Gallery', comp: 'compC' },
    { name: 'Warehouse', comp: 'compD' }
  ]

  const bottomMenus = [
    { id: 1, name: 'Today’s tasks', icon: Calendar, state: 'compA' },
    { id: 2, name: 'Weather', icon: Weather, state: 'compB' },
    { id: 3, name: 'Crop health', icon: Crop, state: 'compC' },
    { id: 4, name: 'Scheduled events', icon: FarmSchedule, state: 'compD' },
    { id: 5, name: 'Manager updates', icon: Updates, state: 'compE' }
  ]

  const mapKey = index => index

  return farmIsLoading || farmHasError ? (
    <FetchCard
      h='100vh'
      direction='column'
      align='center'
      justify='center'
      mx='auto'
      reload={triggerFarmReload}
      loading={farmIsLoading}
      error={farmHasError}
      text={"Standby as we load your farm's view"}
    />
  ) : (
    <Box pos='relative' ref={ref}>
      <Share isOpen={isOpen} onClose={onClose} image={image} />
      <Header />
      <AnimatePresence>
        {farm?.data?.order?.product?.startDate &&
          !isDateG8Today(farm?.data?.order?.product?.startDate) &&
          open && (
            <FarmViewBanner
              date={farm?.data?.order?.product?.startDate}
              closed={closed}
            />
          )}
      </AnimatePresence>
      <Box bg='white'>
        <Flex
          pos='fixed'
          top={16}
          w='100%'
          bg='cf-dark.600'
          align='center'
          justify='space-between'
          px={{ md: 20 }}
          py={{ base: 3, md: 5 }}
          zIndex={50}
          d={{ base: 'none', md: 'flex' }}
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
            {menus.map((menu, idx) => (
              <Flex
                key={mapKey(idx)}
                _hover={{ background: 'transparent' }}
                bg='transparent'
                outlineColor='none'
                outline='none'
                as={Button}
                role='button'
                aria-label={`${menu.name} button`}
                px={{ md: 6 }}
                color={component === menu.comp ? 'cf.400' : ''}
                onClick={() => setComponent(menu.comp)}
              >
                {menu.name}
              </Flex>
            ))}
          </Flex>
        </Flex>

        <Menu
          as={Box}
          d={{ base: 'block', md: 'none' }}
          pos='fixed'
          top={14}
          zIndex={50}
          p={6}
          bg='#F7F7F7'
          boxShadow='0px 1px 24px rgba(0, 0, 0, 0.1)'
          w='100%'
        >
          {({ open }) => (
            <>
              <Menu.Button as={Box} w='100%' _focus={{ outline: 'none' }}>
                <Flex align='center' justify='space-between'>
                  <Box>
                    <Text fontSize='lg' fontWeight={800}>
                      {`${user?.firstName}`}'s farm
                    </Text>
                  </Box>

                  <Box>
                    <Icon as={open ? chevronUp : chevronDown} boxSize={6} />
                  </Box>
                </Flex>
              </Menu.Button>

              <Menu.Items
                as={MotionBox}
                _focus={{ outline: 'none' }}
                initial={{ y: -200 }}
                animate={{ y: 0, transition: { duration: 0.6 } }}
                exit={{ y: -200 }}
              >
                {menus.map((menu, idx) => (
                  <AnimatePresence key={mapKey(idx)}>
                    <Menu.Item
                      as={Box}
                      py={4}
                      borderBottomWidth={1}
                      _last={{ borderBlockWidth: 0 }}
                    >
                      <Box
                        color={component === menu.comp ? 'cf.400' : ''}
                        onClick={() => setComponent(menu.comp)}
                        as='button'
                        role='button'
                        aria-label={`${menu.name} button`}
                      >
                        {menu.name}
                      </Box>
                    </Menu.Item>
                  </AnimatePresence>
                ))}
              </Menu.Items>
            </>
          )}
        </Menu>

        <Box>
          {location?.length > 0 && (
            <DynamicFarm
              // loading
              farmFeedsIsLoading={farmFeedsIsLoading}
              ScheduledTasksIsLoading={ScheduledTasksIsLoading}
              myFarmActivitiesIsLoading={myFarmActivitiesIsLoading}
              tasksIsLoading={tasksIsLoading}
              // state
              farm={component}
              // data
              center={center || []}
              tasks={tasks?.data || []}
              activities={myFarmActivities?.data || []}
              ScheduledTasks={ScheduledTasks?.data || []}
              digitalFarmerFarm={farm?.data || state || {}}
              farmfeeds={farmFeeds?.data || []}
              location={location || []}
              // helpers
              dateIntervals={dateIntervals}
              onOpen={getImage}
              reloads={[
                triggerActivitiesReload,
                triggerTasksReload,
                triggerFarmFeedsReload,
                triggerScheduledTasksReload
              ]}
              // errors
              farmFeedsHasError={farmFeedsHasError}
              ScheduledTasksHasError={ScheduledTasksHasError}
              myFarmActivitiesHasError={myFarmActivitiesHasError}
              tasksHasError={tasksHasError}
            />
          )}
        </Box>

        {component === 'compA' && (
          <Flex
            align='center'
            justify='space-between'
            pos='fixed'
            bottom={0}
            h={16}
            d={{ base: 'flex', md: 'none' }}
            bg='white'
            shadow='lg'
            w='100%'
            zIndex={50}
            px={4}
          >
            {bottomMenus.map(item => (
              <Box
                as='button'
                role='button'
                aria-label={`${item.name} button`}
                key={item.id}
                align='center'
                onClick={() => setCompState(item.state)}
                color={compState === item.state ? 'cf.400' : ''}
              >
                <Icon as={item.icon} />
                <Text fontSize={9}>{item.name}</Text>
              </Box>
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  )
}
