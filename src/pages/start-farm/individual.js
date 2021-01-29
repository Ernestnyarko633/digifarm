import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'

import CropSelection from 'components/StartFarmProcess/CropSelection'
import OtherSteps from 'components/StartFarmProcess/OtherSteps'

import useComponent from 'context/component'

const Individual = props => {
  document.title = 'Complete Farmer | Individual'

  const { step } = useComponent()

  const getContent = value => {
    switch (value) {
      case 0:
        return <CropSelection />
      case 1:
        return <OtherSteps {...props} />
      default:
        return null
    }
  }

  React.useEffect(() => {
    return () => {
      // clear cache data in session storage
      sessionStorage.removeItem('categories')
      sessionStorage.removeItem('farms')
    }
  }, [])

  return (
    <Box>
      <Flex
        align='center'
        w='100vw'
        h={{ md: 20 }}
        pos='fixed'
        top={0}
        bg='white'
        shadow='md'
        px={{ md: 20 }}
      >
        <Box h={{ md: 12 }}>
          <Image
            h='100%'
            src={require('../../assets/images/logo.png').default}
          />
        </Box>
      </Flex>

      {getContent(step)}
    </Box>
  )
}

export default Individual
