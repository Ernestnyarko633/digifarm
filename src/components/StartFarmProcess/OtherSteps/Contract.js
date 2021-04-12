import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Image
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import useAuth from 'context/auth'

import ModalWrapper from 'components/Modals/ModalWrapper'
import SignatureSetup from 'components/Signature/SignatureSetup'
import SignatureDisplay from 'components/Signature/SignatureDisplay'
import Button from 'components/Button'

import { IoMdCreate } from 'react-icons/io'

const MotionGrid = motion.custom(Grid)

const Contract = () => {
  const [signatureModal, setSignatureModal] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const { user } = useAuth()

  return (
    <MotionGrid px={10}>
      <ModalWrapper
        size='3xl'
        onClose={setSignatureModal}
        isOpen={signatureModal}
        title='Set Up Signature'
      >
        <SignatureSetup isEditing={setIsEditing} setIsEditing={setIsEditing} />
      </ModalWrapper>
      <GridItem overflowY='scroll' mb={10}>
        <Box css={{ direction: 'ltr' }} p={{ base: 2, md: 10 }}>
          <Heading
            as='h3'
            size='lg'
            mb={6}
            color='cf.400'
            px={{ md: 5 }}
            mt={{ base: 4, md: 0 }}
          >
            Complete Farmer Crowd Farming User Agreement
          </Heading>
          <Text lineHeight='60px' fontSize={{ md: 'xl' }} px={{ md: 5 }}>
            Please read this Crowd Farming User Agreement (the ‘Agreement’)
            carefully for your Complete Farmer (“The Company”) to complete your
            crowd farming subscription. This Agreement should be read together
            withour Terms & Conditions and our Privacy Policy. This Agreement is
            made between (the ‘DigiFarmer’ or ‘You’) , and the Company, and is
            effective upon signature or your acceptance.
            <br />
            <Heading as='h3' size='lg' color='cf.400' mt={{ md: 5 }}>
              Use of Farm Management Service Fee
            </Heading>
            <br />
            The Company shall use the Farm Management Service Fee to take all
            necessary steps to plant and harvest your choses produce on your
            chosen acreage, as described on the Company’s website. Complete
            Farmer the cultivation protocols shall remain the intellectual
            property of the Company and the Company shall have no obligation to
            share it with you or any other third party. The Company reserves the
            right to choose, assign, evaluate, and manage all third parties who
            work with us as business partners or otherwise to provide the Farm
            Management Service to you. DigiFarmers will be provided with weekly
            updates of crop, weather and soil conditions on the farm, and are
            welcome to schedule farm visits using the Complete Farmer
            application. Audit or The Company will submit audit reports by their
            independent quality assurance auditor upon request of the DigiFarmer
            which shall assess the farm processes, seed and yield of harvest,
            should any conflict arise concerning the above between the
            DigiFarmer and the Company.
            <br />
            <Heading as='h3' size='lg' color='cf.400' mt={{ md: 5 }}>
              Insurance
            </Heading>
            <br />
            The Company strongly recommends that DigiFarmers accept the standard
            insurance package offered with the Farm Management Service. If you
            do not want to use the insurance package provided, please notify the
            Company.
            <br />
            <Heading as='h3' size='lg' color='cf.400' mt={{ md: 5 }}>
              Term and Termination
            </Heading>
            <br />
            This Agreement shall commence on today’s date and shall remain
            ineffect until the end of after the harvested produce have been
            sold. The Company reserves the right to terminate this Agreement if
            Complete Farmer suspects, that you have violated any of Complete
            Farmer's policies set out in this Agreement, the Terms & Conditions,
            the Privacy Policy, or any other policy documents or community
            guidelines, or if You have engaged in an improper or fraudulent
            activity in connection with Complete Farmer.
            <br />
            <Heading as='h3' size='lg' color='cf.400' mt={{ md: 5 }}>
              Electronic Signatures
            </Heading>
            <br />
            Each party agrees that the electronic signatures, whether digital or
            encrypted, of the Parties included in this Agreement are intended to
            authenticate this writing and to have the same force and effect as
            manual signatures in so far as the signatures are executed in
            accordance with section 10 of the Electronic Transactions Act, 2008
            (Act 772) of the Republic of Ghana. Delivery of a copy of this
            Agreement or any other document contemplated hereby bearing an
            original or electronic signature by facsimile transmission, by
            electronic mail in “portable document format” (“.pdf”) form, or by
            any other electronic means intended top reserve the original graphic
            and pictorial appearance of a document, will have the same effect as
            physical delivery of the paper document bearing an original or
            electronic signature.
            <br />
            <Heading as='h3' size='lg' color='cf.400' mt={{ md: 5 }}>
              General Terms
            </Heading>
            <br />
            The terms of this Agreement are Confidential and will survive the
            termination of this Agreement.
            <ul style={{ listStyleType: 'upper-alpha' }}>
              <li>
                No term of this Agreement shall be enforceable by a third party
                who is not a party to this Agreement and has no rights under the
                Contracts (Rights of Third Parties) Act to enforce or enjoy the
                benefits of this Agreement.
              </li>
              <li>
                If any provision of this Agreement or the application thereof is
                held invalid or unenforceable, the invalidity or
                unenforceability thereof shall not affect any other provisions
                or applications of this Agreement that can be given effect
                without the invalid or unenforceable provision or application.
                To that end, the provisions of this Agreement are to be
                severable.
              </li>

              <li>
                The Parties shall use their best endeavors to reach an amicable
                settlement of any dispute by mutual discussion between the
                designated representatives of the Parties.
              </li>

              <li>
                This Agreement shall be governed in accordance with the laws
                ofthe Republic of Ghana.
              </li>

              <li>
                Each Party warrants to the other Party that it has the right,
                power and authority to enter into this Agreement and carry out
                its obligations under this Agreement. By clicking the "Accept"
                button, downloading or using the Application, you are agreeing
                to be bound by the terms and conditions of this Agreement. If
                you do not agree to the terms of this Agreement, do not click on
                the "Accept" button and do not download or use the Application.
              </li>
            </ul>
          </Text>

          <Flex my={{ md: 10 }} justifyContent='space-around'>
            <Box textAlign='center' pos='relative'>
              <Heading as='h5' fontSize={{ md: 'lg' }} mb={2}>
                Desmony Koney
              </Heading>
              <Text>CEO</Text>
              <Image
                pos='absolute'
                top={10}
                src={require('assets/images/ceo-sign.png').default}
                alt='CEO Signature'
              />
            </Box>
            <Box textAlign='center' pos='relative'>
              <Heading as='h5' fontSize={{ md: 'lg' }} mb={2}>
                {user?.firstName + ' ' + user?.lastName}
              </Heading>
              <Text>DigiFarmer</Text>
              {user?.signature?.string ? (
                <Box pos='absolute' w='max-content'>
                  <SignatureDisplay
                    contract
                    data={user?.signature}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                  />
                </Box>
              ) : (
                <Button
                  btntitle='Set up signature'
                  color='white'
                  width={48}
                  bgColor='cf.500'
                  leftIcon={<IoMdCreate size={20} />}
                  onClick={() => setSignatureModal(true)}
                />
              )}
            </Box>
          </Flex>
        </Box>
      </GridItem>
    </MotionGrid>
  )
}

Contract.propTypes = {
  user: PropTypes.object.isRequired
}

export default Contract
