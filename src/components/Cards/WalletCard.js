/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Image } from '@chakra-ui/react'
import { Box, Flex, Grid, Heading, Link, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import ExpenditureCard from './ExpenditureCard'
import { getFormattedMoney } from 'helpers/misc'
import Button from 'components/Button'
import { Link as ReachRouter } from 'react-router-dom'
import { HiLocationMarker } from 'react-icons/hi'
import { FirstLettersToUpperCase } from 'helpers/misc'
import FarmImg from 'assets/images/farmimg.png'

const WalletCard = ({ acreage, price, farm }) => {
  return (
    <Box
      rounded='xl'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      bg='white'
      minW={{ base: 82, md: 95 }}
      minH={{ md: 'auto' }}
    >
      <Box w='100%' h='11.25rem'>
        <Image roundedTop='xl' w='100%' h='100%' src={FarmImg} fit='cover' />
      </Box>
      <Box p={{ base: 4, md: 8 }}>
        <Flex align='center' mb={4}>
          <Box mr={4}>
            <Avatar
              bgColor='white'
              borderWidth='1px'
              borderColor='gray.300'
              src={farm?.order?.product?.cropVariety?.imageUrl}
            />
          </Box>

          <Flex direction='row' w='100%' justify='space-between'>
            <Flex align='flex-start' direction='column'>
              <Heading as='h4' fontSize={{ base: 'lg', md: '2xl' }}>
                {farm?.order?.product?.cropVariety?.crop?.name}
              </Heading>
              <Text
                ml={1}
                as='span'
                fontSize={{ base: 'tiny', md: 'sm' }}
                color='gray.500'
              >
                ({farm?.order?.product?.cropVariety?.name}) {farm?.name}
              </Text>
            </Flex>

            <Flex direction='row'>
              <Icon
                mt={1}
                mr={1}
                as={HiLocationMarker}
                FlexSize={8}
                color='gray.400'
              />
              <Text color='gray.500' mt={0} fontSize={{ base: 'sm', md: 'md' }}>
                {FirstLettersToUpperCase(
                  `${farm?.order?.product?.location?.name}, ${farm?.order?.product?.location?.country}`.toLowerCase()
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Grid gap={4}>
          <ExpenditureCard
            bg='yellow.light'
            amount={getFormattedMoney(price * acreage)}
            action='spent'
            color='yellow.deep'
          />
          <ExpenditureCard
            bg='cf.light'
            action='available'
            amount={getFormattedMoney(price * acreage)}
          />
        </Grid>

        <Box mt={4}>
          <Link
            as={ReachRouter}
            to={`/wallets/${farm?._id}`}
            _hover={{ textDecor: 'none' }}
          >
            <Button
              btntitle='View farm wallet'
              width='100%'
              h={12}
              fontSize={{ base: 'md', md: 'lg' }}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

WalletCard.propTypes = {
  acreage: PropTypes.any,
  price: PropTypes.any,
  name: PropTypes.any,
  farm: PropTypes.object.isRequired
}

export default WalletCard
