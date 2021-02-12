import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { BiTime } from 'react-icons/bi'
import { Crop, Updates } from 'theme/Icons'
import FarmUpdateCard from '../Cards/FarmUpdateCard'
import WeatherCards from '../Cards/WeatherCards'

export default function Tasks() {
  return (
    <Box mb={8}>
      <FarmUpdateCard
        title='TODAY’S TASK'
        duration='3m ago'
        subtitle='Harrowing'
        text='Can you imagine what we will be downloading in another twenty years?'
        icon={BiTime}
      />
      <WeatherCards />
      <Grid gap={8}>
        <FarmUpdateCard
          title='SCHEDULED TASK'
          duration='3m ago'
          subtitle='Harrowing'
          text='Can you imagine what we will be downloading in another twenty years?'
          icon={BiTime}
        />
        <FarmUpdateCard
          title='FARM MANAGER UPDATE'
          duration='3m ago'
          subtitle='Harrowing'
          text='Can you imagine what we will be downloading in another twenty years?'
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
