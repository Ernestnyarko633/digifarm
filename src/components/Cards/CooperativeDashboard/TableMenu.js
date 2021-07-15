/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, useToast, Icon } from '@chakra-ui/react'
import { FaEllipsisH } from 'react-icons/fa'
import useApi from 'context/api'
import { Whisper } from 'rsuite'

const TableMenu = ({ id, email }) => {
  const toast = useToast()

  const [loading, setLoading] = useState(false)
  const { inviteMember } = useApi()

  const Invite = () => {
    const Overlay = React.forwardRef(({ style, onClose, ...rest }, ref) => {
      const styles = {
        ...style,
        background: '#fff',
        width: 100,
        padding: 10,
        borderRadius: 4,
        position: 'absolute',
        cursor: 'pointer'
      }

      return (
        <div {...rest} style={styles} ref={ref}>
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
            fontSize='sm'
            w={{ base: '7rem', md: '9rem' }}
          >
            Resend Invite
          </Box>
        </div>
      )
    })

    Overlay.propTypes = {
      style: PropTypes.any,
      onClose: PropTypes.any
    }

    return (
      <Box>
        <Whisper
          trigger='click'
          speaker={(props, ref) => {
            const { className, left, top, onClose } = props
            return (
              <Overlay
                style={{ left, top }}
                onClose={onClose}
                className={className}
                ref={ref}
              />
            )
          }}
        >
          <Box>
            <Icon as={FaEllipsisH} cursor='pointer' color='cf.800' />
          </Box>
        </Whisper>
      </Box>
    )
  }

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
    <Box pos='relative'>
      <Invite />
    </Box>
  )
}

TableMenu.propTypes = {
  id: PropTypes.any,
  email: PropTypes.string
}

export default TableMenu
