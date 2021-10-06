import React from 'react'
import { Box, Container } from '@chakra-ui/react'

import AvatarForm from './ProfileForms/AvatarForm'
import UserDetailsForm from './ProfileForms/UserDetailsForm'
import BankingDetailsForm from './ProfileForms/BankingDetailsForm'

import useAuth from 'context/auth'
import useApi from 'context/api'
import Signature from 'components/Signature'
import FetchCard from 'components/FetchCard'
import ProfileIdentity from './ProfileForms/ProfileIdentity'
import { useQuery } from 'react-query'

const Profile = () => {
  const { isAuthenticated } = useAuth()

  const { getBankDetails } = useApi()

  const { user } = isAuthenticated()

  const {
    data: bankDetails,
    isLoading: loading,
    error,
    refetch
  } = useQuery('banking_details', () => getBankDetails())

  const triggerReload = () => refetch()

  return loading || error ? (
    <Box y={{ md: 20 }}>
      <FetchCard
        direction='column'
        align='center'
        justify='center'
        mx='auto'
        reload={() => {
          triggerReload()
        }}
        loading={loading}
        error={error}
        text='Standby as we load your bank details'
      />
    </Box>
  ) : (
    <Container maxW={{ md: '4xl' }}>
      <AvatarForm />
      <UserDetailsForm />
      <ProfileIdentity />

      <BankingDetailsForm bankDetails={bankDetails?.data || {}} />
      <Box
        mt={12}
        bg='white'
        rounded='xl'
        p={{ base: 2, md: 10 }}
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      >
        <Signature data={user?.signature} />
      </Box>
    </Container>
  )
}

export default Profile
