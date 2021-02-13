/* eslint-disable*/
import React from 'react'
import { Cloud } from 'theme/Icons'
import { Box, Grid, Heading, Icon, Text } from '@chakra-ui/react'
import useEosApi from 'context/eosApi'

export default function WeatherCard({farmfeeds}) {

  return (
    <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={8} my={{ md: 8 }}>
      <Box
        w='100%'
        rounded='lg'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        p={6}
        bg='white'
      >
        <Text textAlign='center' fontWeight={300}>
          Plant population
        </Text>
        <Box mt={2}>
          <Heading fontSize={{ md: '6xl' }} fontWeight={900} mt={1}>
           {farmfeeds[0]?.plantInfo?.population}
          </Heading>
        </Box>
      </Box>
      <Box
        w='100%'
        rounded='lg'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        p={6}
        bg='white'
      >
        <Text fontWeight={300}>Weather today</Text>
        <Box mt={2}>
          <Icon as={Cloud} boxSize={10} />
          <Heading fontSize={{ md: '6xl' }} fontWeight={900} mt={1}>
            11C
          </Heading>
        </Box>
      </Box>
    </Grid>
  )
}
