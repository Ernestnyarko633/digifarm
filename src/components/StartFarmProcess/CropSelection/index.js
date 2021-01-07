import { Box, Heading } from '@chakra-ui/react'
import Tabs from 'components/Tabs/Tabs'
import useComponent from 'context/component'
import React from 'react'
import FarmDetails from './FarmDetails'

const CropSelection = () => {
  const { handleNext } = useComponent()

  return (
    <Box mt={{ md: 32 }} w='90%' mx='auto'>
      <Box textAlign='center' mb={10}>
        <Heading as='h4' size='xl'>
          Which Farm is right for you.
        </Heading>
      </Box>

      <Box>
        <Tabs direction='row' py={0} px={0}>
          <Box label='Top-selling farm'>
            <FarmDetails handleNext={handleNext} />
          </Box>
          <Box label='Grains & Cereals'>
            <FarmDetails handleNext={handleNext} />
          </Box>
          <Box label='Roots & Tubers'>
            <FarmDetails handleNext={handleNext} />
          </Box>
          <Box label='Vegetables & Spices'>
            <FarmDetails handleNext={handleNext} />
          </Box>
        </Tabs>
      </Box>
    </Box>
  )
}

export default CropSelection
