import { Box, Flex } from '@chakra-ui/react'
import Button from 'components/Button'
import React from 'react'
import FarmLayout from './FarmLayout'
import Map from 'components/Map/Map'

export default function Farm() {
  return (
    <FarmLayout>
      <Box h={{ md: 128 }} w='100%'>
        {/* <Image
          h='100%'
          w='100%'
          objectFit='cover'
          src={require('../../../assets/images/map.png').default}
          alt='map'
        /> */}
        <Box h='100%' w='100%' objectFit='cover' as={Map} />
      </Box>
      <Flex align='center' justify='flex-end' my={{ md: 6 }} px={{ md: 6 }}>
        <Button
          btntitle='Download'
          bg='white'
          borderWidth={2}
          borderColor='cf.400'
          rounded='30px'
          mr={6}
          _hover={{ bg: 'white' }}
          color='cf.400'
          h={12}
          w={{ md: 40 }}
          shadow='none'
        />
        <Button btntitle='Share' rounded='30px' h={12} w={{ md: 40 }} />
      </Flex>
    </FarmLayout>
  )
}
