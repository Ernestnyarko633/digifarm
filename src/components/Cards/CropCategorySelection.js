import { Box, Grid, GridItem } from '@chakra-ui/react'
import Button from 'components/Button'
import AboutFarm from 'components/StartFarmProcess/CropSelection/AboutFarm'
import React from 'react'
import CropSelectionCard from './CropSelectionCard'

const crops = [
  { id: 1, title: 'Ginger Farm', acres: '100' },
  { id: 2, title: 'Soy bean Farm' },
  { id: 3, title: 'Sweet Potato Farm' }
]

const CropCategorySelection = () => {
  const [state, setState] = React.useState('Ginger Farm')

  return (
    <Grid templateColumns={{ md: '45% 55%' }} borderWidth={1} borderColor='gray.300' h={121}>
      <GridItem>
        {crops.map(item => (
          <CropSelectionCard
            onClick={() => setState(item.title)}
            key={item.id}
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
        css={{
          direction: 'rtl',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
      >
        <Box css={{ direction: 'ltr' }}>
          {crops.map(item => state === item.title && <AboutFarm />)}
        </Box>
        <Box my={10}>
          <Button btntitle='Start this farm' w={80} h={14} fontSize='md' />
        </Box>
      </GridItem>
    </Grid>
  )
}

export default CropCategorySelection
