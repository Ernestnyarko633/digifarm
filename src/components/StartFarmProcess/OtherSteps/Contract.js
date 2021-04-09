/*eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useAuth from 'context/auth';
import SignatureSetup from 'components/Signature/SignatureSetup';
import SignatureDisplay from 'components/Signature/SignatureDisplay';

const MotionGrid = motion.custom(Grid);

const Contract = ({ farm }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { isAuthenticated } = useAuth();
  const { user } = isAuthenticated();

  return (
    <MotionGrid px={10}>
      <GridItem
        overflowY='scroll'
        mb={10}
      >
        <Box css={{ direction: 'ltr' }} p={{ base: 2, md: 10 }}>
          <Heading
            as='h3'
            size='lg'
            mb={6}
            color='cf.400'
            px={{md: 5}}
            mt={{ base: 4, md: 0 }}
          >
            Complete Farmer Crowd Farming User Agreement
          </Heading>
          <Text lineHeight="60px" fontSize={{md: 'xl'}}  px={{md: 5}}>
            Please read this Crowd Farming User Agreement (the ‘Agreement’)
            carefully for your Complete Farmer (“The Company”) to complete
            yourcrowd farming subscription. This Agreement should be read
            together withour Terms & Conditions and our Privacy Policy.This
            Agreement is made between (the ‘DigiFarmer’ or ‘You’), and
            theCompany, and is effective upon signature or your acceptance.
            <br/> 
            <Heading
            as='h3'
            size='lg'
            color='cf.400'
            mt={{md: 5}}
          >
            Use
            of Farm Management Service Fee
          </Heading>
             <br/>
            The Company shall use the Farm
            Management Service Fee to take allnecessary steps to plant and
            harvest your choses produce on your chosenacreage, as described on
            the Company’s website. Complete Farmer thecultivation protocols
            shall remain the intellectual property of the Companyand the Company
            shall have no obligation to share it with you or anyother third
            party. The Company reserves the right to choose, assign, evaluate,
            and manageall third parties who work with us as business partners or
            otherwise toprovide the Farm Management Service to you.Crowd Farmers
            will be provided with weekly updates of crop, weather andsoil
            conditions on the farm, and are welcome to schedule farm visits
            usingthe Complete Farmer application. 
            
            
            AuditorThe Company will submit audit reports by their independent
            qualityassurance auditor upon request of the DigiFarmer which
            shall assessthe farm processes, seed and yield of harvest, should
            any conflict ariseconcerning the above between the DigiFarmer and
            the Company. 

            <br/> 
            <Heading
            as='h3'
            size='lg'
            color='cf.400'
            mt={{md: 5}}
          >
            Insurance
          </Heading>
             <br/>
           
            
            The Company strongly recommends that Crowd
            Farmers accept thestandard insurance package offered with the Farm
            Management Service. Ifyou do not want to use the insurance package
            provided, please notify theCompany.
            
            <br/> 
            <Heading
            as='h3'
            size='lg'
            color='cf.400'
            mt={{md: 5}}
          >
           Term and Termination
          </Heading>
             <br/>
            This
            Agreement shall commence on today’s date and shall remain ineffect
            until the end of after the harvested produce have been sold.The
            Company reserves the right to terminate this Agreement if
            CompleteFarmer suspects, that you have violated any of Complete
            Farmer's policiesset out in this Agreement, the Terms & Conditions,
            the Privacy Policy, orany other policy documents or community
            guidelines, or if You haveengaged in an improper or fraudulent
            activity in connection with CompleteFarmer. 
            <br/> 
            <Heading
            as='h3'
            size='lg'
            color='cf.400'
            mt={{md: 5}}
          >
           Electronic
            Signatures
          </Heading>
             <br/>
            Each party agrees that the electronic signatures, whether
            digital orencrypted, of the Parties included in this Agreement are
            intended toauthenticate this writing and to have the same force and
            effect as manualsignatures in so far as the signatures are executed
            in accordance withsection 10 of the Electronic Transactions Act,
            2008 (Act 772) of theRepublic of Ghana. Delivery of a copy of this
            Agreement or any otherdocument contemplated hereby bearing an
            original or electronic signatureby facsimile transmission, by
            electronic mail in “portable documentformat” (“.pdf”) form, or by
            any other electronic means intended topreserve the original graphic
            and pictorial appearance of a document, willhave the same effect as
            physical delivery of the paper document bearingan original or
            electronic signature.
            
            <br/> 
            <Heading
            as='h3'
            size='lg'
            color='cf.400'
            mt={{md: 5}}
          >
          General Terms
          </Heading>
             <br/>
            
            
            The terms of this Agreement are
            Confidential and will survive thetermination of this Agreement. 
            <ul style={{ listStyleType: "upper-alpha"}}>
              <li>
              No
            term of this Agreement shall be enforceable by a third party whois
            not a party to this Agreement and has no rights under theContracts
            (Rights of Third Parties) Act to enforce or enjoy thebenefits of
            this Agreement. 
              </li>
              <li>
              If any provision of this Agreement or the
            application thereof is heldinvalid or unenforceable, the invalidity
            or unenforceability thereofshall not affect any other provisions or
            applications of this Agreement that can be given effect without the
            invalid orunenforceable provision or application. To that end, the
            provisionsof this Agreement are to be severable.
              </li>
            
            
              <li>
              The Parties shall
            use their best endeavors to reach an amicablesettlement of any
            dispute by mutual discussion between thedesignated representatives
            of the Parties.
              </li>
             
              <li>
              This Agreement shall be governed in accordance with
            the laws ofthe Republic of Ghana. 
              </li>
            
           
              <li>
              Each Party warrants to the other
            Party that it has the right, powerand authority to enter into this
            Agreement and carry out itsobligations under this Agreement.By
            clicking the "Accept" button, downloading or using the Application,
            youare agreeing to be bound by the terms and conditions of this
            Agreement.If you do not agree to the terms of this Agreement, do not
            click on the"Accept" button and do not download or use the
            Application.
              </li>
            
            </ul>
          </Text>

          <Box w={{ md: 90 }} mx='auto' my={{ md: 10 }}>
            <Heading as='h5' fontSize={{ md: 'lg' }} mb={2}>
              Your signature
            </Heading>
            {user?.signature?.string && !isEditing ? (
              <SignatureDisplay
                contract
                data={user?.signature}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            ) : (
              <SignatureSetup
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            )}
          </Box>
        </Box>
      </GridItem>
    </MotionGrid>
  );
};

Contract.propTypes = {
  farm: PropTypes.object.isRequired,
};

export default Contract;
