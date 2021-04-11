import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'

const GuideCard = () => {
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  const [doc, setDocData] = React.useState(null)

  React.useEffect(() => {
    let mounted = true
    if (mounted && !doc) {
      const fetchData = async () => {
        const response = await Client.query(
          Prismic.Predicates.at('document.type', 'guide-videos')
        )
        if (response) {
          setDocData(response.results)
        }
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, doc])

  return (
    <Box mt={{ md: 32 }} w={{ md: '800px' }} mx='auto'>
      {doc?.map(item => (
        <Box key={item?.uid} mb={{ md: 32 }}>
          <ReactPlayer
            url={item?.data?.video_url?.embed_url}
            width='800px'
            height='400px'
          />
          <Box mt={6} width='800px'>
            <Heading as='h4' fontSize='lg'>
              {item?.data?.video_title?.[0]?.text}
            </Heading>
            <Text mt={2}>{item?.data?.video_summary?.[0]?.text}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default GuideCard
