import React from 'react'
import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import Button from 'components/Button'

export default function FarmReceiptCard() {
  return (
    <Box
      bg='white'
      rounded='lg'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      p={6}
    >
      <Flex align='center' justify='space-between'>
        <Flex align='center'>
          <Avatar src={require('../../../assets/images/soya.png').default} />
          <Box ml={2}>
            <Text fontSize='lg' fontWeight={700}>
              John’s Farm Contract
            </Text>
            <Text fontSize='xs' color='gray.500' mt={-2}>
              Agyata, Eastern region
            </Text>
          </Box>
        </Flex>

        <Box>
          <Button
            btntitle='View contract'
            bg='white'
            borderWidth={1}
            borderColor='cf.400'
            color='cf.400'
            rounded='30px'
            h={10}
            width={32}
            _hover={{ bg: 'white' }}
            shadow='none'
          />
        </Box>
      </Flex>

      <Box mt={8}>
        <Image src={require('../../../assets/images/document.png').default} />
        <Text w={64} fontSize='sm' color='gray.600' mt={4}>
          Protect your farm from natural perils like flood, fire, pests, strong
          winds with insurance for your farm
        </Text>
      </Box>
    </Box>
  )
}
