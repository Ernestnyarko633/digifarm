import { Box, Grid, GridItem } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Header from './Header'
import Sidebar from './Sidebar'
import React from 'react'
import RightSidebar from './RightSidebar'

const Layout = ({
  children,
  height,
  pt,
  px,
  leftSidebar = true,
  rightSidebar = true,
  ...rest
}) => {
  return (
    <Grid
      templateRows='repeat(1 1fr)'
      templateColumns={{ md: '20% 80%', lg: '15% 63% 22%' }}
      pos='relative'
      h='100vh'
      fontFamily='body'
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
      <GridItem>
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
