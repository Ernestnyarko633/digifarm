import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Box, Grid, GridItem } from '@chakra-ui/react'
import { useIntersection } from 'react-use'
import { Button } from 'components'
import { motion } from 'framer-motion'

import useApi from 'context/api'
import useFetch from 'hooks/useFetch'

import CropSelectionCard from 'components/Cards/CropSelectionCard'
import FetchCard from 'components/FetchCard'
import AboutFarm from './AboutFarm'

const MotionBox = motion.custom(Box)

const FarmDetails = ({ query, handleNext, setIsSellOn }) => {
  const [reload, setReload] = useState(0)
  const { getFarms } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch('farms', getFarms, reload, query)

  const [seletedFarm, setSeletedFarm] = useState(null)

  useEffect(() => {
    let mounted = true
    if (mounted && data) {
      if (data.length) {
        setIsSellOn(true)
        setSeletedFarm(data[0])
      } else {
        setIsSellOn(false)
      }
    }
    return () => (mounted = false)
  }, [data, setIsSellOn])

  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  })

  return isLoading || error ? (
    <Box p={16}>
      <FetchCard
        direction='column'
        align='center'
        justify='center'
        mx='auto'
        reload={triggerReload}
        loading={isLoading}
        error={error}
        text='Getting farms'
      />
    </Box>
  ) : (
    <Grid
      templateColumns={{ md: '45% 55%' }}
      h={121}
      w='100%'
      pos='relative'
      borderWidth={1}
      borderColor='gray.300'
    >
      <GridItem
        overflowY='scroll'
        pos='relative'
        css={{
          direction: 'ltl',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
      >
        {data?.map(farm => (
          <CropSelectionCard
            key={farm._id}
            onClick={() => setSeletedFarm(farm)}
            title={`${farm.cropVariety?.crop?.name}(${farm.cropVariety?.name}) #${farm.name}`}
            acres={farm.acreage}
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
        {seletedFarm && (
          <>
            <AboutFarm farm={seletedFarm} />
            <Box my={10} ref={intersectionRef}>
              {intersection && intersection.intersectionRatio < 1 ? (
                <Box>&nbsp;</Box>
              ) : (
                <MotionBox
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity:
                      intersection && intersection.intersectionRatio < 1
                        ? 0
                        : 1,
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
          </>
        )}
      </GridItem>
    </Grid>
  )
}

FarmDetails.propTypes = {
  query: PropTypes.object.isRequired,
  handleNext: PropTypes.func.isRequired,
  setIsSellOn: PropTypes.func.isRequired
}

export default FarmDetails
