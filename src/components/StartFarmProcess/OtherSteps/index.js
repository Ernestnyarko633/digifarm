/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Heading, Image, Text, useToast } from '@chakra-ui/react'
import { AnimateSharedLayout, motion } from 'framer-motion'

import useStartFarm from 'context/start-farm'
import useAuth from 'context/auth'

import Overlay from 'components/Loading/Overlay'
import Button from 'components/Button'

import AboutFarmManager from './AboutFarmManager'
import ChooseAcreage from './ChooseAcreage'
import PaymentOption from './PaymentOption'
import Confirmation from './Confirmation'

import Contract from './Contract'

import { getformattedDate } from 'helpers/misc'
import ReloadPage from 'components/Reload'

const MotionFlex = motion.custom(Flex)

const OtherSteps = ({ data, history: { push } }) => {
  const { user } = useAuth()
  const {
    text,
    order,
    otherStep,
    handlePrev,
    handleBack,
    selectedFarm,
    isSubmitting,
    handlePayment,
    handleNextStep,
    handleCreateOrder
  } = useStartFarm()

  const catName = sessionStorage.getItem('cat_name')
  const catFarms = JSON.parse(sessionStorage.getItem('farms'))

  const toast = useToast()

  window.onbeforeunload = function (event) {
    event.returnValue = 'Unsafed data maybe lost.'
  }

  console.log(catName)

  const getSteps = value => {
    switch (value) {
      case 0:
        return <AboutFarmManager farm={selectedFarm} />
      case 1:
        return <ChooseAcreage farm={selectedFarm} />
      case 2:
        return <Contract farm={selectedFarm} {...{ user }} />
      case 3:
        return <PaymentOption farm={selectedFarm} />
      case 4:
        return <Confirmation farm={selectedFarm} order={data || order} />
      default:
        return <ReloadPage />
    }
  }

  const handleAcceptAgreement = () => {
    if (user?.signature?.string) {
      handleCreateOrder()
    } else {
      toast({
        title: 'Action needed',
        description: 'You need to set up a profile signature',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
    }
  }

  const getForwardButtonProps = key => {
    switch (key) {
      case 2:
        return {
          title: 'Accept Agreement',
          width: 56,
          action: () => handleAcceptAgreement()
        }
      case 3:
        return {
          title: 'Next',
          width: 56,
          action: _ => handlePayment()
        }
      case 4:
        return {
          title: 'Continue to my Dashboard',
          width: 80,
          action: () => push('/dashboard')
        }
      default:
        return { title: 'Next', width: 56, action: handleNextStep }
    }
  }

  const { title, action, width } = getForwardButtonProps(otherStep)

  if (!catFarms) {
    push('/dashboard')
  }

  return (
    <>
      {isSubmitting && <Overlay text={text} />}
      <Flex
        mx='auto'
        w='100%'
        bg='cf-dark.400'
        justify='space-between'
        pt={{ base: 2, md: 8 }}
        px={{ md: 20 }}
        overflowX='scroll'
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'initial' }}
      >
        <Flex align='center'>
          <Heading as='h5' size='md' mr={{ md: 40 }} mb={{ base: 4, md: 0 }}>
            {catName}
          </Heading>
        </Flex>
        <Flex justify='space-between'>
          {catFarms?.slice(0, 4)?.map(farm => (
            <Flex
              key={farm._id}
              align='center'
              justify='center'
              direction='column'
              borderBottomWidth={
                (farm._id === selectedFarm?._id ||
                  farm._id === data?.product?._id) &&
                2
              }
              borderBottomColor={
                (farm._id === selectedFarm?._id ||
                  farm._id === data?.product?._id) &&
                'cf.400'
              }
            >
              <Text
                px={6}
                textTransform='uppercase'
                fontSize={{ base: 'xs', md: 'md' }}
              >
                {farm.cropVariety?.crop.name}
              </Text>
              <Text
                px={{ base: 1, md: 6 }}
                fontSize={{ base: 'x-small', md: 'tiny' }}
                textAlign={{ base: 'center', md: 'initial' }}
              >
                ({farm.cropVariety?.name}){' '}
                <Box as='br' display={{ md: 'none' }} /> #{farm?.name}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex
        align='center'
        justify='space-between'
        w={{ md: 143 }}
        mx='auto'
        mt={{ base: 5, md: 12 }}
        mb={4}
        px={{ base: 2, md: 0 }}
      >
        <Text fontSize={{ base: 'xs', md: 'sm' }} color='red.600' w='50%'>
          Farm starts :{' '}
          {getformattedDate(
            selectedFarm?.startDate || data?.product?.startDate,
            {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }
          )}
        </Text>
        <Flex
          py={1}
          align='center'
          rounded='30px'
          w={{ md: '11rem' }}
          px={{ base: 2, md: 4 }}
          borderWidth={1}
          borderColor='cf.400'
        >
          <Image
            h={4}
            src={
              require('../../../assets/images/startfarm/insurance.png').default
            }
          />
          <Text fontSize='sm' ml={2} color='cf.400'>
            Farm is insured
          </Text>
        </Flex>
      </Flex>

      <AnimateSharedLayout>
        <MotionFlex
          w={{ md: 143 }}
          h={{ md: 120 }}
          mx='auto'
          borderWidth={1}
          borderColor='gray.200'
          rounded='md'
          bgColor='white'
          overflow='hidden'
        >
          {getSteps(otherStep)}
        </MotionFlex>
      </AnimateSharedLayout>

      <Flex
        align='center'
        justify='center'
        mt={6}
        px={{ base: 4, md: 0 }}
        mb={{ base: 4, md: 0 }}
      >
        <Button
          h={12}
          width={40}
          fontSize='md'
          btntitle='Prev'
          color='gray.700'
          colorScheme='white'
          onClick={otherStep <= 0 ? handleBack : handlePrev}
          borderWidth={1}
        />
        <Button
          ml={{ base: 4, md: 6 }}
          h={12}
          fontSize={{ md: 'lg' }}
          width={width}
          btntitle={title}
          onClick={action}
        />
      </Flex>
    </>
  )
}

OtherSteps.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default OtherSteps
