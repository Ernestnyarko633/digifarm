import { Box, Grid } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, height, pt, px, ...rest }) => (
  <Grid
    templateAreas='"header header" "aside main" "aside main"'
    templateColumns={{ md: '7.9% 92.1%' }}
    templateRows={{ md: '4% 90%' }}
    pos='relative'
  >
    <Header />
    <Sidebar />
    <Box
      as='main'
      fontFamily='body'
      fontSize={{ md: 'md' }}
      gridArea='main'
      w='100%'
      color='gray.800'
      pt={pt || 32}
      px={px || 32}
      h={height}
      {...rest}
    >
      {children}
    </Box>
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
