import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import FormRadio from 'components/Form/FormRadio';
import React from 'react';

const Contract = () => {
  const options = ['Accept', 'Decline'];
  const [contract, setContract] = React.useState('');

  return (
    <Grid templateColumns={{ md: 'repeat(2, 1fr)' }}>
      <GridItem>Left</GridItem>
      <GridItem
        borderLeftWidth={1}
        borderLeftColor='gray.300'
        overflowY='scroll'
        css={{
          direction: 'rtl',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth',
        }}
        mb={10}
      >
        <Box css={{ direction: 'ltr' }} p={{ md: 10 }}>
          <Heading as='h3' size='lg' mb={6} color='cf.400'>
            Complete Farmer Crowd Farming User Agreement
          </Heading>
          <Text>
            Please read this Crowd Farming User Agreement (the ‘Agreement’)
            carefully for your Complete Farmer (“The Company”) to complete
            yourcrowd farming subscription. This Agreement should be read
            together withour Terms & Conditions and our Privacy Policy.This
            Agreement is made between (the ‘Crowd Farmer’ or ‘You’), and
            theCompany, and is effective upon signature or your acceptance. Use
            of Farm Management Service FeeThe Company shall use the Farm
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
            usingthe Complete Farmer application. Independent Quality Assurance
            AuditorThe Company will submit audit reports by their independent
            qualityassurance auditor upon request of the Crowd Farmer which
            shall assessthe farm processes, seed and yield of harvest, should
            any conflict ariseconcerning the above between the Crowd Farmer and
            the Company. InsuranceThe Company strongly recommends that Crowd
            Farmers accept thestandard insurance package offered with the Farm
            Management Service. Ifyou do not want to use the insurance package
            provided, please notify theCompany.Term and TerminationThis
            Agreement shall commence on today’s date and shall remain ineffect
            until the end of after the harvested produce have been sold.The
            Company reserves the right to terminate this Agreement if
            CompleteFarmer suspects, that you have violated any of Complete
            Farmer's policiesset out in this Agreement, the Terms & Conditions,
            the Privacy Policy, orany other policy documents or community
            guidelines, or if You haveengaged in an improper or fraudulent
            activity in connection with CompleteFarmer. Electronic
            SignaturesEach party agrees that the electronic signatures, whether
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
            electronic signature.General TermsThe terms of this Agreement are
            Confidential and will survive thetermination of this Agreement.A.No
            term of this Agreement shall be enforceable by a third party whois
            not a party to this Agreement and has no rights under theContracts
            (Rights of Third Parties) Act to enforce or enjoy thebenefits of
            this Agreement. B.If any provision of this Agreement or the
            application thereof is heldinvalid or unenforceable, the invalidity
            or unenforceability thereofshall not affect any other provisions or
            applications of this Agreement that can be given effect without the
            invalid orunenforceable provision or application. To that end, the
            provisionsof this Agreement are to be severable.C.The Parties shall
            use their best endeavors to reach an amicablesettlement of any
            dispute by mutual discussion between thedesignated representatives
            of the Parties.D.This Agreement shall be governed in accordance with
            the laws ofthe Republic of Ghana. E.Each Party warrants to the other
            Party that it has the right, powerand authority to enter into this
            Agreement and carry out itsobligations under this Agreement.By
            clicking the "Accept" button, downloading or using the Application,
            youare agreeing to be bound by the terms and conditions of this
            Agreement.If you do not agree to the terms of this Agreement, do not
            click on the"Accept" button and do not download or use the
            Application.
          </Text>

          <Box mt={10}>
            <FormRadio
              state={contract}
              onChange={setContract}
              options={options}
              width={24}
            />
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Contract;
