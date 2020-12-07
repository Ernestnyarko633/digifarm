import { InfoIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Icon, Stack } from '@chakra-ui/react';

const FormRadio = ({ state, onChange, icon, title, options, width }) => {
  const updateStateChange = (item) => {
    onChange(item);
  };

  const Type = ({ children, ...rest }) => (
    <Button
      colorScheme={state.includes(children) ? 'cfButton' : 'gray'}
      width={width || 16}
      rounded='md'
      onClick={() => updateStateChange(children)}
      {...rest}
    >
      {children}
    </Button>
  );

  return (
    <Box>
      {icon && (
        <Heading as='h6' size='sm' mb={2}>
          {title} <Icon as={InfoIcon} color='cf.400' />
        </Heading>
      )}
      <Stack isInline>
        {options.map((item, index) => (
          <Type key={index}>{item}</Type>
        ))}
      </Stack>
    </Box>
  );
};

export default FormRadio;
