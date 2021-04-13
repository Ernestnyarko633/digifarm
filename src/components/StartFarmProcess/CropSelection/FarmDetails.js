import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import { useIntersection } from 'react-use'
import { Button } from 'components'
import { motion } from 'framer-motion'

import useApi from 'context/api'
import useStartFarm from 'context/start-farm'

import useFetch from 'hooks/useFetch'

import CropSelectionCard from 'components/Cards/CropSelectionCard'
import FetchCard from 'components/FetchCard'
import AboutFarm from './AboutFarm'

const MotionBox = motion.custom(Box)

const FarmDetails = ({ query, catName, handleNext }) => {
  const { selectedFarm, setSelectedFarm } = useStartFarm()
  const { getFarms } = useApi()

  const [reload, setReload] = useState(0)

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch(null, getFarms, reload, query)

  sessionStorage.setItem('farms', JSON.stringify(data))

  useEffect(() => {
    let mounted = true
    if (mounted && data) {
      if (data.length) {
        setSelectedFarm(data[0])
      }

      if (catName) {
        sessionStorage.setItem('cat_name', catName)
      }
    }
    return () => (mounted = false)
  }, [data, catName, setSelectedFarm])

  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  })

  return isLoading || error ? (
    <FetchCard
      p={16}
      w='100%'
      mx='auto'
      align='center'
      justify='center'
      direction='column'
      text='Getting farms'
      error={error}
      loading={isLoading}
      reload={triggerReload}
    />
  ) : data?.filter(f => f.status === 1)?.length > 0 ? (
    <Grid
      templateColumns={{ base: '100%', md: '40% 55%' }}
      h={121}
      w='100%'
      pos='relative'
      borderWidth={1}
      borderColor='gray.200'
      mt={{ base: 4, md: 0 }}
    >
      <GridItem
        overflowY='scroll'
        pos='relative'
        css={{
          direction: 'ltr',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
        display={{ base: 'grid', md: 'block' }}
        gridTemplateColumns={{ md: '1fr' }}
        borderBottomWidth={{ base: 1, md: 0 }}
        borderBottomColor='gray.200'
      >
        {data
          ?.filter(f => f.status === 1)
          ?.map(farm => (
            <CropSelectionCard
              key={farm._id}
              farmName={farm.name}
              acres={farm.acreage}
              varietyName={farm.cropVariety?.name}
              cropName={farm.cropVariety?.crop?.name}
              selected={farm._id === selectedFarm?._id}
              onClick={() => setSelectedFarm(farm)}
            />
          ))}
      </GridItem>
      <GridItem
        overflowY='scroll'
        borderLeftWidth={1}
        borderLeftColor='gray.200'
        p={{ base: 4, md: 10 }}
        pos='relative'
        css={{
          direction: 'ltr',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
      >
        {selectedFarm && (
          <>
            <AboutFarm farm={selectedFarm} />
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
                  px={{ base: 4, md: 0 }}
                >
                  <Button
                    btntitle='Start this farm'
                    w={{ base: 70, md: 80 }}
                    h={14}
                    ms
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
  ) : (
    <Box m='auto' w='100%' textAlign='center'>
      <Heading as='h4' size='xl'>
        Sorry no farm on sale...
      </Heading>
    </Box>
  )
}

FarmDetails.propTypes = {
  query: PropTypes.any,
  catName: PropTypes.string.isRequired,
  handleNext: PropTypes.func.isRequired
}

export default FarmDetails
