import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Grid, GridItem, Icon, Link, Text } from '@chakra-ui/react'
import { Link as ReachRouter } from 'react-router-dom'
import Zendesk from 'react-zendesk'

import Header from './Header'
import Sidebar from './Sidebar'

import RightSidebar from './RightSidebar'
import { farm, home, wallet, market } from 'theme/Icons'

import configs from 'utils/configs'

const menuLink = [
  { icon: home, path: '/dashboard', name: 'Home', size: 5 },
  { icon: farm, path: '/farms', name: 'Farm board', size: 4, disabled: true },
  {
    icon: wallet,
    path: '/wallet',
    name: 'Farm Wallet',
    size: 4,
    disabled: true
  },
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

  React.useEffect(() => {
    window.zESettings = {
      webWidget: {
        color: {
          theme: '#3c9130',
          launcherText: '#FFF',
          header: '#3c9130'
        },
        offset: {
          mobile: {
            horizontal: '-10px',
            vertical: '55px'
          }
        }
      }
    }
  }, [])

  return (
    <>
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
            mt={{ md: 20, xl: 24 }}
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
              <ReachRouter
                key={mapKey(i)}
                onClick={e => item.disabled === true && e.preventDefault()}
                to={item.path}
              >
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
      <Zendesk defer zendeskKey={configs().ZENDESK_KEY} />
    </>
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
