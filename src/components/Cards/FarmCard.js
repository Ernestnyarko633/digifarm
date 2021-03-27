import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Tag,
  Text
} from '@chakra-ui/react'
import Step from 'components/Form/Step'
import React from 'react'
import PropTypes from 'prop-types'

const FarmCard = ({ farm, _small }) => {
  return (
    <React.Fragment>
      {!_small ? (
        <Box
          rounded='xl'
          shadow='md'
          p={10}
          bg='white'
          minW={{ md: 130 }}
          mr={{ md: 6 }}
        >
          <Flex align='center' justify='space-between'>
            <Flex align='center'>
              <Box mr={4}>
                <Avatar src={require('../../assets/images/soya.png').default} />
              </Box>

              <Box>
                <Heading as='h4' fontSize={{ md: '2xl' }}>
                  {farm.name}
                </Heading>
                <Text color='gray.500' mt={-1}>
                  {farm.location}
                </Text>
              </Box>
            </Flex>

            <Tag
              bg='cf.200'
              color='cf.400'
              rounded='3xl'
              fontSize='sm'
              px={4}
              textAlign='center'
            >
              Lvl {farm.level}
            </Tag>
          </Flex>
          <Divider orientation='horizontal' borderColor='gray.300' my={6} />

          <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={16}>
            <Box>
              <Heading as='h4' fontSize={{ md: '2xl' }}>
                Progress on farm
              </Heading>
              <Divider orientation='horizontal' borderColor='gray.300' my={3} />
              <Box>
                <Step />
                <Step />
                <Step />
                <Step />
                <Step />
              </Box>
            </Box>
            <Box>
              <Image src={require('../../assets/images/farmimg.png').default} />
            </Box>
          </Grid>
        </Box>
      ) : (
        <Box
          rounded='xl'
          shadow='md'
          p={10}
          bg='white'
          minW={{ md: 85 }}
          mr={{ md: 6 }}
        >
          <Flex align='center' justify='space-between'>
            <Flex align='center'>
              <Box mr={4}>
                <Avatar src={require('../../assets/images/soya.png').default} />
              </Box>

              <Box>
                <Heading as='h4' fontSize={{ md: '2xl' }}>
                  {farm.name}
                </Heading>
                <Text color='gray.500' mt={-1}>
                  {farm.location}
                </Text>
              </Box>
            </Flex>

            <Tag
              bg='cf.200'
              color='cf.400'
              rounded='3xl'
              fontSize='sm'
              px={4}
              textAlign='center'
            >
              Lvl {farm.level}
            </Tag>
          </Flex>
        </Box>
      )}
    </React.Fragment>
  )
}

FarmCard.propTypes = {
  farm: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    level: PropTypes.number
  }),
  _small: PropTypes.bool
}

export default FarmCard
