import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Button from 'components/Button'
import React from 'react'
import AboutFarmManager from './AboutFarmManager'
import ChooseAcreage from './ChooseAcreage'
import Confirmation from './Confirmation'
import Contract from './Contract'
import PaymentOption from './PaymentOption'

const OtherSteps = ({ handlePrev }) => {
  const [ step, setStep ] = React.useState(0)

  function handleNext() {
    setStep((prevActiveStep) => prevActiveStep + 1)
  }

  function handleBack() {
    setStep((prevActiveStep) => prevActiveStep - 1)
  }

  function goHome() {
    return (window.location.pathname = '/dashboard')
  }

  const getSteps = (value) => {
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
        return <Confirmation />
      default:
        return null
    }
  }
  return (
    <Box>
      <Flex align='center'
        justify='center'
        bg='gray.100'
        w='100%'
        h={20}
        mt={20}>
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

      <Flex mt={{ md: 12 }}
        w={{ md: 143 }}
        h={{ md: 120 }}
        mx='auto'
        borderWidth={1}
        borderColor='gray.400'
        rounded='md'
        overflow='hidden'>
        {getSteps(step)}
      </Flex>

      <Flex align='center' justify='center' mt={6}>
        <Button btntitle='Prev'
          colorScheme='white'
          color='gray.700'
          width={56}
          fontSize='md'
          h={12}
          onClick={step <= 0 ? handlePrev : handleBack} />
        <Button btntitle={step === 4 ? 'Continue to my Dashboard' : 'Next'}
          ml={6}
          width={step === 4 ? 70 : 56}
          fontSize='lg'
          md
          h={12}
          onClick={step === 4 ? goHome : handleNext} />
      </Flex>
    </Box>
  )
}

export default OtherSteps
