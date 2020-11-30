import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl, FormLabel } from '@chakra-ui/core';
import { ComboBox } from 'carbon-components-react';

const FormDropdown = ({
        label,
        items,
        mappedItem,
        width,
        onChange,
        bg,
        marginTop,
        id,
        fontSize,
        placeholder,
        titleText,
        mt,
        ...props
}) => (
        <Box mt={mt}>
                <FormControl
                        isRequired
                        bg={bg || 'cf.300'}
                        w={width}
                        pos="relative"
                        pt={4}
                        borderBottomWidth={1}
                        borderBottomColor="cf.400"
                        mt={{ md: marginTop }}
                >
                        <FormLabel
                                fontSize={{ md: fontSize || 'sm' }}
                                pos="absolute"
                                px={{ md: 4 }}
                                top={-2}
                                color="gray.600"
                        >
                                {label}
                        </FormLabel>
                        <ComboBox
                                {...props}
                                id={id}
                                name={id}
                                items={items}
                                label={placeholder}
                                titleText={titleText}
                                itemToString={mappedItem}
                                onChange={onChange}
                                light
                        />
                </FormControl>
        </Box>
);

FormDropdown.propTypes = {
        titleText: PropTypes.any,
        label: PropTypes.any,
        items: PropTypes.any,
        mappedItem: PropTypes.any,
        placeholder: PropTypes.any,
        onChange: PropTypes.any,
        marginTop: PropTypes.any,
        bg: PropTypes.any,
        mt: PropTypes.any,
        fontSize: PropTypes.any,
        id: PropTypes.any,
};

export default FormDropdown;
