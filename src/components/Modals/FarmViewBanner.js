import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Image,
  Alert,
  AlertTitle,
  CloseButton,
  AlertDescription
} from '@chakra-ui/react'
import Digifarmer from 'assets/images/digifarmer.svg'
import { getformattedDate } from 'helpers/misc'
import { motion } from 'framer-motion'

const MotionAlert = motion.custom(Alert)

const FarmViewBanner = ({ date, closed }) => {
  return (
    <MotionAlert
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
      exit={{ y: 150, opacity: 0, transition: { duration: 0.5 } }}
      pos='fixed'
      w='100%'
      zIndex={100}
      status='success'
      top={{ base: 14, md: 16 }}
      py={{ base: 4, md: 8 }}
      px={{ base: 4, md: 48 }}
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Box w={{ md: '5xl' }} mr={{ md: 20 }} mb={{ base: 5, md: 0 }}>
        <AlertTitle fontSize={{ md: 'xl' }} mb={{ md: 3 }}>
          Farm will start on{' '}
          {getformattedDate(date, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </AlertTitle>
        <AlertDescription
          display='block'
          fontSize={{ base: 'xs', md: 'inherit' }}
        >
          Your new farm is all set, and you’ll be able to start farming soon. To
          enable the best farming procedures, the appropriate cultivation
          protocols are being implemented. As a result, our satellite will
          provide you with data other than the ones you will require when the
          actual farming cycle begins.
        </AlertDescription>
      </Box>

      <Image
        src={Digifarmer}
        w={{ base: '9.438rem', md: '14.438rem' }}
        h={{ base: '8.5rem', md: '13.5rem' }}
      />
      <CloseButton position='absolute' right='8px' top='8px' onClick={closed} />
    </MotionAlert>
  )
}

FarmViewBanner.propTypes = {
  date: PropTypes.string,
  closed: PropTypes.func
}

export default FarmViewBanner
