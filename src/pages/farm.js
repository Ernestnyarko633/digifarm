/* eslint-disable no-console */
import React from 'react'
import { useParams } from 'react-router-dom'

import Spinner from 'components/FetchCard/Spinner'
import { Box, Flex, Text, Avatar, Icon, Button } from '@chakra-ui/react'
import { Menu } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import useFarm from 'context/farm'
import DynamicFarm from 'components/Dynamic'
import Header from 'container/Header'
import useAuth from 'context/auth'
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

import { isDateG8Today } from 'helpers/misc'

const MotionBox = motion(Box)

export default function Farm() {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { id } = useParams()
  const {
    triggerFarmReload,
    location,
    closed,
    farmIsLoading,
    farmHasError,
    ref,
    open,
    isOpen,
    onClose,
    image,
    farm,
    component,
    setComponent,
    setCompState,
    compState,
    setId
  } = useFarm()

  React.useEffect(() => {
    let mounted = true
    if (mounted && id) {
      setId(id)
    }

    return () => (mounted = false)
  }, [id, setId])

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

  return (
    <Spinner
      h='100vh'
      direction='column'
      align='center'
      justify='center'
      hook={{
        triggerReload: triggerFarmReload,
        loading: farmIsLoading,
        error: farmHasError,
        loadingText: "Standby as we load your farm's view"
      }}
      mx='auto'
    >
      <Box pos='relative' ref={ref}>
        <Share isOpen={isOpen} onClose={onClose} image={image} />
        <Header />
        <AnimatePresence>
          {farm?.order?.product?.startDate &&
            !isDateG8Today(farm?.order?.product?.startDate) &&
            open && (
              <FarmViewBanner
                date={farm?.order?.product?.startDate}
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
            {({ open: _open }) => (
              <>
                <Menu.Button as={Box} w='100%' _focus={{ outline: 'none' }}>
                  <Flex align='center' justify='space-between'>
                    <Box>
                      <Text fontSize='lg' fontWeight={800}>
                        {`${user?.firstName}`}'s farm
                      </Text>
                    </Box>

                    <Box>
                      <Icon as={_open ? chevronUp : chevronDown} boxSize={6} />
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

          <Box>{location?.length > 0 && <DynamicFarm />}</Box>

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
    </Spinner>
  )
}
