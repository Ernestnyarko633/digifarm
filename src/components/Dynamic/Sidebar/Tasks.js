import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { BiTime } from 'react-icons/bi'
import { Crop, Updates } from 'theme/Icons'
import FarmUpdateCard from '../Cards/FarmUpdateCard'
import WeatherCards from '../Cards/WeatherCards'
import PropTypes from 'prop-types'

export default function Tasks({
  scheduledTasks,
  farmfeeds,
  loading,
  error,
  farm,
  weatherForeCasts
}) {
  return (
    <Box mb={8}>
      {loading === 'done' && farmfeeds && (
        <FarmUpdateCard
          title='TODAY’S TASK'
          duration={farmfeeds[0]?.task?.duration}
          subtitle={farmfeeds[0]?.task?.name}
          text={farmfeeds[0]?.summary.replace(/<[^>]*>/g, '')}
          icon={BiTime}
        />
      )}
      <WeatherCards
        farmfeeds={farmfeeds}
        loading={loading}
        error={error}
        weatherForeCasts={weatherForeCasts}
      />
      <Grid gap={8}>
        {loading === 'done' && farmfeeds.length > 0 && (
          <React.Fragment>
            <FarmUpdateCard
              title='SCHEDULED TASK'
              duration={farmfeeds[0]?.nextTask?.duration}
              subtitle={farmfeeds[0]?.nextTask?.name}
              text={farmfeeds[0]?.summary.replace(/<[^>]*>/g, '')}
              icon={BiTime}
            />
            <FarmUpdateCard
              title='FARM MANAGER UPDATE'
              duration={scheduledTasks[0]?.taskId?.duration}
              subtitle={scheduledTasks[0]?.taskId?.name}
              text={scheduledTasks[0]?.comments.replace(/<[^>]*>/g, '')}
              icon={Updates}
            />
          </React.Fragment>
        )}
        <Box
          bg='white'
          w='100%'
          rounded='20px'
          filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
          p={8}
        >
          <Flex
            align='center'
            justify='space-between'
            borderBottomWidth={1}
            borderBottomColor='gray.200'
            pb={3}
          >
            <Text fontWeight={900}>
              <Icon as={Crop} mr={1} />
              CROP HEALTH
            </Text>
            <Text color='gray.500' fontSize='sm'>
              3m ago
            </Text>
          </Flex>

          <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={6} mt={5}>
            <Box>
              <Text fontSize='xs' fontWeight={300}>
                Plant population
              </Text>
            </Box>
            <Box>
              <Text fontSize='xs' fontWeight={300}>
                Plant health
              </Text>
            </Box>
            <Box>
              <Text fontSize='xs' fontWeight={300}>
                Growing stage
              </Text>
            </Box>
            <Box>
              <Text fontSize='xs' fontWeight={300}>
                Crop productivity
              </Text>
            </Box>
            <Box>
              <Text fontSize='xs' fontWeight={300}>
                Chlorophyl index
              </Text>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  )
}

Tasks.propTypes = {
  scheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  farm: PropTypes.any,
  weatherForeCasts: PropTypes.any
}
