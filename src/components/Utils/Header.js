import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import Logo1 from 'assets/images/logo@1x.svg'
import Logo2 from 'assets/images/logo@2x.svg'
import Logo3 from 'assets/images/logo@3x.svg'

const Header = () => {
  return (
    <Flex
      as='header'
      gridArea='header'
      align='center'
      justify='space-between'
      w='100%'
      h={{ base: 10, md: 20 }}
      bg='white'
      pos='fixed'
      top={0}
      zIndex={50}
      borderBottomWidth={1}
      borderBottomColor='gray.300'
      px={{ base: 5, md: 24 }}
    >
      <Box>
        <Box
          w={{ base: '84.47px', md: '113px', xl: '169px' }}
          h={{ base: 6, md: 8, xl: '48px' }}
          bgImage={{
            base: `url('${Logo1}')`,
            md: `url('${Logo2}')`,
            xl: `url('${Logo3}')`
          }}
          bgSize='cover'
          bgPos='center'
          bgRepeat='no-repeat'
        />
      </Box>
    </Flex>
  )
}

export default Header
