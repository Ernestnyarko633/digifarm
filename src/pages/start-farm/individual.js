import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'

import useStartFarm from 'context/start-farm'

import CropSelection from 'components/StartFarmProcess/CropSelection'
import OtherSteps from 'components/StartFarmProcess/OtherSteps'

const Individual = props => {
  document.title = 'Complete Farmer | Individual'

  const { step } = useStartFarm()

  React.useEffect(() => {
    return () => {
      // clear cache data in session storage
      sessionStorage.removeItem('categories')
      sessionStorage.removeItem('farms')
    }
  }, [])

  const getFlow = key => {
    switch (key) {
      case 0:
        return <CropSelection />
      case 1:
        return <OtherSteps {...props} />
      default:
        return null
    }
  }

  return (
    <Box w='100%' h='100vh' bgColor='white'>
      <Flex
        h={20}
        top={0}
        bgColor='white'
        w='100vw'
        shadow='md'
        pos='fixed'
        zIndex={999}
        align='center'
        px={{ base: 4, md: 20 }}
      >
        <Box h={{ base: 10, md: 12 }}>
          <Image
            h='100%'
            src={require('../../assets/images/logo.png').default}
          />
        </Box>
      </Flex>

      {getFlow(step)}
    </Box>
  )
}

export default Individual
