import React from 'react';
import { Button } from 'baseui/button';

const IconButton = ({
  width,
  bgColor,
  color,
  marginLeft,
  children,
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
            height: '48px',
            color: color || '#fff',
            marginLeft: marginLeft,
            ':hover': {
              disabled: {
                backgroundColor: bgColor || '#cccccc',
                color: color || '#393939',
              },
              backgroundColor: bgColor || '#3c9130',
              color: color || '#fff',
            },
            ':active': {
              disabled: {
                backgroundColor: bgColor || '#cccccc',
                color: color || '#393939',
              },
              backgroundColor: bgColor || '#3c9130',
              color: color || '#fff',
            },
            disabled: {
              backgroundColor: bgColor || '#cccccc',
              color: color || '#393939',
            },
          },
        },
      }}
    >
      {children}
    </Button>
  );
};

export default IconButton;
