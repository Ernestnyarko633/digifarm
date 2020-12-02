import { Box, Flex, Image } from '@chakra-ui/core';
import CropSelection from 'components/StartFarmProcess/CropSelection';
import OtherSteps from 'components/StartFarmProcess/OtherSteps';
import React from 'react';

const Details = () => {
  const [step, setStep] = React.useState(0);

  function handleNext() {
    setStep((prevActiveStep) => prevActiveStep + 1);
  }

  function handleBack() {
    setStep((prevActiveStep) => prevActiveStep - 1);
  }

  const getContent = (value) => {
    switch (value) {
      case 0:
        return <CropSelection handleNext={handleNext} />;
      case 1:
        return <OtherSteps handlePrev={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Flex
        align='center'
        w='100vw'
        h={{ md: 20 }}
        pos='fixed'
        top={0}
        bg='white'
        shadow='md'
        px={{ md: 20 }}
      >
        <Box h={{ md: 12 }}>
          <Image
            h='100%'
            src={require('../../assets/images/logo.png').default}
          />
        </Box>
      </Flex>

      {getContent(step)}
    </Box>
  );
};

export default Details;
