import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/layout'
import { Menu } from '@headlessui/react'
import { motion } from 'framer-motion'
import { elipses } from 'theme/Icons'
import Icon from '@chakra-ui/icon'

const MotionBox = motion(Box)

const TableMenu = ({ data, state }) => {
  return (
    <Box>
      <Menu>
        {({ open }) => (
          <Box>
            <Menu.Button as={Box} _focus={{ outline: 'none' }} cursor='pointer'>
              <Box>
                <Icon as={elipses} color='cf.400' boxSize={6} />
              </Box>
            </Menu.Button>
            {open && (
              <Menu.Items
                static
                as={MotionBox}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 }
                }}
                boxShadow='md'
                exit={{ opacity: 0 }}
                pos='absolute'
                bg='white'
                w={40}
                h={10}
                right={10}
                rounded='sm'
                zIndex={30}
                mt={2}
                color='gray.600'
                alignItems='left'
              >
                <Menu.Item>
                  {({ active }) => (
                    <Box
                      as='button'
                      role='button'
                      py={2}
                      w='100%'
                      _hover={{ textDecor: 'none' }}
                      bg={active && 'cf.800'}
                      color={active && 'white'}
                      d='block'
                      // eslint-disable-next-line no-console
                      onClick={() => console.log('hiii')}
                    >
                      Resend invite
                    </Box>
                  )}
                </Menu.Item>
              </Menu.Items>
            )}
          </Box>
        )}
      </Menu>
    </Box>
  )
}

TableMenu.propTypes = {
  data: PropTypes.any,
  state: PropTypes.string
}

export default TableMenu
