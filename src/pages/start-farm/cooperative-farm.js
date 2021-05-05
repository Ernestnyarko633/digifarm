import React from 'react'
import { Box } from '@chakra-ui/react'

import useStartFarm from 'context/start-farm'
import CropSelection from 'components/StartFarmProcess/CropSelection'
import OtherSteps from 'components/StartFarmProcess/OtherSteps'
import Header from '../../container/Header'

const CooperativeFarm = () => {
  document.title = 'Complete Farmer | Cooperative'

  const { step } = useStartFarm()

  const getContent = value => {
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
      <Header />
      {getContent(step)}
    </Box>
  )
}

export default CooperativeFarm
