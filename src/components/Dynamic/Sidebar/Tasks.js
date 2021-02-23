import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  Icon,
  Image,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { BiTime } from 'react-icons/bi'
import { Crop, Updates, PlantHealth } from 'theme/Icons'
import FarmUpdateCard from '../Cards/FarmUpdateCard'
import WeatherCards from '../Cards/WeatherCards'
import PropTypes from 'prop-types'

export default function Tasks({ scheduledTasks, farmfeeds }) {
  return (
    <Box mb={8}>
      <FarmUpdateCard
        title='TODAY’S TASK'
        duration={farmfeeds[0]?.task?.duration}
        subtitle={farmfeeds[0]?.task?.name}
        text={farmfeeds[0]?.summary.replace(/<[^>]*>/g, '')}
        icon={BiTime}
      />
      <WeatherCards farmfeeds={farmfeeds} />
      <Grid gap={8}>
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

              <Box mt={2}>
                <Icon boxSize={20} as={PlantHealth} />
              </Box>
            </Box>
            <Box>
              <Text fontSize='xs' fontWeight={300}>
                Growing stage
              </Text>

              <Box mt={2}>
                <Image
                  h={20}
                  src={require('../../../assets/images/stage.png').default}
                />
              </Box>
            </Box>
            <Box>
              <Text fontSize='xs' fontWeight={300}>
                Crop productivity
              </Text>

              <CircularProgress value={67} size='100px' color='cf.400' mt={2}>
                <CircularProgressLabel rounded='lg'>67%</CircularProgressLabel>
              </CircularProgress>
            </Box>
            <Box>
              <Text fontSize='xs' fontWeight={300}>
                Chlorophyl index
              </Text>

              <CircularProgress value={67} size='100px' color='cf.400' mt={2}>
                <CircularProgressLabel rounded='lg'>67%</CircularProgressLabel>
              </CircularProgress>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  )
}

Tasks.propTypes = {
  scheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any
}
