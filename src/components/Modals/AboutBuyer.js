import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  Heading,
  Flex,
  Divider,
  Grid,
  Avatar,
  Icon
} from '@chakra-ui/react'

import { FaMapMarkerAlt } from 'react-icons/fa'
import ConfirmSale from 'components/Modals/ConfirmSale'

const AboutBuyer = ({ buyers }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  // const { modal, setModal } = useState(true)
  const [isOpened, setOpened] = React.useState(false)

  const onOpenx = () => {
    setOpened(true)
  }

  const onClosex = () => {
    setOpened(false)
  }

  const getRule = value => {
    switch (value) {
      case 'FCA':
        return 'Free Carrier is abbreviated as FCA. Free carrier is a trade term requiring the seller of goods to deliver those goods to a named airport, shipping terminal, warehouse, or other carrier location specified by the buyer. '
      case 'CIP':
        return "CIP stands for Carriage and Insurance Paid To. It is an Incoterm where the seller is responsible for the delivery of goods to an agreed destination in the buyer's country and must pay for the cost of this carriage."
      case 'CPT':
        return 'Carriage Paid To abreviated as CPT is an incoterm definition used to explain that the cost of the goods includes everything required to bring the products to the agreed destination'
      case 'FOB':
        return 'Free on Board (FOB) is an Incoterm, which means the seller is responsible for loading the purchased cargo onto the ship, and all costs associated'
      case 'CIF':
        return 'Under CIF (short for “Cost, Insurance and Freight”), the seller delivers the goods, cleared for export, onboard the vessel at the port of shipment, pays for the transport of the goods to the port of destination, and also obtains and pays for minimum insurance coverage on the goods through their journey to the named port of destination'
      case 'FARMGATE EXWORKS':
        return 'Ex works (EXW) is an international trade term that describes when a seller makes a product available at a designated location, and the buyer of the product must cover the transport costs'
      default:
        return null
    }
  }

  return (
    <>
      <Button
        colorScheme='none'
        rounded='30px'
        ml={2}
        mt={1}
        borderWidth={1}
        color='cf.400'
        mr={2}
        borderColor='cf.400'
        px={10}
        onClick={onOpen}
      >
        About Buyer
      </Button>

      <ConfirmSale
        onClick={onOpenx}
        onClose={onClose}
        isOpenx={isOpened}
        onClosex={onClosex}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        variant='outline'
        borderColor='black'
        borderWidth={5}
        colorScheme='white'
        isCentered
        size='6xl'
      >
        <ModalOverlay />
        <ModalContent>
          <Flex m={3} justify='center' align='center'>
            <Box ml={10}>
              <Heading as='h4' fontWeight='bold' fontSize={{ md: 'xl' }}>
                About buyer
              </Heading>
            </Box>
            <ModalCloseButton />
          </Flex>
          <Divider orientation='horizontal' borderColor='gray.400' />
          <ModalBody>
            <Grid p={8} templateColumns='50% 50%'>
              <Flex align='center' justify='center' height='50%'>
                <Avatar mt={35} boxSize={80} src={buyers?.user?.avatar} />
              </Flex>
              <Box>
                <Box>
                  <Heading fontSize='36px'>
                    {buyers?.user?.firstName} {buyers?.user?.lastName}
                  </Heading>
                  <Flex py={2}>
                    <Icon
                      as={FaMapMarkerAlt}
                      color='gray.400'
                      pr={2}
                      w={5}
                      h={5}
                      pt={1}
                    />
                    <Text fontSize='18px'>
                      {buyers?.onboarding?.info?.address?.street},{' '}
                      {buyers?.onboarding?.info?.address?.state}
                    </Text>
                  </Flex>
                </Box>
                <Box
                  borderWidth={1}
                  bgColor='none'
                  borderColor='gray.400'
                  borderRadius='5px'
                  p={4}
                  w={{ md: 110 }}
                >
                  <Heading fontSize='18px'>Company Name</Heading>
                  <Text fontSize='14px'>{buyers?.onboarding?.info?.name}</Text>
                  <Text fontSize='14px' pb={4}>
                    {buyers?.onboarding?.info?.address?.state},{' '}
                    {buyers?.onboarding?.info?.address?.country}
                  </Text>
                  <hr />
                  <Heading fontSize='18px' pt={2}>
                    Company description
                  </Heading>
                  <Text fontSize='14px'>
                    {buyers?.onboarding?.info?.description}
                  </Text>
                </Box>
                <Box
                  borderWidth={1}
                  bgColor='none'
                  borderColor='gray.400'
                  borderRadius='5px'
                  p={4}
                  mt={6}
                  w={{ md: 110 }}
                  h={{ md: 60 }}
                >
                  <Heading fontSize='18px'>Need</Heading>
                  <Flex pb={4} justifyContent='space-between'>
                    <Text fontSize='14px'>
                      {buyers?.crop?.variety?.name} | {buyers?.demand} tonnes
                    </Text>
                    <Text color='cf.400' fontSize='16px' fontWeight={600}>
                      ${buyers?.cost} per tonne
                    </Text>
                  </Flex>
                  <hr />
                  <Heading fontSize='18px' pt={2}>
                    Description
                  </Heading>
                  <Text fontSize='14px'>Soya Beans | 100 tonnes</Text>
                  <Text p={1} fontSize='14px'>
                    Sandy loam soil is one of the most preferable types of soil
                    for many types of plants.Planting in loam soil with a high
                    percentage of sand is the same as planting in normal loam
                    soil, but extra amendments may be made to compensate for
                    slightly lower water
                  </Text>
                </Box>
                <Box
                  borderWidth={1}
                  bgColor='none'
                  borderColor='gray.400'
                  borderRadius='5px'
                  p={4}
                  mt={6}
                  w={{ md: 110 }}
                  h={{ md: 60 }}
                >
                  <Heading fontSize='18px' pb={4}>
                    Incoterm
                  </Heading>

                  <hr />

                  <Heading fontSize='18px' pt={2}>
                    {buyers?.deliveryMethod?.rule}
                  </Heading>
                  <Text fontSize='14px'>
                    {getRule(buyers?.deliveryMethod?.rule)}
                  </Text>
                </Box>
                <Flex>
                  <Button
                    mt={4}
                    colorScheme='linear'
                    rounded='30px'
                    fontSize='xs'
                    width={{ md: '240px' }}
                    h={{ md: '60px' }}
                    onClick={onOpenx}
                  >
                    Sell to buyer
                  </Button>
                  <Button
                    colorScheme='none'
                    rounded='30px'
                    ml={2}
                    mt={4}
                    onClick={onClose}
                    borderWidth={1}
                    borderColor='black'
                    w={{ md: '240px' }}
                    h={{ md: '60px' }}
                    color='black'
                    mr={2}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Box>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
AboutBuyer.propTypes = {
  buyers: PropTypes.any.isRequired
}

export default AboutBuyer
