import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Grid, Flex } from '@chakra-ui/react'
import ArrowButton from 'components/Button/ArrowButton'

const ComponentWrapper = ({
  children,
  state,
  setState,
  handleClick,
  firstStateValue,
  secondStateValue,
  thirdStateValue,
  firstBoxTitle,
  secondBoxTitle,
  thirdBoxTitle
}) => {
  return (
    <Box p={{ base: 4, md: 20 }}>
      <Box mb={10}>
        <Heading as='h4' fontSize={{ md: '2xl' }} mb={6}>
          Here’s how your farm(s) are doing
        </Heading>
        <Grid
          d={{ base: 'flex', md: 'grid' }}
          templateColumns={{ md: '70% 20%' }}
          gap={{ md: '10%' }}
          justifyContent={{ base: 'space-between', md: 'inherit' }}
          alignItems='center'
        >
          <Flex
            align='center'
            borderBottomWidth={1}
            borderBottomColor='gray.200'
          >
            <Box
              color={state === firstStateValue ? 'cf.400' : 'gray.700'}
              onClick={() => setState(firstStateValue)}
              fontWeight={state === firstStateValue ? 'bold' : 'normal'}
              cursor='pointer'
              borderBottomWidth={state === firstStateValue && 2}
              borderBottomColor='cf.400'
              pb={3}
            >
              {firstBoxTitle}
            </Box>
            <Box mx={{ base: 4, md: 10 }} />
            <Box
              color={state === secondStateValue ? 'cf.400' : 'gray.700'}
              onClick={() => setState(secondStateValue)}
              fontWeight={state === secondStateValue ? 'bold' : 'normal'}
              cursor='pointer'
              borderBottomWidth={state === secondStateValue && 2}
              borderBottomColor='cf.400'
              pb={3}
            >
              {secondBoxTitle}
            </Box>
            <Box mx={{ base: 4, md: 10 }} />
            <Box
              color={state === thirdStateValue ? 'cf.400' : 'gray.700'}
              onClick={() => setState(thirdStateValue)}
              fontWeight={state === thirdStateValue ? 'bold' : 'normal'}
              cursor='pointer'
              borderBottomWidth={state === thirdStateValue && 2}
              borderBottomColor='cf.400'
              pb={3}
            >
              {thirdBoxTitle}
            </Box>
          </Flex>

          <Box>
            <ArrowButton handleClick={handleClick} />
          </Box>
        </Grid>
      </Box>
      {children}
    </Box>
  )
}

ComponentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  state: PropTypes.string,
  setState: PropTypes.func,
  handleClick: PropTypes.func,
  firstStateValue: PropTypes.any,
  secondStateValue: PropTypes.any,
  thirdStateValue: PropTypes.any,
  firstBoxTitle: PropTypes.any,
  secondBoxTitle: PropTypes.any,
  thirdBoxTitle: PropTypes.any
}
export default ComponentWrapper
