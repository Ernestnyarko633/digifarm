import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import CropSelectionCard from 'components/Cards/CropSelectionCard'
import { useIntersection } from 'react-use'
import { Button } from 'components'
import { motion } from 'framer-motion'

import AboutFarm from './AboutFarm'

const MotionBox = motion.custom(Box)

const crops = [
  { id: 1, title: 'Ginger Farm', acres: '100' },
  { id: 2, title: 'Soy bean Farm' },
  { id: 3, title: 'Sweet Potato Farm' }
]

const FarmDetails = ({ handleNext }) => {
  const [state, setState] = React.useState('Ginger Farm')
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  })

  return (
    <Grid templateColumns={{ md: '45% 55%' }} h={121} pos='relative'>
      <GridItem>
        {crops.map(item => (
          <CropSelectionCard
            key={item.id}
            onClick={() => setState(item.title)}
            title={item.title}
            acres={item.acres}
          />
        ))}
      </GridItem>
      <GridItem
        overflowY='scroll'
        borderLeftWidth={1}
        borderLeftColor='gray.300'
        p={{ md: 10 }}
        pos='relative'
        css={{
          direction: 'rtl',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
      >
        <Box css={{ direction: 'ltr' }}>
          {crops.map(item => state === item.title && <AboutFarm />)}
        </Box>

        <Box my={10} ref={intersectionRef}>
          {intersection && intersection.intersectionRatio < 1 ? (
            <Box>&nbsp;</Box>
          ) : (
            <MotionBox
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity:
                  intersection && intersection.intersectionRatio < 1 ? 0 : 1,
                y: 0
              }}
            >
              <Button
                btntitle='Start this farm'
                w={80}
                h={14}
                fontSize='md'
                onClick={handleNext}
              />
            </MotionBox>
          )}
        </Box>
      </GridItem>
    </Grid>
  )
}

FarmDetails.propTypes = {
  handleNext: PropTypes.func.isRequired
}

export default FarmDetails
