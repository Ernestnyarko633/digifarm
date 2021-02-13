/* eslint-disable*/
import React from 'react'
import { Cloud } from 'theme/Icons'
import { Box, Grid, Heading, Icon, Text } from '@chakra-ui/react'
import useEosApi from 'context/eosApi'

export default function WeatherCard() {

  const [loading, setLoading] = React.useState('fetching')
  const [error, setError] = React.useState(null)
  const [weather, setWeather] = React.useState('')
  const { getEOSWeatherForeCast } = useEosApi()

  React.useEffect(() => {
    let _payload = {
      geometry:{
         type:"Polygon",
         coordinates: [
           [
               [-1.531048,5.578849],
               [-1.530683,5.575411],
               [-1.521606,5.576286],
               [-1.522036,5.579767],
               [-1.531048,5.578849]
           ]
       ]
                   
      }
   }

    const fetchData = async payload => {
      try {
        setLoading('fetching')
        const res = await getEOSViewID(payload)
        console.log(res, 'myresults')
        setWeather(res)
        setLoading('done')
      } catch (error) {
        setError(error)
        setLoading('done')
      }
    }
    fetchData(_payload)
  }, [])
  return (
    <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={8} my={{ md: 8 }}>
      <Box
        w='100%'
        rounded='lg'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        p={6}
        bg='white'
      >
        <Text textAlign='center' fontWeight={300}>
          Plant population
        </Text>
      </Box>
      <Box
        w='100%'
        rounded='lg'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        p={6}
        bg='white'
      >
        <Text fontWeight={300}>Weather today</Text>
        <Box mt={2}>
          <Icon as={Cloud} boxSize={10} />
          <Heading fontSize={{ md: '6xl' }} fontWeight={900} mt={1}>
            11C
          </Heading>
        </Box>
      </Box>
    </Grid>
  )
}
