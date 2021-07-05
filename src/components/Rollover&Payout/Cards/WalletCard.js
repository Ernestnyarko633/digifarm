/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Box, Flex, Text, Heading, Icon } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { AiOutlineCheck } from 'react-icons/ai'
import { getFormattedMoney } from 'helpers/misc'
import useRollover from 'context/rollover'

const WalletCard = ({ name, image, amount, id, clicked }) => {
  const [selected, setSelected] = useState(false)
  const { setSelectedWallets } = useRollover()

  useEffect(() => {
    let mounted = true
    if (mounted && selected) {
      setSelectedWallets(p =>
        !p
          ? [...[], { name, amount, id }]
          : [...p, { name, amount, id }].filter(
              (wallet, index, self) =>
                index === self.findIndex(t => t.id === wallet.id)
            )
      )
    }

    if (mounted && !selected) {
      setSelectedWallets(p => p.filter(wallet => wallet.id !== id))
    }

    return () => (mounted = false)
  }, [amount, id, name, selected, setSelectedWallets])

  useEffect(() => {
    let mounted = true
    if (mounted && clicked) {
      setSelected(true)
    }

    return () => (mounted = false)
  }, [clicked])

  return (
    <Box
      w='100%'
      my={{ base: 5 }}
      rounded={15}
      h={{ base: '6.75rem', md: '8.65rem', lg: 40 }}
      borderColor={selected ? 'cf.400' : 'gray.300'}
      borderWidth={selected ? '3px' : '1px'}
      onClick={() => setSelected(!selected)}
    >
      <Flex w='100%' direction='row' h='100%'>
        <Box w='70%' p={{ base: 4, lg: 8 }}>
          <Text>{name}</Text>
          <Flex direction='column' mt={{ base: 2, md: 4, lg: 5 }}>
            <Heading fontSize={{ base: 'xl', lg: '2xl' }}>
              {' '}
              $ {getFormattedMoney(amount)}{' '}
            </Heading>
            <Text fontWeight={200}>Total amount in wallet</Text>
          </Flex>
        </Box>
        <Flex
          bgColor='red'
          w='30%'
          h='100%'
          justify='flex-end'
          borderRightRadius={15}
          backgroundPosition='center'
          objectFit='cover'
          bg={`url('${image}')`}
          pr={5}
        >
          <Box
            my={{ base: 2, md: 5 }}
            borderWidth='1px'
            borderColor='white'
            w={{ base: 4, md: 8 }}
            h={{ base: 4, md: 8 }}
            rounded={{ base: 8, md: 15 }}
            bg={selected ? 'cf.400' : 'transparent'}
          >
            <Flex w='100%' h='100%' align='center' justify='center'>
              {selected && (
                <Icon
                  boxSize={{ base: 2, lg: 4 }}
                  color='white'
                  as={AiOutlineCheck}
                />
              )}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
WalletCard.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number,
  image: PropTypes.any,
  id: PropTypes.number,
  clicked: PropTypes.bool
}
export default WalletCard
