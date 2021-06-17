import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  useToast,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
// import { motion } from 'framer-motion'
import { FaEllipsisH } from 'react-icons/fa'
import Icon from '@chakra-ui/icon'
import useApi from 'context/api'

// const MotionBox = motion(Box)

const TableMenu = ({ id, email }) => {
  const toast = useToast()

  const [loading, setLoading] = useState(false)
  const { inviteMember } = useApi()

  const handleInvite = async () => {
    try {
      setLoading(true)
      await inviteMember(id, { email: email })
      toast({
        title: 'Invite sent successfully',
        status: 'success',
        duration: 2000,
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
    <Box>
      <Menu>
        <Box>
          <MenuButton as={Box} cursor='pointer'>
            <Box
              _hover={{
                bg: '#F2F2F2',
                padding: '2px',
                rounded: '100%'
              }}
            >
              <Icon as={FaEllipsisH} color='#828282' boxSize={5} />
            </Box>
          </MenuButton>
          <MenuList
            // w={12}
            shadow='md'
            h={12}
            p={0}
            color='gray.800'
            _hover={{ textDecor: 'none' }}
            _focus={{ textDecor: 'none' }}
          >
            <MenuItem
              _hover={{ backgroundColor: '#F9F9F9' }}
              isLoading={loading}
              onClick={handleInvite}
              // alignItems='left'
            >
              <Box
                as='button'
                role='button'
                w='full'
                d='block'
                p={2}
                alignItems='left'
              >
                Resend invite
              </Box>
            </MenuItem>
          </MenuList>
        </Box>
      </Menu>
    </Box>
  )
}

TableMenu.propTypes = {
  id: PropTypes.any,
  email: PropTypes.string
}

export default TableMenu
