/* eslint-disable */
import { Box, Flex, Text, Avatar, Icon, Button } from '@chakra-ui/react';
import DynamicFarm from 'components/Dynamic';
import Header from 'container/Header';
import useAuth from 'context/auth';
import React, { useState, useEffect, useRef } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import useApi from 'context/api';
import FetchCard from 'components/FetchCard';
import { useParams } from 'react-router-dom';
import Share from 'components/Share';
import useFetch from 'hooks/useFetch';
import { dateIntervals } from 'helpers/misc';
import Fade from 'react-reveal/Fade';
import { Menu } from '@headlessui/react';
import {
  chevronDown,
  chevronUp,
  Weather,
  Calendar,
  Crop,
  FarmSchedule,
  Updates,
} from 'theme/Icons';
import { AnimatePresence, motion } from 'framer-motion';
import useComponent from 'context/component';

const MotionBox = motion.custom(Box);

export default function Farm() {
  const { isAuthenticated } = useAuth();
  const { user } = isAuthenticated();
  const { id } = useParams();

  const ref = useRef(null);
  const [state, setState] = useState('compA');
  const [isOpen, setIsOpen] = useState(false);
  const [image, takeScreenShot] = useScreenshot();
  const [reload, setReload] = useState(0);
  const [location, setLocation] = useState([]);
  const [center, setCenter] = useState([]);
  const triggerReload = () => setReload((prevState) => prevState + 1);

  const { compState, setCompState } = useComponent();

  const {
    getMyFarmFeeds,
    getAllTasks,
    getMyFarm,
    getActivities,
    getMyScheduledTasks,
  } = useApi();

  const {
    data: farm,
    isLoading: farmIsLoading,
    error: farmHasError,
  } = useFetch(null, getMyFarm, reload, id);

  useEffect(() => {
    let location_ = [];
    let center_ = [];
    let _location = farm?.order?.product?.location;
    let _center = _location?.center;
    const strToNumber = (value, array) =>
      value?.forEach((coordinate) => {
        return array?.push(
          coordinate.split(',').map((item) => {
            return parseFloat(item, 10);
          })
        );
      });
    strToNumber(_location?.coords, location_);
    strToNumber(_center, center_);
    setLocation(location_);
    setCenter(center_);
  }, [farm]);

  const {
    data: farmFeeds,
    isLoading: farmFeedsIsLoading,
    error: farmFeedsHasError,
  } = useFetch(
    null,
    farm?.order?.product?._id ? getMyFarmFeeds : null,
    reload,
    {
      farm: farm?.order?.product?._id,
    }
  );

  const {
    data: ScheduledTasks,
    isLoading: ScheduledTasksIsLoading,
    error: ScheduledTasksHasError,
  } = useFetch(
    null,
    farm?.order?.product?._id ? getMyScheduledTasks : null,
    reload,
    {
      farm: farm?.order?.product?._id,
    }
  );

  const {
    data: myFarmActivities,
    isLoading: myFarmActivitiesIsLoading,
    error: myFarmActivitiesHasError,
  } = useFetch(null, farm?.order?.product?._id ? getActivities : null, reload, {
    farm: farm?.order?.product?._id,
  });

  const {
    data: tasks,
    isLoading: tasksIsLoading,
    error: tasksHasError,
  } = useFetch(null, farm?.order?.product?._id ? getAllTasks : null, reload, {
    farm: farm?.order?.product?._id,
  });

  const isLoading =
    farmFeedsIsLoading ||
    farmIsLoading ||
    ScheduledTasksIsLoading ||
    myFarmActivitiesIsLoading ||
    tasksIsLoading;
  const hasError =
    farmFeedsHasError ||
    farmHasError ||
    ScheduledTasksHasError ||
    myFarmActivitiesHasError ||
    tasksHasError;

  const onClose = () => setIsOpen(false);

  const onOpen = () => setIsOpen(true);

  const getImage = () => {
    takeScreenShot(ref.current);
    onOpen();
  };

  const menus = [
    { name: 'Farm', comp: 'compA' },
    { name: 'Documents', comp: 'compB' },
    { name: 'Gallery', comp: 'compC' },
    { name: 'Warehouse', comp: 'compD' },
  ];

  const bottomMenus = [
    { id: 1, name: 'Today’s tasks', icon: Calendar, state: 'compA' },
    { id: 2, name: 'Weather', icon: Weather, state: 'compB' },
    { id: 3, name: 'Crop health', icon: Crop, state: 'compC' },
    { id: 4, name: 'Scheduled events', icon: FarmSchedule, state: 'compD' },
    { id: 5, name: 'Manager updates', icon: Updates, state: 'compE' },
  ];

  const mapKey = (index) => index;

  return isLoading || hasError ? (
    <FetchCard
      h='100vh'
      direction='column'
      align='center'
      justify='center'
      mx='auto'
      reload={triggerReload}
      loading={isLoading}
      error={hasError}
      text={`Standby as we load your farm's view`}
    />
  ) : (
    <Box pos='relative' ref={ref}>
      <Share isOpen={isOpen} onClose={onClose} image={image} />
      <Header />
      <Box bg='white'>
        <Flex
          pos='fixed'
          top={20}
          w='100%'
          bg='cf-dark.600'
          align='center'
          justify='space-between'
          px={{ md: 20 }}
          pt={{ md: 10 }}
          pb={{ md: 5 }}
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
          <Fade left>
            <Flex align='center'>
              {menus.map((menu, idx) => (
                <Fade key={mapKey(idx)} left>
                  <Flex
                    _hover={{ background: 'transparent' }}
                    bg='transparent'
                    outlineColor='none'
                    outline='none'
                    as={Button}
                    role='button'
                    aria-label={`${menu.name} button`}
                    px={{ md: 6 }}
                    color={state === menu.comp ? 'cf.400' : ''}
                    onClick={() => setState(menu.comp)}
                  >
                    {menu.name}
                  </Flex>
                </Fade>
              ))}
            </Flex>
          </Fade>
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
                  <AnimatePresence>
                    <Menu.Item
                      as={Box}
                      key={mapKey(idx)}
                      py={4}
                      borderBottomWidth={1}
                      _last={{ borderBlockWidth: 0 }}
                    >
                      <Box
                        color={state === menu.comp ? 'cf.400' : ''}
                        onClick={() => setState(menu.comp)}
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
                hasError && triggerReload();
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

        {/* <Box d={{ base: 'block', md: 'none' }}>
        {!loading && !EOSStatisticsIsLoading && (
          <FarmRightSidebar
            farmfeeds={farmfeeds}
            WeatherForeCasts={WeatherForeCasts}
            ScheduledTasks={ScheduledTasks}
            loading={loading || EOSStatisticsIsLoading}
            error={error || EOSStatisticsHasError}
            _error={_error}
            state={state}
            reloads={reloads}
            eosStats={EOSStatistics?.result}
            digitalFarmerFarm={digitalFarmerFarm}
            location={location}
          />
        )}
      </Box> */}

        {state === 'compA' && (
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
            {bottomMenus.map((item) => (
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
  );
}
