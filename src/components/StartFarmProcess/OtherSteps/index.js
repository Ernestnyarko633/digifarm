import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import Button from 'components/Button'
import useComponent from 'context/component'
import { AnimateSharedLayout, motion } from 'framer-motion'
import React from 'react'
import AboutFarmManager from './AboutFarmManager'
import ChooseAcreage from './ChooseAcreage'
import Confirmation from './Confirmation'
import Contract from './Contract'
import InviteLink from './InviteLink'
import PaymentOption from './PaymentOption'

const MotionFlex = motion.custom(Flex)

const OtherSteps = () => {
  const { otherStep, handlePrev, handleNextStep, handleBack } = useComponent()

  function goHome() {
    return (window.location.pathname = '/dashboard')
  }

  const getSteps = value => {
    switch (value) {
      case 0:
        return <AboutFarmManager />
      case 1:
        return <ChooseAcreage />
      case 2:
        return <Contract />
      case 3:
        return <PaymentOption />
      case 4:
        return <InviteLink />
      case 5:
        return <Confirmation />
      default:
        return null
    }
  }
  return (
    <Box>
      <Flex
        align='center'
        justify='center'
        bg='gray.100'
        w='100%'
        h={20}
        mt={20}
      >
        <Heading as='h5' size='md' mr={{ md: 20 }}>
          Roots / Tubers
        </Heading>

        <Flex align='center' justify='space-between'>
          <Text px={6}>Ginger</Text>
          <Text px={6}>Chilli pepper</Text>
          <Text px={6}>Tiger nut</Text>
          <Text px={6}>Sweet potato</Text>
          <Text px={6}>Sorghum</Text>
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
          Farm starts : 2nd September, 2020
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
          layout
          w={{ md: 143 }}
          h={{ md: 120 }}
          mx='auto'
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
          md
          h={12}
          onClick={otherStep === 5 ? goHome : handleNextStep}
        />
      </Flex>
    </Box>
  )
}

export default OtherSteps
