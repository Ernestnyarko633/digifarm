import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import Button from 'components/Button';
import React from 'react';
import AboutFarmManager from './AboutFarmManager';
import ChooseAcreage from './ChooseAcreage';
import Contract from './Contract';
import PaymentOption from './PaymentOption';

const OtherSteps = ({ handlePrev }) => {
  const [step, setStep] = React.useState(0);

  function handleNext() {
    setStep((prevActiveStep) => prevActiveStep + 1);
  }

  function handleBack() {
    setStep((prevActiveStep) => prevActiveStep - 1);
  }

  const getSteps = (value) => {
    switch (value) {
      case 0:
        return <AboutFarmManager />;
      case 1:
        return <ChooseAcreage />;
      case 2:
        return <Contract />;
      case 3:
        return <PaymentOption />;
      default:
        return null;
    }
  };
  return (
    <Box>
      <Flex
        align='center'
        justify='center'
        bg='gray.100'
        w='100%'
        h={20}
        mt={20}
      >
        <Heading as='h5' size='md' mr={{ md: 20 }}>
          Roots / Tubers
        </Heading>

        <Flex align='center' justify='space-between'>
          <Text px={6}>Ginger</Text>
          <Text px={6}>Chilli pepper</Text>
          <Text px={6}>Tiger nut</Text>
          <Text px={6}>Sweet potato</Text>
          <Text px={6}>Sorghum</Text>
        </Flex>
      </Flex>

      <Flex
        mt={{ md: 12 }}
        w={{ md: 143 }}
        h={{ md: 120 }}
        mx='auto'
        borderWidth={1}
        borderColor='gray.400'
        rounded='md'
        overflow='hidden'
      >
        {getSteps(step)}
        {/* <Grid templateColumns={{ md: 'repeat(2, 1fr)' }}>
          <GridItem p={{ md: 10 }}>Left</GridItem>
          <GridItem
            borderLeftWidth={1}
            borderLeftColor='gray.300'
            overflowY='scroll'
            p={{ md: 10 }}
            css={{
              direction: 'rtl',
              scrollbarColor: 'rebeccapurple',
              scrollBehavior: 'smooth',
            }}
          >
            <Box css={{ direction: 'ltr' }}>Right</Box>
          </GridItem>
        </Grid> */}
      </Flex>

      <Flex align='center' justify='center' mt={6}>
        <Button
          btntitle='Prev'
          colorScheme='white'
          color='gray.700'
          width={56}
          fontSize='md'
          h={12}
          onClick={step <= 0 ? handlePrev : handleBack}
        />
        <Button
          btntitle='Next'
          ml={6}
          width={56}
          fontSize='lg'
          md
          h={12}
          onClick={handleNext}
        />
      </Flex>
    </Box>
  );
};

export default OtherSteps;
