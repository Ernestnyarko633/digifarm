import React from 'react'
import {
  Box,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { BiMenuAltLeft } from 'react-icons/bi'
import SideMenu from './SideMenu'

const SideBar = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box display={{ base: 'block', lg: 'none' }}>
      <IconButton
        bg='transparent'
        icon={<BiMenuAltLeft color='#31BC2E' />}
        fontSize='35px'
        onClick={onOpen}
      />

      <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='xs'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _focus={false} />
          <DrawerBody pt={8}>
            <SideMenu data={data} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

SideBar.propTypes = {
  data: PropTypes.any
}
export default SideBar
