import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import Header from 'container/Header'
import useStartFarm from 'context/start-farm'
import CooperativeType from 'components/StartFarmProcess/CooperativeType'
import CropSelection from 'components/StartFarmProcess/CropSelection'
import CooperativeSteps from 'components/StartFarmProcess/CooperativeSteps'
const CooperativeFarm = ({ location, history }) => {
  document.title = 'Cooperative | Start Farm'

  const { state, selected } = location || {}
  const { step, setStep, setOtherStep } = useStartFarm()

  React.useEffect(() => {
    let mounted = true
    if (mounted && state?.step) {
      setStep(x => x + 1)
      setOtherStep(x => x + 4)
    }

    return () => (mounted = false)
  }, [state, setStep, setOtherStep])

  React.useEffect(() => {
    return () => {
      // clear cache data in session storage
      setStep(x => x * 0)
      setOtherStep(x => x * 0)
      sessionStorage.removeItem('categories')
      sessionStorage.removeItem('farms')
    }
  }, [setStep, setOtherStep])

  const getContent = value => {
    switch (value) {
      case 0:
        return <CooperativeType />
      case 1:
        return <CropSelection />
      case 2:
        return <CooperativeSteps data={selected} history={history} />
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <Box
        as='main'
        bgColor='white'
        w={{ md: '100vw' }}
        h={{ md: '100vh' }}
        mt={{ base: 14, md: 20, xl: 16 }}
      >
        {getContent(step)}
      </Box>
    </>
  )
}

CooperativeFarm.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default CooperativeFarm
