import { Box, Flex, Grid, Text, Container, Input } from '@chakra-ui/react'
import React from 'react'
import DynamicProfile from 'components/DynamicProfile'
import Header from 'container/Header'

const Profile = () => {
  const [page, setPage] = React.useState('compA')

  const menus = [
    {
      name: 'Profile',
      comp: 'compA'
    },
    {
      name: 'Account Settings',
      comp: 'compB'
    },
    {
      name: 'Notifications',
      comp: 'compC'
    },
    {
      name: 'Security',
      comp: 'compD'
    },
    {
      name: 'Privacy Terms',
      comp: 'compE'
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
        <Grid templateColumns={{ md: '18% 82%' }} my={16}>
          <Flex
            align='center'
            justify='center'
            direction='column'
            borderWidth={1}
            borderColor='gray.200'
            rounded='30px'
            p={4}
            h={{ md: 85 }}
          >
            {menus.map(menu => (
              <Box
                key={menu}
                as='button'
                role='button'
                my={3}
                bg={page === menu.comp && 'cf.200'}
                px={8}
                py={2}
                rounded='30px'
                onClick={() => setPage(menu.comp)}
              >
                <Text>{menu.name}</Text>
              </Box>
            ))}
          </Flex>

          <DynamicProfile page={page} />
        </Grid>
      </Container>
    </Box>
  )
}

export default Profile
