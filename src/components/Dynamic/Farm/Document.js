import { Box, Flex, Grid, GridItem, Icon } from '@chakra-ui/react'
import React from 'react'
import { Weather, Calendar, Crop, FarmSchedule, Updates } from 'theme/Icons'
import PropTypes from 'prop-types'
import DynamicDocument from '../Document'
import FarmReceiptCard from '../Cards/FarmReceiptCard'

const menus = [
  { id: 1, icon: Calendar, state: 'compA' },
  { id: 2, icon: Weather, state: 'compB' },
  { id: 3, icon: Crop, state: 'compC' },
  { id: 4, icon: FarmSchedule, state: 'compD' },
  { id: 5, icon: Updates, state: 'compE' }
]

export default function Document({ digitalFarmerFarm }) {
  const [state, setState] = React.useState('compA')

  return (
    <Grid
      templateRows='repeat(1 1fr)'
      templateColumns='5% 65% 30%'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
    >
      <GridItem>
        <Box
          as='aside'
          pos='fixed'
          bottom={0}
          left={0}
          h={{ lg: '84vh' }}
          w={{ md: '5%' }}
          bg='white'
          zIndex={50}
          pt={10}
          shadow='md'
          px={{ md: 8 }}
          color='gray.600'
        >
          <Box as='ul'>
            {menus.map(item => (
              <Flex
                as='button'
                role='button'
                aria-label={`${item.icon} button`}
                key={item.id}
                align='center'
                pb={6}
              >
                <Icon as={item.icon} />
              </Flex>
            ))}
          </Box>
        </Box>
      </GridItem>
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
          <Flex
            align='center'
            borderBottomWidth={4}
            borderBottomColor='gray.200'
            pb={2}
            w={{ md: 72 }}
            pos='relative'
          >
            <Box
              as='button'
              role='button'
              aria-label='individual button'
              fontWeight={state === 'compA' ? 900 : 400}
              onClick={() => setState('compA')}
              mr={{ md: 14 }}
              fontSize={{ md: 'lg' }}
              letterSpacing='wider'
              pos='relative'
            >
              Individual
              <Box
                borderBottomWidth={4}
                borderBottomColor='cf.400'
                pos='absolute'
                bottom={0}
              />
            </Box>
            <Box
              as='button'
              role='button'
              aria-label='cooperative button'
              fontWeight={state === 'compB' ? 900 : 400}
              onClick={() => setState('compB')}
              fontSize={{ md: 'lg' }}
              letterSpacing='wider'
            >
              Cooperative
            </Box>
          </Flex>
          <Box mt={{ md: 10 }}>
            <DynamicDocument
              document={state}
              digitalFarmerFarm={digitalFarmerFarm}
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
            <FarmReceiptCard farm={digitalFarmerFarm} />
          </Grid>
        </Box>
      </GridItem>
    </Grid>
  )
}

Document.propTypes = {
  digitalFarmerFarm: PropTypes.any
}
