import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { AnimateSharedLayout, motion } from 'framer-motion'

import useStartFarm from 'context/start-farm'

import Overlay from 'components/Loading/Overlay'
import Button from 'components/Button'

import AboutFarmManager from './AboutFarmManager'
import ChooseAcreage from './ChooseAcreage'
import PaymentOption from './PaymentOption'
import Confirmation from './Confirmation'

// import InviteLink from './InviteLink'
import Contract from './Contract'

import { getformattedDate } from 'helpers/misc'

const MotionFlex = motion.custom(Flex)

const OtherSteps = ({ history: { push } }) => {
  const {
    text,
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

  const getSteps = value => {
    switch (value) {
      case 0:
        return <AboutFarmManager farm={selectedFarm} />
      case 1:
        return <ChooseAcreage farm={selectedFarm} />
      case 2:
        return <Contract farm={selectedFarm} />
      case 3:
        return <PaymentOption farm={selectedFarm} />
      // case 4:
      //   return <InviteLink farm={selectedFarm} />
      case 4:
        return <Confirmation farm={selectedFarm} />
      default:
        return null
    }
  }

  const getForwardButtonProps = key => {
    switch (key) {
      case 2:
        return {
          title: 'Accept Agreement',
          width: 56,
          action: handleCreateOrder
        }
      case 3:
        return {
          title: 'Next',
          width: 56,
          action: _ => handlePayment()
        }
      case 5:
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

  return (
    <>
      {isSubmitting && <Overlay text={text} />}
      <Flex
        bg='cf-dark.400'
        h={{ base: 28, md: 20 }}
        mt={{ base: 24, md: 20 }}
        mb={{ base: 10, md: 0 }}
        py={{ base: 2, md: 0 }}
      >
        <Flex
          justify='space-between'
          mx='auto'
          w={{ md: 145 }}
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
                borderBottomWidth={farm._id === selectedFarm._id && 2}
                borderBottomColor={farm._id === selectedFarm._id && 'cf.400'}
              >
                <Text
                  px={6}
                  textTransform='uppercase'
                  fontSize={{ base: 'sm', md: 'md' }}
                >
                  {farm.cropVariety?.crop.name}
                </Text>
                <Text
                  px={6}
                  fontSize='tiny'
                  textAlign={{ base: 'center', md: 'initial' }}
                >
                  ({farm.cropVariety?.name}) #{farm?.name}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        align='center'
        justify='space-between'
        w={{ md: 143 }}
        mx='auto'
        mt={{ md: 12 }}
        mb={4}
        px={{ base: 2, md: 0 }}
      >
        <Text fontSize='sm' color='red.600' w={{ base: 32, md: '100%' }}>
          Farm starts :{' '}
          {getformattedDate(selectedFarm.startDate, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
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
  history: PropTypes.object.isRequired
}

export default OtherSteps
