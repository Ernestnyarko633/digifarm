import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { AnimateSharedLayout, motion } from 'framer-motion'

import useComponent from 'context/component'
import useStartFarm from 'context/start-farm'

import Button from 'components/Button'

import AboutFarmManager from './AboutFarmManager'
import ChooseAcreage from './ChooseAcreage'
import PaymentOption from './PaymentOption'
import Confirmation from './Confirmation'
import InviteLink from './InviteLink'
import Contract from './Contract'
import { getformattedDate } from 'helpers/misc'

const MotionFlex = motion.custom(Flex)

const OtherSteps = ({ history: { push } }) => {
  const { otherStep, handlePrev, handleNextStep, handleBack } = useComponent()
  const { selectedFarm } = useStartFarm()

  const catName = sessionStorage.getItem('cat_name')
  const catFarms = JSON.parse(sessionStorage.getItem('farms'))

  // const goHome = () => (window.location.pathname = '/dashboard')

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
      case 4:
        return <InviteLink farm={selectedFarm} />
      case 5:
        return <Confirmation farm={selectedFarm} />
      default:
        return null
    }
  }

  return (
    <Box>
      <Flex bg='cf-dark.400' h={20} mt={20}>
        <Flex justify='space-between' mx='auto' w={{ md: 145 }}>
          <Flex align='center'>
            <Heading as='h5' size='md' mr={{ md: 40 }}>
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
                <Text px={6} textTransform='uppercase'>
                  {farm.cropVariety?.crop.name}
                </Text>
                <Text px={6} fontSize='tiny'>
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
      >
        <Text fontSize='sm' color='red.600'>
          Farm starts :{' '}
          {getformattedDate(selectedFarm.startDate, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
        <Flex
          align='center'
          rounded='30px'
          px={4}
          py={1}
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
          layout='true'
          borderWidth={1}
          borderColor='gray.400'
          rounded='md'
          overflow='hidden'
        >
          {getSteps(otherStep)}
        </MotionFlex>
      </AnimateSharedLayout>

      <Flex align='center' justify='center' mt={6}>
        <Button
          btntitle='Prev'
          colorScheme='white'
          color='gray.700'
          width={56}
          fontSize='md'
          h={12}
          onClick={otherStep <= 0 ? handleBack : handlePrev}
        />
        <Button
          btntitle={otherStep === 5 ? 'Continue to my Dashboard' : 'Next'}
          ml={6}
          width={otherStep === 5 ? 70 : 56}
          fontSize='lg'
          h={12}
          onClick={otherStep === 5 ? () => push('/dashboard') : handleNextStep}
        />
      </Flex>
    </Box>
  )
}

OtherSteps.propTypes = {
  history: PropTypes.object.isRequired
}

export default OtherSteps
