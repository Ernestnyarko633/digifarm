import { Box, Flex, Grid, Text, Container, Icon } from '@chakra-ui/react'
import React from 'react'
import DynamicProfile from 'components/DynamicProfile'
import Header from 'container/Header'
import { FiUser } from 'react-icons/fi'
import { BiCog, BiLockAlt } from 'react-icons/bi'
import { BsShield } from 'react-icons/bs'
import { GrCircleInformation } from 'react-icons/gr'
const Profile = () => {
  const [page, setPage] = React.useState('compA')

  const menus = [
    {
      name: 'Profile',
      comp: 'compA',
      icon: FiUser
    },
    {
      name: 'Account Settings',
      comp: 'compB',
      icon: BiCog
    },
    // {
    //   name: 'Notifications',
    //   comp: 'compC',
    //   icon: FiBell
    // },
    {
      name: 'Security',
      comp: 'compD',
      icon: BiLockAlt
    },
    {
      name: 'Privacy Policy',
      comp: 'compE',
      icon: GrCircleInformation
    },
    {
      name: 'Terms & Conditions',
      comp: 'compF',
      icon: BsShield
    }
  ]

  return (
    <Box bgColor='white'>
      <Header />
      <Container pt={{ md: 55 }} maxW={{ md: '7xl' }}>
        <Grid templateColumns={{ md: '20% 80%' }} my={16}>
          <Flex
            d={{ base: 'none', md: 'flex' }}
            direction='column'
            borderWidth={1}
            borderColor='gray.100'
            rounded='30px'
            p={4}
            h={{ md: 85 }}
            bg='white'
            filter='drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.1))'
          >
            {menus.map(menu => (
              <Flex
                align='center'
                key={menu}
                as='button'
                role='button'
                my={3}
                bg={page === menu.comp && 'cf.200'}
                px={5}
                py={2}
                rounded='30px'
                onClick={() => {
                  return menu?.comp === 'compE'
                    ? window.open(
                        'https://www.completefarmer.com/privacy-policy',
                        '_blank'
                      )
                    : menu?.comp === 'compF'
                    ? window.open(
                        'https://www.completefarmer.com/terms-and-conditions',
                        '_blank'
                      )
                    : setPage(menu.comp)
                }}
              >
                <Icon as={menu.icon} mr={2} boxSize={{ md: 5 }} />
                <Text>{menu.name}</Text>
              </Flex>
            ))}
          </Flex>

          {/* <Flex
            align='center'
            d={{ base: 'flex', md: 'none' }}
            overflowX='scroll'
            mb={6}
          >
            {menus.map((menu) => (
              <Flex
                align='center'
                justify='center'
                key={menu}
                as='button'
                role='button'
                my={3}
                bg={page === menu.comp && 'cf.200'}
                px={5}
                py={2}
                minW={48}
                rounded='30px'
                onClick={() => setPage(menu.comp)}
              >
                <Icon as={menu.icon} mr={2} boxSize={5} />
                <Text fontSize='sm'>{menu.name}</Text>
              </Flex>
            ))}
          </Flex> */}

          <DynamicProfile page={page} />
        </Grid>
      </Container>
    </Box>
  )
}

export default Profile
