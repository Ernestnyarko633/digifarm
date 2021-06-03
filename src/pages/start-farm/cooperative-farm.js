/* eslint-disable no-console */
import React from 'react'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Header from '../../container/Header'
import useStartFarm from 'context/start-farm'
import CropSelection from 'components/StartFarmProcess/CropSelection'
import CooperativeSteps from '../../components/StartFarmProcess/CooperativeSteps'
const CooperativeFarm = ({ location, history }) => {
  document.title = 'Complete Farmer | Cooperative'

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
        return <CropSelection />
      case 1:
        return (
          <CooperativeSteps
            asMember={state}
            data={selected}
            history={history}
          />
        )
      default:
        return null
    }
  }

  return (
    <Box>
      <Header />
      <Box as='main' mt={{ base: 14, md: 20, xl: 24 }}>
        {getContent(step)}
      </Box>
    </Box>
  )
}

CooperativeFarm.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default CooperativeFarm
