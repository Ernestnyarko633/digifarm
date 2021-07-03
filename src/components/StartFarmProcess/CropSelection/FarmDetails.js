/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import Button from 'components/Button'
import useApi from 'context/api'
import useStartFarm from 'context/start-farm'
import { Link as ReachRouter } from 'react-router-dom'
// import { Scrollbars } from "react-custom-scrollbars-2";
import useFetch from 'hooks/useFetch'

import CropSelectionCard from 'components/Cards/CropSelectionCard'
import FetchCard from 'components/FetchCard'
import AboutFarm from './AboutFarm'

const FarmDetails = ({ query, catName, dashboard, gridRef }) => {
  const { selectedFarm, setSelectedFarm, setStep } = useStartFarm()
  const { getFarms } = useApi()

  const [reload, setReload] = useState(0)

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch(null, getFarms, reload, query)
  sessionStorage.setItem('farms', JSON.stringify(data))

  const type = sessionStorage.getItem('type')

  useEffect(() => {
    if (gridRef) {
      gridRef.current = true
    }

    return () => (gridRef ? (gridRef.current = false) : null)
  }, [gridRef])

  useEffect(() => {
    let mounted = true
    if (mounted && data) {
      if (data.length) {
        setSelectedFarm(data[0])
        sessionStorage.setItem('selected_farm', JSON.stringify(data[0]))
      }

      if (catName) {
        sessionStorage.setItem('cat_name', catName)
      }
    }
    return () => (mounted = false)
  }, [data, catName, setSelectedFarm])

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
      ref={gridRef}
      templateColumns={{ base: '100%', md: '40% 55%' }}
      h={121}
      w='100%'
      pos='relative'
      borderWidth={1}
      borderColor='gray.200'
      mt={{ base: 4, md: 0 }}
    >
      <GridItem
        overflowY='hidden'
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
              acres={
                type === 'individual'
                  ? Math.floor(farm.acreage)
                  : farm?.acreage % 1 !== 0
                  ? farm?.acreage.toFixed(1)
                  : farm?.acreage
              }
              varietyName={farm.cropVariety?.name}
              cropName={farm.cropVariety?.crop?.name}
              selected={farm._id === selectedFarm?._id}
              onClick={() => {
                setSelectedFarm(farm)
                sessionStorage.setItem('selected_farm', JSON.stringify(farm))
              }}
            />
          ))}
      </GridItem>
      <GridItem
        overflowY='scroll'
        borderLeftWidth={1}
        borderLeftColor='gray.200'
        // p={{ base: 4, md: 10 }}
        pos='relative'
        css={{
          direction: 'ltr',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
      >
        {selectedFarm && (
          <Box p={8}>
            <AboutFarm farm={selectedFarm} />
          </Box>
        )}
        {dashboard && (
          <Box my={10}>
            <Button
              as={ReachRouter}
              to={{
                pathname: '/start-farm/individual'
              }}
              onClick={() => {
                sessionStorage.setItem('type', 'individual')
                setStep(x => x + 1)
              }}
              btntitle='Start this farm'
              w={80}
              h={14}
              fontSize='md'
            />
          </Box>
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
  dashboard: PropTypes.bool,
  gridRef: PropTypes.any
}

export default FarmDetails
