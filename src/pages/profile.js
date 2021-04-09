import { Box, Flex, Grid, Text, Container, Input, Icon } from '@chakra-ui/react'
import React from 'react'
import DynamicProfile from 'components/DynamicProfile'
import Header from 'container/Header'
import { FiUser } from 'react-icons/fi'
import { BiCog, BiLockAlt } from 'react-icons/bi'
import { BsShield } from 'react-icons/bs'

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
      name: 'Privacy Terms',
      comp: 'compE',
      icon: BsShield
      // link: 'https://www.completefarmer.com/terms'
    }
  ]

  return (
    <Box>
      <Header />
      <Container maxW='7xl'>
        <Flex
          align='center'
          justify='center'
          h={70}
          w='100%'
          bg='gray.100'
          mt={20}
        >
          <Box
            as='label'
            rounded='30px'
            px={4}
            py={2}
            bg='white'
            borderWidth={1}
            borderColor='cf.400'
            role='button'
            type='button'
          >
            <Input d='none' type='file' />
            <Text color='cf.400' fontSize='sm'>
              Change your header image
            </Text>
          </Box>
        </Flex>
        <Grid templateColumns={{ md: '20% 80%' }} my={16}>
          <Flex
            // align='center'
            // justify='center'
            direction='column'
            borderWidth={1}
            borderColor='gray.200'
            rounded='30px'
            p={4}
            h={{ md: 70 }}
            bg='white'
            filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
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
                onClick={() => setPage(menu.comp)}
              >
                <Icon as={menu.icon} mr={2} boxSize={{ md: 5 }} />
                <Text>{menu.name}</Text>
              </Flex>
            ))}
          </Flex>

          <DynamicProfile page={page} />
        </Grid>
      </Container>
    </Box>
  )
}

export default Profile
