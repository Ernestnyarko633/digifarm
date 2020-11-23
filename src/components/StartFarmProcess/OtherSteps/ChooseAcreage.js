import React from 'react'
import { Box, Grid, Stack, Heading, Divider, Select, Button, Text, Radio, Input} from '@chakra-ui/core';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const handleApiLoaded = (map, maps) => {
    // use map and maps objects
};
const ChooseAcreage = () => {
    
    return (
       
            <Grid templateColumns="repeat(2, 1fr)" gap={6} padding={10}>
                <Box>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
                    defaultZoom={8}
                    defaultCenter={{ lat: -34.397, lng: 150.644 }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                    </GoogleMapReact>
                </Box>
                <Box>
                    <Heading as="h6" size="xs" paddingBottom="4">
                        About Location
                    </Heading>
                    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" padding="5">
                        <Box paddingBottom="5">
                            <Heading as="h6" size="xs">Ecological zone</Heading>
                            <Heading as="h6" size="xs">Northern savanna</Heading>
                        </Box>
                        <Divider orientation="horizontal" />
                        <Heading as="h6" size="xs">Weather</Heading>
                        <Text>
                            Weather Sandy loam soil is one of the most preferable types of soil for many types of plants. 
                            Planting in loam soil with a high percentage of sand is the same as planting in normal loam soil, but extra amendments may be made to compensate for slightly lower water
                        </Text>
                    </Box>
                    <Box marginTop="10">
                        <Heading as="h5" size="sm">Choose number of acres to farm</Heading>
                        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                            <Select>
                                <option value="option1">Option 1</option>
                                <option value="option1">Option 1</option>
                                <option value="option1">Option 1</option>
                                <option value="option1">Option 1</option>
                            </Select>
                            <Text>
                                $ 750.000
                            </Text>
                        </Grid>
                    </Box>
                    <Box marginTop="10">
                        <Heading as="h5" size="sm">Do you want allow cycle for this farm?</Heading>
                        <Stack direction="row">
                            <Radio value="1">No</Radio>
                            <Radio value="2">Yes</Radio>
                        </Stack>
                    </Box>
                    <Box marginTop="10"> 
                        <Heading as="h5" size="sm">Choose number of acres to farm</Heading>
                        <Select placeholder="Select option">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                    </Box>
                    <Grid templateColumns="repeat(2, 1fr)" gap={2} paddingTop={5}>
                        <Box>
                            <Input placeholder="Choose number of cycle" />
                        </Box>
                        <Box>
                            <Button colorScheme="teal" size="lg">Continue</Button>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
    )
}

export default ChooseAcreage
