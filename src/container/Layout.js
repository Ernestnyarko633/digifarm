import { Box, Flex, Grid, GridItem, Icon, Link, Text } from '@chakra-ui/react'
import { Link as ReachRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from './Header'
import Sidebar from './Sidebar'
import React from 'react'
import RightSidebar from './RightSidebar'
import { farm, home, wallet, market } from 'theme/Icons'

const menuLink = [
  { icon: home, path: '/dashboard', name: 'Home', size: 5 },
  { icon: farm, path: '/farms', name: 'Farm board', size: 4 },
  { icon: wallet, path: '/wallet', name: 'Farm Wallet', size: 4 },
  { icon: market, path: '/warehouses', name: 'Warehouse', size: 4 }
]

const Layout = ({
  children,
  height,
  pt,
  px,
  leftSidebar = true,
  rightSidebar = true,
  ...rest
}) => {
  const mapKey = index => index
  return (
    <Grid
      templateRows='repeat(1 1fr)'
      templateColumns={{ md: '20% 80%', lg: '15% 63% 22%' }}
      pos='relative'
      h='100vh'
      fontFamily='body'
      bgColor='white'
      fontSize={{ md: 'md' }}
    >
      <Header />
      {leftSidebar && (
        <GridItem
          shadow='xl'
          zIndex={40}
          bg='white'
          d={{ base: 'none', md: 'block' }}
        >
          <Sidebar />
        </GridItem>
      )}
      <GridItem pos='relative'>
        <Box
          px={px}
          pt={pt}
          w={{ lg: '100%' }}
          as='main'
          bg='cf-dark.400'
          h={height}
          mt={{ md: 20 }}
          color='gray.800'
          fontFamily='body'
          overflowX='hidden'
          {...rest}
        >
          {children}
        </Box>

        <Flex
          align='center'
          justify='space-between'
          pos='fixed'
          bottom={0}
          h={16}
          d={{ base: 'flex', md: 'none' }}
          bg='white'
          shadow='lg'
          w='100%'
          zIndex={50}
          px={4}
        >
          {menuLink.map((item, i) => (
            <ReachRouter key={mapKey(i)} to={item.path}>
              <Link _hover={{ textDecor: 'none' }}>
                <Box key={item.id} align='center'>
                  <Icon as={item.icon} />
                  <Text fontSize={9}>{item.name}</Text>
                </Box>
              </Link>
            </ReachRouter>
          ))}
        </Flex>
      </GridItem>
      {rightSidebar && (
        <GridItem
          shadow='xl'
          zIndex={40}
          d={{ base: 'none', md: 'none', lg: 'block' }}
        >
          <RightSidebar />
        </GridItem>
      )}
    </Grid>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.any,
  pt: PropTypes.any,
  px: PropTypes.any,
  leftSidebar: PropTypes.bool,
  rightSidebar: PropTypes.bool,
  rest: PropTypes.any
}

export default Layout
