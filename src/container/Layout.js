import { Box, Grid, GridItem } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, height, pt, px, ...rest }) => (
  <Grid
    templateRows='repeat(1 1fr)'
    templateColumns='15% 63% 22%'
    pos='relative'
    fontFamily='body'
    fontSize={{ md: 'md' }}
  >
    <Header />
    <GridItem>
      <Sidebar />
    </GridItem>
    <GridItem bg='gray.50'>
      <Box
        as='main'
        gridArea='main'
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
    <GridItem bg='white'>
      <Box as='aside' gridArea='right'>
        hey
      </Box>
    </GridItem>
  </Grid>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.any,
  pt: PropTypes.any,
  px: PropTypes.any,
  rest: PropTypes.any,
};

export default Layout;
