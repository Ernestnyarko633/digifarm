import { Box, Button, Icon, Link, Text } from '@chakra-ui/core';
import { NavLink } from 'react-router-dom';
import { farm, home, sourcing, wallet, warehouse } from 'theme/Icons';

const menuLink = [
  { icon: home, link: '/dashboard', name: 'Home' },
  { icon: farm, link: '/farms', name: 'Farms' },
  { icon: sourcing, link: '/orders', name: 'Orders' },
  { icon: wallet, link: '/finance', name: 'Finance' },
  { icon: warehouse, link: '/market', name: 'Market' },
];

const Sidebar = () => (
  <Box
    as='aside'
    gridArea='aside'
    pos='fixed'
    bottom={0}
    left={0}
    w={{ md: 40 }}
    h={{ lg: '100vh' }}
    bg='white'
    zIndex={20}
    pt={40}
    borderRightWidth={1}
    borderRightColor='gray.300'
  >
    <Box mb={10} mx={1}>
      <Button
        variant='outline'
        colorScheme='cfButton'
        fontSize='sm'
        rounded='none'
      >
        Take a quick tour
      </Button>
    </Box>
    <Text as='ul'>
      {menuLink.map((item) => (
        <Link
          activeClassName='activeClasName'
          d='flex'
          alignItems='center'
          flexDirection='column'
          as={NavLink}
          to={item.link}
          cursor='pointer'
          color='gray.700'
          py={6}
          className='active-link'
          transition='background-color .2s ease-in'
          _hover={{ textDecor: 'none', color: 'cf.400', bg: 'gray.50' }}
          _activeLink={{ color: 'white', bg: 'cf.400' }}
        >
          <Icon as={item.icon} boxSize={10} />
          <Text fontSize='xs' textAlign='center' mt={1}>
            {item.name}
          </Text>
        </Link>
      ))}
    </Text>
  </Box>
);

export default Sidebar;
