import React from 'react'
import {
  Box,
  Text,
  Flex,
  Avatar,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  // DrawerFooter,
  // DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react'
import Details from './Details'
import { getformattedDate } from 'helpers/misc'
import PropTypes from 'prop-types'
import { BiMenuAltLeft } from 'react-icons/bi'

const SideBar = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <IconButton
        bg='transparent'
        icon={<BiMenuAltLeft color='#31BC2E' />}
        fontSize='30px'
        onClick={onOpen}
      />

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _focus={false} />
          <DrawerBody>
            <Box w='292px' mx='auto' pt={8}>
              <Box p='5px'>
                <Text color='red.300' textAlign='center'>
                  Farm starts:
                  <Text as='span' color='#D0021B' fontWeight='bold' ml={2}>
                    {getformattedDate(data?.product?.startDate)}
                  </Text>
                </Text>
              </Box>
              <Box
                p={6}
                justifyContent='center'
                borderBottomWidth={1}
                borderColor='gray.300'
              >
                <Flex justify='center'>
                  <Box>
                    <Avatar name={data?.name} src={data?.imageUrl} size='xl' />
                  </Box>
                </Flex>
                <Text fontWeight='bold' fontSize='24px' textAlign='center'>
                  {data?.name}
                </Text>
              </Box>
              <Box>
                <Details
                  image={data?.product?.cropVariety?.crop?.imageUrl}
                  name={data?.product?.cropVariety?.crop?.name}
                  variety={data?.product?.cropVariety?.crop?.sciName}
                  cropCode={data?.product?.name}
                />
                <Details
                  title='Location'
                  subtitle={
                    data?.product?.location?.name +
                    ' , ' +
                    data?.product?.location?.state
                  }
                />
                <Details
                  title='Cooperative type'
                  subtitle={data?.type?.name?.toUpperCase()}
                />
                <Details title='Members' subtitle={data?.users?.length} />
                <Details title='Acreage' subtitle={data?.product?.acreage} />
                <Details
                  title='Farm Manager'
                  subtitle={
                    data?.product?.managers[0]?.firstName +
                    ' ' +
                    data?.product?.managers[0]?.lastName
                  }
                />
                <Details title='Farm Contract' />
              </Box>
            </Box>
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
