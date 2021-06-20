import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  useToast,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Button
} from '@chakra-ui/react'
// import { motion } from 'framer-motion'
import { FaEllipsisH } from 'react-icons/fa'
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
        <MenuButton
          as={Button}
          bg='transparent'
          _active={{ textDecor: 'none' }}
          _focus={{ textDecor: 'none' }}
          cursor='pointer'
          _hover={{
            bg: '#F2F2F2',
            padding: '2px',
            rounded: '100%'
          }}
        >
          <Icon as={FaEllipsisH} color='#828282' boxSize={5} />
        </MenuButton>
        <MenuList
          _hover={{ textDecor: 'none' }}
          _focus={{ textDecor: 'none' }}
          shadow='md'
          minWidth='30px'
        >
          <MenuItem
            autoSelect={false}
            _active={{ textDecor: 'none' }}
            isLoading={loading}
            onClick={handleInvite}
            _hover={{ backgroundColor: '#F9F9F9' }}
          >
            Resend invite
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

TableMenu.propTypes = {
  id: PropTypes.any,
  email: PropTypes.string
}

export default TableMenu
