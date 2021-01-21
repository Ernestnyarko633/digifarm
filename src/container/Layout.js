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
      <GridItem shadow='lg'>
        <Sidebar />
      </GridItem>
      <GridItem>
        <Box
          as='main'
          w='100%'
          color='gray.800'
          pt={pt}
          px={px}
          h={height}
          fontFamily='body'
          {...rest}
        >
          {children}
        </Box>
      </GridItem>
      <GridItem shadow='lg'>
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
