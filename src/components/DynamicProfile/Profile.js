import React from 'react'
import { Box, Container } from '@chakra-ui/react'

import AvatarForm from './ProfileForms/AvatarForm'
import UserDetailsForm from './ProfileForms/UserDetailsForm'
import BankingDetailsForm from './ProfileForms/BankingDetailsForm'

import useFetch from 'hooks/useFetch'
import useAuth from 'context/auth'
import useApi from 'context/api'
import Signature from 'components/Signature'
import FetchCard from 'components/FetchCard'

const Profile = () => {
  const { isAuthenticated } = useAuth()
  const [reload, setReload] = React.useState(0)

  // const [selectedFile, setSelectedFile] = React.useState(null)

  const triggerReload = () => setReload(s => s++)
  const { getBankDetails } = useApi()

  const { user } = isAuthenticated()

  const { data: bankDetails, isLoading: loading, error } = useFetch(
    null,
    getBankDetails,
    reload,
    { user: user?._id }
  )

  return (
    <Container maxW={{ md: '4xl' }}>
      <AvatarForm />
      <UserDetailsForm />
      <Box
        rounded='xl'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        bg='white'
        p={{ base: 2, md: 10 }}
        mt={12}
      >
        <Signature data={user?.signature} />
      </Box>

      {loading || error ? (
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
      ) : (
        <BankingDetailsForm bankDetails={bankDetails} />
      )}
    </Container>
  )
}

export default Profile
