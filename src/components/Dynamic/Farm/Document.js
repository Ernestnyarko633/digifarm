import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import DynamicDocument from '../Document'
import FarmReceiptCard from '../Cards/FarmReceiptCard'

export default function Document({
  digitalFarmerFarm,
  activities,
  tasks,
  ScheduledTasks,
  farmfeeds
}) {
  let state = 'compA'

  return (
    <Grid
      templateRows='repeat(1 1fr)'
      templateColumns='70% 30%'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
    >
      <GridItem>
        <Box
          minW={{ lg: '65%' }}
          as='main'
          color='gray.800'
          bg='gray.50'
          fontFamily='body'
          overflowX='hidden'
          py={{ md: 56 }}
          px={{ md: 24 }}
          minH={{ lg: '100vh' }}
        >
          <Box mt={{ md: 10 }}>
            <DynamicDocument
              document={state}
              activities={activities}
              tasks={tasks}
              ScheduledTasks={ScheduledTasks}
              digitalFarmerFarm={digitalFarmerFarm}
              farmfeeds={farmfeeds}
            />
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          py={8}
          right={0}
          bg='white'
          as='rightsidebar'
          bottom={0}
          pos='fixed'
          px={{ md: 8 }}
          h={{ lg: '84vh' }}
          w={{ md: '30%' }}
          shadow='md'
          overflowY='scroll'
        >
          <Grid gap={8}>
            {digitalFarmerFarm?.order?.status === 'PAID' && (
              <React.Fragment>
                <FarmReceiptCard
                  title='Agreement'
                  type='agreement'
                  farm={digitalFarmerFarm}
                />
              </React.Fragment>
            )}
          </Grid>
        </Box>
      </GridItem>
    </Grid>
  )
}

Document.propTypes = {
  digitalFarmerFarm: PropTypes.any,
  activities: PropTypes.any,
  tasks: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any
}
