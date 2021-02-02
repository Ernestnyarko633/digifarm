import { Box, Grid, GridItem } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Header from './Header'
import Sidebar from './Sidebar'
import React from 'react'
import RightSidebar from './RightSidebar'

const Layout = ({ children, height, pt, px, ...rest }) => {
  return (
    <Grid
      templateRows='repeat(1 1fr)'
      templateColumns='15% 63% 22%'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
    >
      <Header />
      <GridItem shadow='xl' zIndex={40}>
        <Sidebar />
      </GridItem>
      <GridItem>
        <Box
          px={px}
          pt={pt}
          w='100%'
          as='main'
          bg='cf-dark.400'
          h={height}
          color='gray.800'
          fontFamily='body'
          overflowX='hidden'
          {...rest}
        >
          {children}
        </Box>
      </GridItem>
      <GridItem shadow='xl' zIndex={40}>
        <RightSidebar />
      </GridItem>
    </Grid>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.any,
  pt: PropTypes.any,
  px: PropTypes.any,
  rest: PropTypes.any
}

export default Layout
