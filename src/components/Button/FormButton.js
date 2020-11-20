import { Button } from 'baseui/button';
import React from 'react';
import PropTypes from 'prop-types';

const FormButton = ({
  label,
  width,
  height,
  bgColor,
  color,
  marginLeft,
  disabledBgColor,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      overrides={{
        BaseButton: {
          style: {
            backgroundColor: bgColor || '#3c9130',
            width: width,
            height: height,
            color: color || '#fff',
            marginLeft: marginLeft,
            ':hover': {
              backgroundColor: bgColor || '#3c9130',
              color: color || '#fff',
            },
            ':active': {
              backgroundColor: bgColor || '#3c9130',
              color: color || '#fff',
            },
            disabled: {
              backgroundColor: disabledBgColor || '#cccccc',
              color: color || '#393939',
              ':hover': {
                backgroundColor: disabledBgColor || '#cccccc',
                color: color || '#393939',
              },
              ':active': {
                backgroundColor: disabledBgColor || '#cccccc',
                color: color || '#393939',
              },
            },
          },
        },
      }}
    >
      {label}
    </Button>
  );
};

FormButton.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  bgColor: PropTypes.string,
  disabledBgColor: PropTypes.string,
  color: PropTypes.string,
  marginLeft: PropTypes.string,
  rest: PropTypes.string,
};

export default FormButton;
