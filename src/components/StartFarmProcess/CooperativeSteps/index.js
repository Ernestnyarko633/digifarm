import React from 'react'
import Overlay from '../../Loading/Overlay'
import { Flex, Image, Link, Text, useToast } from '@chakra-ui/react'
import { getFormattedDate, validateEmailAndAcrege } from '../../../helpers/misc'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../../Button'
import useAuth from '../../../context/auth'
import useStartFarm from '../../../context/start-farm'
import { useIntersection } from 'react-use'
import AboutFarmManager from '../OtherSteps/AboutFarmManager'
import Contract from '../OtherSteps/Contract'
import Confirmation from '../OtherSteps/Confirmation'
import ReloadPage from '../../Reload'
import CooperativeName from '../OtherSteps/CooperativeName'
import Acreage from './Acreage'
import PropTypes from 'prop-types'
import CooperativePayment from './CooperativePayment'
// import { useLocation } from 'react-router-dom'

const MotionFlex = motion(Flex)

const CooperativeSteps = ({ asMember, data, history, payment }) => {
  const { user } = useAuth()
  const {
    text,
    order,
    acres,
    setStep,
    invites,
    barrier,
    otherStep,
    handlePrev,
    handleBack,
    cooperative,
    coopConfigErrors,
    //selectedCooperativeType,
    selectedType,
    setOtherStep,
    selectedFarm,
    isSubmitting,
    handlePayment,
    handleNextStep,
    cooperativeName,
    handleCreateOrder,
    handleCreateCooperative,
    selectedCooperativeType
  } = useStartFarm()

  const catFarms = JSON.parse(sessionStorage.getItem('farms'))

  const toast = useToast()

  window.onbeforeunload = function (event) {
    event.returnValue = 'Unsaved data maybe lost.'
  }

  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  })

  React.useEffect(() => {
    if (payment?.payment) {
      // set step to  case 1
      setStep(x => {
        x = 2
        return x
      })

      // set otherSteps to case 5
      setOtherStep(x => {
        x = 5
        return x
      })
    } else if (!selectedType && !asMember) {
      setStep(x => x * 0)
      setOtherStep(x => x * 0)
    }
  }, [setStep, setOtherStep, selectedType, asMember, payment?.payment])

  React.useEffect(() => {
    if (!asMember && !catFarms && otherStep !== 5) {
      history.push('/dashboard')
    }
  }, [otherStep, history, asMember, catFarms])

  const getSteps = value => {
    switch (value) {
      case 0:
        return <AboutFarmManager farm={selectedFarm} />
      case 1:
        return <CooperativeName />
      case 2:
        return (
          <Acreage
            name={cooperativeName}
            farm={selectedFarm}
            selectedType={selectedType}
          />
        )
      case 3:
        return (
          <Contract
            farm={selectedFarm}
            {...{ user }}
            intersectionRef={intersectionRef}
          />
        )
      case 4:
        return <CooperativePayment farm={selectedFarm} asMember={asMember} />
      case 5:
        return (
          <Confirmation
            farm={
              selectedFarm ||
              JSON.parse(sessionStorage.getItem('selected_farm'))
            }
            order={payment?.data || order}
          />
        )
      default:
        return <ReloadPage />
    }
  }

  const handleAcceptAgreement = async () => {
    try {
      if (user?.signature?.string) {
        if (!asMember) {
          await handleCreateCooperative(selectedType?._id)
        } else {
          await handleCreateOrder(
            { _id: asMember?.cooperative?.data?._id },
            asMember?.acreage
          )
        }
      } else {
        toast({
          title: 'Action needed',
          description: 'You need to set up a profile signature',
          status: 'error',
          duration: 5000,
          position: 'top-right'
        })
      }
    } catch (error) {
      toast({
        title: 'Error Occured',
        description: 'Something went wrong',
        status: error?.statusCode,
        duration: 5000,
        position: 'top-right'
      })
    }
  }

  const getForwardButtonProps = key => {
    switch (key) {
      case 1:
        return {
          title: 'Next',
          width: 56,
          action: handleNextStep,
          disabled:
            cooperativeName?.length >= 3 && cooperativeName?.length <= 15
              ? false
              : true
        }
      case 2:
        return {
          title: 'Next',
          width: 56,
          action: handleNextStep,
          disabled:
            acres <= barrier &&
            !coopConfigErrors &&
            acres >= selectedCooperativeType.minAcre &&
            invites?.every(member =>
              validateEmailAndAcrege(member?.email, member?.acreage)
            )
              ? false
              : true
        }
      case 3:
        return {
          title: 'Accept Agreement',
          width: 56,
          action: () => handleAcceptAgreement()
        }
      case 4:
        return {
          title: 'Next',
          width: 48,
          action: _ => handlePayment()
        }
      case 5:
        return {
          title: 'Proceed to Dashboard',
          width: 80,
          action: () => {
            window.onbeforeunload = null
            return history.replace(
              `/cooperative-main/${
                cooperative?._id ||
                order?.cooperative?._id ||
                order?.cooperative ||
                payment?.data?.cooperative?._id ||
                payment?.data?.cooperative
              }`
            )
          }
        }
      default:
        return { title: 'Next', width: 56, action: handleNextStep }
    }
  }

  const { title, action, width, disabled } = getForwardButtonProps(otherStep)

  return (
    <Flex
      mx='auto'
      align='center'
      justify='center'
      direction='column'
      overflow={{ base: 'hidden', md: 'visible' }}
      w={{ base: '100%', xl: 140, '2xl': otherStep === 2 ? '82rem' : 143 }}
      h={{ base: '100%', sm: 'calc(100vh - 5rem)' }}
      pb={{ base: 8 }}
    >
      {isSubmitting && <Overlay text={text} />}

      {otherStep !== 1 && (
        <Flex
          mb={4}
          mx='auto'
          w='full'
          align='center'
          justify='space-between'
          mt={{ base: 5, md: 20 }}
          px={{ base: 2, md: 0 }}
        >
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color='red.600'
            w='50%'
            fontWeight={700}
          >
            Farm starts :{' '}
            <Text
              d={{ base: 'block', md: 'inline-block' }}
              mt={{ base: -1, md: 0 }}
            >
              {getFormattedDate(
                selectedFarm?.startDate || data?.product?.startDate,
                {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }
              )}
            </Text>
          </Text>
          <Link
            href='https://gaip-info.com/multi-peril-crop-insurance'
            isExternal
            rel='noreferrer'
            _hover={{ textDecor: 'none' }}
          >
            <Flex
              py={1}
              px={2}
              align='center'
              rounded='30px'
              w={{ md: '11rem' }}
              borderWidth={1}
              borderColor='cf.green'
              bg='cf.200'
              justify='center'
              color='cf.green'
            >
              <Image
                h={4}
                src={
                  require('../../../assets/images/startfarm/insurance.png')
                    .default
                }
              />
              <Text fontSize={{ base: 'xs', md: 'sm' }} ml={2} color='cf.green'>
                Farm is insured
              </Text>
            </Flex>
          </Link>
        </Flex>
      )}

      <AnimatePresence>
        <MotionFlex
          w={{
            base: '100%'
          }}
          mx='auto'
          overflow='scroll'
          borderColor='gray.200'
          h={{ md: 123 }}
          rounded='md'
          borderWidth={1}
          bgColor='white'
        >
          {getSteps(otherStep)}
        </MotionFlex>
      </AnimatePresence>

      <Flex
        px={{ base: 4, md: 0 }}
        align='center'
        mb={{ base: 4, md: 0 }}
        mt={6}
        justify='center'
      >
        <Button
          h={12}
          width={32}
          fontSize='md'
          btntitle='Prev'
          color='gray.700'
          colorScheme='white'
          disabled={otherStep > 3}
          onClick={otherStep <= 0 ? handleBack : handlePrev}
          borderWidth={1}
        />
        <Button
          fontSize={{ md: 'lg' }}
          ml={{ base: 4, md: 6 }}
          h={12}
          disabled={
            disabled ||
            (otherStep === 2 &&
              user?.signature?.string &&
              intersection &&
              intersection.intersectionRatio < 1)
              ? true
              : false
          }
          width={width}
          btntitle={title}
          onClick={action}
        />
      </Flex>
    </Flex>
  )
}

CooperativeSteps.propTypes = {
  data: PropTypes.any,
  history: PropTypes.any,
  asMember: PropTypes.object,
  payment: PropTypes.object
}

export default CooperativeSteps
