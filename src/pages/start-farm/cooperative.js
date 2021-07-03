import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import Header from 'container/Header'
import useStartFarm from 'context/start-farm'
import CooperativeType from 'components/StartFarmProcess/CooperativeType'
import CropSelection from 'components/StartFarmProcess/CropSelection'
import CooperativeSteps from 'components/StartFarmProcess/CooperativeSteps'
import { Scrollbars } from 'react-custom-scrollbars-2'

const CooperativeFarm = ({ location, history }) => {
  document.title = 'Cooperative | Start Farm'

  const { state, selected } = location || {}
  const {
    step,
    setStep,
    setOtherStep,
    setSelectedType,
    setBarrier,
    setInvites,
    setCooperative,
    setCooperativeName,
    setCoopImg,
    setSelectedCooperativeType,
    setAcres
  } = useStartFarm()

  React.useEffect(() => {
    let mounted = true
    if (mounted && (state?.step || state?.payment)) {
      setStep(x => x + 2)
      setOtherStep(x => x + 5)
    } else {
      if (!state?.user || !state) {
        setStep(x => x * 0)
        setOtherStep(x => x * 0)
        setCooperativeName(null)
        setSelectedType('')
        setBarrier(null)
        setCooperative(null)
        setInvites([])
        setCoopImg(false)
        setSelectedCooperativeType(null)
        setAcres(0)
        // clear cache data in session storage
        sessionStorage.removeItem('categories')
        sessionStorage.removeItem('farms')
      }
    }

    return () => (mounted = false)
  }, [
    state,
    setStep,
    setOtherStep,
    setCooperativeName,
    setSelectedType,
    setBarrier,
    setCooperative,
    setInvites,
    setCoopImg,
    setSelectedCooperativeType,
    setAcres
  ])

  const getContent = value => {
    switch (value) {
      case 0:
        return <CooperativeType />
      case 1:
        return <CropSelection />
      case 2:
        return (
          <CooperativeSteps
            asMember={state?.cooperative ? state : null}
            payment={state?.payment ? state : null}
            data={selected}
            history={history}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <Scrollbars style={{ height: '100vh' }}>
        <Box
          as='main'
          bgColor='white'
          w={{ md: '100vw' }}
          h={{ md: '100vh' }}
          mt={{ base: 14, md: 20, xl: 8 }}
          overflow='hidden'
        >
          {getContent(step)}
        </Box>
      </Scrollbars>
    </>
  )
}

CooperativeFarm.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default CooperativeFarm
