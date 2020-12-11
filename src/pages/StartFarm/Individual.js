import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'
import CropSelection from 'components/StartFarmProcess/CropSelection'
import OtherSteps from 'components/StartFarmProcess/OtherSteps'
import useComponents from 'context/ComponentContext'

const Individual = () => {
  const { step } = useComponents()

  const getContent = (value) => {
    switch (value) {
      case 0:
        return <CropSelection />
      case 1:
        return <OtherSteps />
      default:
        return null
    }
  }

  return (
    <Box>
      <Flex align='center'
        w='100vw'
        h={{ md: 20 }}
        pos='fixed'
        top={0}
        bg='white'
        shadow='md'
        px={{ md: 20 }}>
        <Box h={{ md: 12 }}>
          <Image h='100%'
            src={require('../../assets/images/logo.png').default} />
        </Box>
      </Flex>

      {getContent(step)}
    </Box>
  )
}

export default Individual
