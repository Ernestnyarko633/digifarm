/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Button from 'components/Button'
import { Box, Text } from '@chakra-ui/layout'
import { Grid, GridItem, Heading, Divider } from '@chakra-ui/react'
import WalletCard from 'components/Rollover/WalletCard'
import Kill from 'assets/images/b.png'
import { getFormattedMoney } from 'helpers/misc'
import useRollover from 'context/rollover'
const MotionGrid = motion(Grid)

const WalletSelection = () => {
  const { total, selectedWallets } = useRollover()
  const wallets = [
    {
      id: 0,
      cropName: 'Soyabean',
      amount: 12000
    },
    {
      id: 1,

      cropName: 'Soyabean',
      amount: 12000
    },
    {
      id: 2,
      cropName: 'Soyabean',
      amount: 12000
    },
    {
      id: 3,

      cropName: 'Soyabean',
      amount: 12000
    },
    {
      id: 4,

      cropName: 'Soyabean',
      amount: 12000
    },
    {
      id: 5,

      cropName: 'Soyabean',
      amount: 12000
    }
  ]

  return (
    <MotionGrid
      display={{ base: 'flex', md: 'flex' }}
      flexDir={{ base: 'column-reverse', md: 'row' }}
      w={{ base: '100%', xl: '75%' }}
      pt={{ md: 'auto', xl: 'auto' }}
      h={{ base: '90vh', md: '75vh', lg: 'auto' }}
      borderWidth={1}
      borderRadius={10}
      borderColor={{ base: 'transparent', md: 'gray.200' }}
      templateColumns={{ xl: '50% 50%', '2xl': 'repeat(2, 1fr)' }}
    >
      <GridItem
        borderRightColor={{ base: 'transparent', md: 'gray.200' }}
        borderRightWidth={{ md: 1 }}
        px={{ base: 2, md: 3, lg: 14 }}
        borderBottomWidth={{ base: 1, md: 0 }}
        py={{ base: 1, lg: 6 }}
        w={{ base: '100%', md: '50%' }}
        h={{ base: '75%', md: 'auto', lg: '80vh', xl: '90vh' }}
      >
        <Box mt={{ base: 1, md: 10 }} w='100%'>
          <Heading fontSize={{ base: 'lg', md: '2xl' }}>My Wallets</Heading>
          <Text
            w='100%'
            py={{ base: 1, md: 'auto' }}
            fontSize={{ base: 'sm', md: 'lg' }}
            color='gray.600'
            mt={{ md: 5 }}
          >
            Select the wallet you want to rollover with. You may select multiple
            wallets
          </Text>
        </Box>

        <Grid
          mt={{ md: 3 }}
          overflowY='scroll'
          css={{
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-track': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray.200',
              borderRadius: '24px'
            }
          }}
          w='100%'
          h={{ base: '78%', lg: '85%', xl: '80%' }}
        >
          {wallets.map(wallet => (
            <WalletCard
              key={wallet.id}
              id={wallet.id}
              name={wallet.cropName}
              amount={wallet.amount}
              image={Kill}
            />
          ))}
        </Grid>
      </GridItem>
      <GridItem
        w={{ base: '100%', md: '50%' }}
        overflowY='hidden'
        px={{ base: 1, lg: 14 }}
        py={{ base: 5, lg: 20 }}
        h={{ base: '25%', md: 'auto' }}
      >
        <Box
          p={{ base: 4, md: 6, lg: 10 }}
          rounded={15}
          borderWidth={{ base: 1, md: 0, lg: 1 }}
          borderColor='gray.200'
          w='100%'
        >
          <Heading
            as='h3'
            fontSize={{ base: 'lg', md: '2xl' }}
            mb={{ base: 2, md: 5 }}
          >
            Rollover amount
          </Heading>
          <Divider mb={{ base: 2, md: 5 }} />
          <Text mb={{ base: 2, md: 5 }}>
            {selectedWallets.length}{' '}
            {selectedWallets.length === 1 ? 'wallet' : 'wallets'} selected
          </Text>
          <Divider mb={{ base: 2, md: 5 }} />
          <Heading as='h3' fontSize={{ base: 'xl', md: '4xl' }}>
            $ {getFormattedMoney(total)}
          </Heading>
        </Box>

        <Button
          display={{ base: 'none', lg: 'block' }}
          btntitle='Proceed to rollover'
          borderColor='cf.green'
          color='white'
          fontWeight={900}
          rounded={30}
          mx={{ base: 3, md: 0 }}
          my={{ base: 2, md: 10 }}
          w='70%'
          h={65}
          fontSize={{ base: 'sm', xl: 'md' }}
          onClick={() => {}}
        />
      </GridItem>
    </MotionGrid>
  )
}

WalletSelection.propTypes = {
  farm: PropTypes.object,
  name: PropTypes.string,
  selectedType: PropTypes.object
}

export default WalletSelection
