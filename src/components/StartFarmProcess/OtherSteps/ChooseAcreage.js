import React, { useState, useEffect} from 'react'
import { Box, Grid, Stack, Heading, Divider, Select, Button, Text, Radio, Input, HStack} from '@chakra-ui/core';

// google-maps configuration
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const handleApiLoaded = (map, maps) => {
    // use map and maps objects
};
import ReactMapGL from 'react-map-gl';
import data from '../OtherSteps/data.geojson';
const ChooseAcreage = () => {

    const [viewport, setViewport] = useState({
        latitude: 9.7267833,
        longitude: -122.41669,
        width: "36vw",
        height: "70vh",
        zoom: 10
      });


    return (
            <Grid templateColumns="repeat(2, 1fr)" gap={6} padding={10}>
                <Box>
                    <ReactMapGL
                        {...viewport}
                        latitude={9.7267833} 
                        longitude={-0.49975} 
                        zoom={10}
                        mapboxApiAccessToken='pk.eyJ1Ijoia25pZ2h0c2hlbGwzMDEiLCJhIjoiY2l6dmVtbWMyMDAwZTJxcGZ5ajBseTE1OSJ9.C099DGKt-Xv90HMAuOGQaw'
                        onViewportChange={viewport => {
                            setViewport(viewport);
                          }}
                        >
                    </ReactMapGL>

            
                    <Box textAlign="center" paddingTop="20px">
                        <Heading as="h6" size="xs">
                            <Text>What is included in this farm</Text>
                        </Heading>
                        <HStack spacing="24px">
                            <Box>
                                Icon 
                                <Text>Farm Updates</Text>
                            </Box>
                            <Box>
                                Icon
                                <Text>Support</Text>
                            </Box>
                            <Box>
                                Icon
                                <Text>Schduled farm visits</Text>
                            </Box>
                        </HStack>

                    </Box>
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
                            <Text marginLeft="10">
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
