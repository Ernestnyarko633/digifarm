import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, useToast, Icon } from '@chakra-ui/react'
import { Menu } from '@headlessui/react'
import { FaEllipsisH } from 'react-icons/fa'
import useApi from 'context/api'

const TableMenu = ({ id, email }) => {
  const toast = useToast()

  const [loading, setLoading] = useState(false)
  const { inviteMember } = useApi()

  const handleInvite = async () => {
    try {
      setLoading(true)
      toast({
        title: 'Sending invite please wait',
        status: 'success',
        duration: 2000,
        position: 'top-right'
      })
      await inviteMember(id, { email: email })
      toast({
        title: 'Invite sent successfully',
        status: 'success',
        duration: 3000,
        position: 'top-right'
      })
    } catch (error) {
      toast({
        title: 'Error occured. Contact support',
        description:
          error?.message || error?.data?.message || 'Unexpected error.',
        status: 'error',
        duration: 2000,
        position: 'top-right'
      })
    }
  }

  return (
    <Box pos='absolute'>
      <Menu>
        <Menu.Button>
          <Box
            _active={{ textDecor: 'none' }}
            _focus={{ textDecor: 'none' }}
            bg='transparent'
            _hover={{
              bg: { base: 'none', md: '#F2F2F2' },
              padding: { base: 0, md: '4px' },
              rounded: '100%'
            }}
          >
            <Icon as={FaEllipsisH} color='#828282' boxSize={5} />
          </Box>
        </Menu.Button>
        <Menu.Items shadow='md'>
          <Menu.Item>
            <Box
              zIndex={5}
              py={2}
              px={{ base: 1, md: 6 }}
              bg='white'
              isLoading={loading}
              onClick={handleInvite}
              shadow='lg'
              _hover={{ backgroundColor: '#F9F9F9', cursor: 'pointer' }}
              d='block'
              w={{ base: '7rem', md: '9rem' }}
            >
              Resend Invite
            </Box>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </Box>
  )
}

TableMenu.propTypes = {
  id: PropTypes.any,
  email: PropTypes.string
}

export default TableMenu
