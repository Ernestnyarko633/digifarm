import React, { useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import useComponent from 'context/component'
import useApi from 'context/api'

import useFetch from 'hooks/useFetch'

import Tabs from 'components/Tabs/Tabs'
import FetchCard from 'components/FetchCard'
import FarmDetails from './FarmDetails'

const CropSelection = () => {
  const { handleNext, isSellOn, setIsSellOn } = useComponent()

  const [reload, setReload] = useState(0)

  const { getCropCategories } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch(
    'categories',
    getCropCategories,
    reload
  )

  let categories = []

  if (data) {
    categories = [{ _id: 'defualt', name: 'Top Selling' }, ...data]
  }

  return (
    <Box mt={{ md: 32 }} w='90%' mx='auto'>
      {isSellOn ? (
        <>
          <Box textAlign='center' mb={10}>
            <Heading as='h4' size='xl'>
              Which Farm is right for you.
            </Heading>
          </Box>

          <Box pos='relative'>
            {isLoading || error ? (
              <FetchCard
                w='100%'
                mx='auto'
                align='center'
                justify='center'
                direction='column'
                reload={triggerReload}
                loading={isLoading}
                error={error}
              />
            ) : (
              <Tabs direction='row' py='0' px='0' boxWidth='100%'>
                {categories?.map(cat => (
                  <Box key={cat._id} label={cat.name}>
                    <FarmDetails
                      handleNext={handleNext}
                      setIsSellOn={setIsSellOn}
                      catName={cat.name}
                      query={cat._id !== { category: cat._id }}
                    />
                  </Box>
                ))}
              </Tabs>
            )}
          </Box>
        </>
      ) : (
        <Box>
          <Heading as='h4' size='xl'>
            No farm on sell...
          </Heading>
        </Box>
      )}
    </Box>
  )
}

export default CropSelection
