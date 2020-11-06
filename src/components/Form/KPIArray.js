import React from 'react';
import { FieldArray } from 'formik';
import { Box, Grid } from '@chakra-ui/core';
import PropTypes from 'prop-types';

import ThirdPartyInput from './ThirdPartyInput';
import { Add, Trash } from 'theme/CustomIcons';
import FormButton from 'components/Button';

const KPIArray = ({
  fieldName,
  fieldObj,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  label,
  title,
}) => {
  return (
    <FieldArray name={fieldName}>
      {({ push, remove }) => (
        <>
          <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={4}>
            {values?.map((value, i) => (
              <ThirdPartyInput
                key={i}
                name={`${fieldName}.${i}.`}
                reference={value}
                label={label}
                handleChange={handleChange}
                handleBlur={handleBlur}
                title={title}
                errors={
                  errors && errors.thirdPartyRef && errors.thirdPartyRef[i]
                }
                touched={
                  touched && touched.thirdPartyRef && touched.thirdPartyRef[i]
                }
              />
            ))}
          </Grid>
          <Box float='right' mt={6}>
            {values.length > 1 && (
              <FormButton
                startEnhancer={() => <Trash size={24} />}
                onClick={() => remove(values.length - 1)}
                label={`Remove ${label}`}
                bgColor='#E53E3E'
                type='button'
              />
            )}

            <FormButton
              startEnhancer={() => <Add size={24} />}
              onClick={() => push(fieldObj)}
              disabled={values.length === 6}
              label={`Add another ${label}`}
              marginLeft='10px'
              type='button'
            />
          </Box>
        </>
      )}
    </FieldArray>
  );
};

KPIArray.propTypes = {
  values: PropTypes.array.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldObj: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default KPIArray;
