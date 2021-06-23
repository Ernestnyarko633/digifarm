// import React from 'react'
// import {
//   Box,
//   Flex,
//   Avatar,
//   Heading,
//   Text,
//   Icon,
//   Image,
//   Tag,
//   Collapse
// } from '@chakra-ui/react'
// import PropTypes from 'prop-types'
// import useComponent from 'context/component'
// import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
// // import { RichText } from 'prismic-reactjs'

// //import { BsHeart } from 'react-icons/bs'
// import { RiShareForwardLine } from 'react-icons/ri'
// import Button from 'components/Button'
// import useAuth from 'context/auth'

// const FarmBoardCard = ({
//   status,
//   avatar,
//   firstName,
//   location,
//   level,
//   timestamp,
//   actionTitle,
//   actionTag,
//   actionText,
//   actionBtnTitle,
//   activeFarm,
//   content,
//   farms,
//   doc
// }) => {
//   const { isAuthenticated } = useAuth()
//   const { user } = isAuthenticated()
//   const [show, setShow] = React.useState(false)
//   const handleToggle = () => setShow(!show)
//   const { handleModalClick } = useComponent()

//   const [selectedImage, setSelectedImage] = React.useState({})
//   const [selectedVideo, setSelectedVideo] = React.useState({})

//   const [activeIndex, setActiveIndex] = React.useState(0)
//   const [activeVideoIndex, setVideoActiveIndex] = React.useState(0)

//   const [images, setImages] = React.useState([])
//   const [videos, setVideos] = React.useState([])

//   const mapKey = i => i
//   const _handleClick = value => {
//     const comparant =
//       activeVideoIndex + value === 0 ||
//       activeVideoIndex + value > videos.length - 1 ||
//       activeVideoIndex + value < 0
//         ? 0
//         : activeVideoIndex + value

//     setVideoActiveIndex(comparant)
//     setSelectedVideo(videos[comparant])
//   }

//   const handleClick = value => {
//     const comparant =
//       activeIndex + value === 0 ||
//       activeIndex + value > images.length - 1 ||
//       activeIndex + value < 0
//         ? 0
//         : activeIndex + value

//     setActiveIndex(comparant)
//     setSelectedImage(images[comparant])
//   }
//   //const mapKey = i => i
//   React.useEffect(() => {
//     let array = []
//     let _array = []
//     const _feeds = feed => {
//       return feed?.media?.forEach(_media => {
//         if (_media?.type === 'image') array.push(_media)
//         if (_media?.type === 'video') _array.push(_media)
//       })
//     }
//     const feeds = () =>
//       content?.data?.map(feed => {
//         return _feeds(feed?.feed)
//       })

//     if (status !== 'news' && status !== 'weekly_videos') {
//       feeds()
//     }
//     if (_array.length) {
//       setVideos(_array)

//       setSelectedVideo(_array[0])
//     }
//     if (array.length) {
//       setImages(array)
//       setSelectedImage(array[0])
//     }
//   }, [content, status])

//   const Detail = () => {
//     return (
//       <Flex
//         align='center'
//         borderBottomWidth={1}
//         justify='space-between'
//         borderBottomColor='gray.200'
//         px={{ base: 4, md: 0 }}
//         py={{ base: 4, md: 0 }}
//         pb={5}
//       >
//         <Flex align='center'>
//           <Avatar
//             size='md'
//             src={activeFarm?.order?.product?.cropVariety?.imageUrl}
//           />
//           <Box ml={{ base: 2, md: 4 }}>
//             <Heading
//               as='h4'
//               fontSize={{ base: 'lg', md: 'xl' }}
//               fontWeight={700}
//             >
//               {user?.firstName}’s Farm
//             </Heading>
//             <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>
//               {`${activeFarm?.order?.product?.location?.name}, ${activeFarm?.order?.product?.location?.state}`}
//             </Text>
//           </Box>
//           {/* {status !== 'news' && (
//             // <Box ml={{ base: 5, md: 12 }} d={{ base: 'none', md: 'block' }}>
//             //   <Tag
//             //     bg='cf.200'
//             //     color='cf.green'
//             //     rounded='xl'
//             //     px={{ base: 4, md: 6 }}
//             //     fontWeight='bold'
//             //     fontSize={{ base: 'sm', md: 'md' }}
//             //   >
//             //     {level}
//             //   </Tag>
//             // </Box>
//           )} */}
//         </Flex>

//         <Box>
//           <Text fontSize={{ base: 'sm', md: 'md' }} color='gray.500'>
//             {timestamp}
//           </Text>
//         </Box>
//       </Flex>
//     )
//   }

//   const FarmContent = () => {
//     if (images?.length) {
//       return (
//         <>
//           <Box py={{ base: 4, md: 10 }} px={{ base: 4, md: 16 }}>
//             <Detail />
//           </Box>
//           <Box pos='relative'>
//             <Image
//               rounded='lg'
//               h={{ md: 85 }}
//               w='100%'
//               objectFit='cover'
//               src={selectedImage?.url}
//             />
//             <Flex
//               align='center'
//               justify='center'
//               pos='absolute'
//               bottom={6}
//               left='45%'
//             >
//               <Flex
//                 as='button'
//                 role='button'
//                 aria-label='prev button'
//                 align='center'
//                 justify='center'
//                 w={10}
//                 h={10}
//                 rounded='100%'
//                 borderWidth={1}
//                 borderColor='white'
//                 color='white'
//                 mr={2}
//                 onClick={() => handleClick(-1)}
//               >
//                 <Icon as={BsChevronLeft} />
//               </Flex>
//               <Flex
//                 as='button'
//                 role='button'
//                 aria-label='next button'
//                 align='center'
//                 justify='center'
//                 w={10}
//                 h={10}
//                 rounded='100%'
//                 borderWidth={1}
//                 borderColor='white'
//                 color='cf.green'
//                 bg='white'
//                 ml={2}
//                 onClick={() => handleClick(+1)}
//               >
//                 <Icon as={BsChevronRight} />
//               </Flex>
//             </Flex>
//           </Box>
//           <Box px={{ base: 4, md: 16 }}>
//             <Box mt={6}>
//               {/* <Text textTransform='uppercase' fontWeight='bold'>
//                 <Icon as={Flower} /> {actionTitle}
//               </Text> */}
//               <Text color='gray.500' mt={3} fontSize={{ base: 'sm', md: 'md' }}>
//                 {content?.data[0]?.feed?.summary?.replace(/<[^>]*>/g, '')}
//               </Text>
//             </Box>
//           </Box>
//         </>
//       )
//     }

//     if (videos?.length) {
//       return (
//         <>
//           <Box py={{ base: 4, md: 10 }} px={{ base: 4, md: 16 }}>
//             <Detail />
//           </Box>
//           <Box pos='relative' as='video' autoPlay loop>
//             <Box
//               as='source'
//               rounded='lg'
//               h={{ md: 85 }}
//               w='100%'
//               objectFit='cover'
//               src={selectedVideo?.url}
//             />
//             <Flex
//               align='center'
//               justify='center'
//               pos='absolute'
//               bottom={6}
//               left='45%'
//             >
//               <Flex
//                 as='button'
//                 role='button'
//                 aria-label='prev button'
//                 align='center'
//                 justify='center'
//                 w={10}
//                 h={10}
//                 rounded='100%'
//                 borderWidth={1}
//                 borderColor='white'
//                 color='white'
//                 mr={2}
//                 onClick={() => _handleClick(-1)}
//               >
//                 <Icon as={BsChevronLeft} />
//               </Flex>
//               <Flex
//                 as='button'
//                 role='button'
//                 aria-label='next button'
//                 align='center'
//                 justify='center'
//                 w={10}
//                 h={10}
//                 rounded='100%'
//                 borderWidth={1}
//                 borderColor='white'
//                 color='cf.green'
//                 bg='white'
//                 ml={2}
//                 onClick={() => _handleClick(+1)}
//               >
//                 <Icon as={BsChevronRight} />
//               </Flex>
//             </Flex>
//           </Box>
//           <Box px={{ base: 4, md: 16 }}>
//             <Box mt={6}>
//               {/* <Text textTransform='uppercase' fontWeight='bold'>
//                 <Icon as={Flower} /> {actionTitle}
//               </Text> */}
//               <Text color='gray.500' mt={3} fontSize={{ base: 'sm', md: 'md' }}>
//                 {content?.data[0]?.feed?.summary?.replace(/<[^>]*>/g, '')}
//               </Text>
//             </Box>
//           </Box>
//         </>
//       )
//     }

//     return null
//   }

//   const NewHead = () => (
//     <Flex align='center' justify='space-between'>
//       <Flex align='center'>
//         <Avatar
//           size='md'
//           src={activeFarm?.order?.product?.cropVariety?.imageUrl}
//         />
//         <Box ml={4}>
//           <Heading as='h4' fontSize={{ md: 'xl' }} fontWeight={700}>
//             {`${user?.firstName}'s farm`}
//           </Heading>
//           <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>
//             {`${activeFarm?.order?.product?.location?.name}, ${activeFarm?.order?.product?.location?.state}`}
//           </Text>
//         </Box>
//       </Flex>

//       <Box>
//         <Text color='gray.500'>{timestamp}</Text>
//       </Box>
//     </Flex>
//   )

//   return (
//     <>
//       {status !== 'weekly_videosx' ? (
//         <Box
//           rounded='xl'
//           w={{ base: 82, md: '80%' }}
//           mx='auto'
//           bg='white'
//           mb={10}
//           filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
//         >
//           {status !== 'news' && status !== 'weekly_videos' && (
//             <FarmContent content={content} />
//           )}

//           <Flex
//             align='center'
//             py={{ base: 4, md: status === 'farm' && 6 }}
//             pb={{
//               base: 4,
//               md: status === 'news' || status === 'action' ? 6 : 8
//             }}
//             px={{ base: 4, md: 16 }}
//           >
//             {/* <Flex>
//           <Box>
//             <Icon as={BsHeart} mr={2} boxSize={5} />
//           </Box>
//           <Text>123</Text>
//         </Flex> */}

//             <Box textAlign='right' w='100%' ml={{ md: 6 }}>
//               <Icon
//                 boxSize={6}
//                 as={RiShareForwardLine}
//                 onClick={
//                   () =>
//                     handleModalClick('share', {
//                       status,
//                       avatar,
//                       firstName,
//                       location,
//                       level,
//                       timestamp,
//                       actionTitle,
//                       actionTag,
//                       actionText,
//                       actionBtnTitle,
//                       doc
//                     })
//                   // eslint-disable-next-line react/jsx-curly-newline
//                 }
//               />
//             </Box>
//           </Flex>
//         </Box>
//       ) : (
//         <>
//           {doc?.data?.body[0].items.map((video, i) => (
//             <Box
//               key={mapKey(i)}
//               rounded='xl'
//               w={{ base: 82, md: '80%' }}
//               mx='auto'
//               bg='white'
//               mb={10}
//               filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
//             >
//               {status === 'weekly_videosx' && false && (
//                 <Box key={mapKey(i)}>
//                   <Box pt={{ base: 4, md: 8 }} pb={2} px={{ base: 4, md: 16 }}>
//                     <NewHead />
//                   </Box>
//                   <Box
//                     as='video'
//                     w='100%'
//                     h={{ md: 90 }}
//                     autoPlay
//                     loop
//                     controls
//                   >
//                     <Box
//                       as='source'
//                       w='100%'
//                       h={{ md: 90 }}
//                       objectFit='cover'
//                       src={video?.weekly_video?.embed_url}
//                     />
//                   </Box>
//                   <Box py={4} px={{ base: 4, md: 10 }}>
//                     <Box mt={6}>
//                       <Heading as='h5' fontSize={{ md: 'lg' }}>
//                         {video?.weekly_video?.author_name}
//                       </Heading>
//                       <Collapse
//                         startingHeight={85}
//                         in={show}
//                         onClick={handleToggle}
//                         cursor='pointer'
//                       >
//                         <Text
//                           color='gray.500'
//                           mt={3}
//                           //key={item.text}
//                           fontSize={{ base: 'sm', md: 'md' }}
//                         >
//                           {video?.weekly_video?.title}
//                         </Text>
//                       </Collapse>
//                     </Box>
//                   </Box>
//                 </Box>
//               )}

//               <Flex
//                 align='center'
//                 py={{ base: 4, md: status === 'farm' && 6 }}
//                 pb={{
//                   base: 4,
//                   md: status === 'news' || status === 'action' ? 6 : 8
//                 }}
//                 px={{ base: 4, md: 16 }}
//               >
//                 {/* <Flex>
//           <Box>
//             <Icon as={BsHeart} mr={2} boxSize={5} />
//           </Box>
//           <Text>123</Text>
//         </Flex> */}

//                 <Box textAlign='right' w='100%' ml={{ md: 6 }}>
//                   <Icon
//                     boxSize={6}
//                     as={RiShareForwardLine}
//                     onClick={
//                       () =>
//                         handleModalClick('share', {
//                           status,
//                           avatar,
//                           firstName,
//                           location,
//                           level,
//                           timestamp,
//                           actionTitle,
//                           actionTag,
//                           actionText,
//                           actionBtnTitle,
//                           doc
//                         })
//                       // eslint-disable-next-line react/jsx-curly-newline
//                     }
//                   />
//                 </Box>
//               </Flex>
//             </Box>
//           ))}
//         </>
//       )}
//     </>
//   )
// }

// FarmBoardCard.propTypes = {
//   status: PropTypes.string,
//   avatar: PropTypes.string,
//   firstName: PropTypes.string,
//   location: PropTypes.string,
//   level: PropTypes.string,
//   timestamp: PropTypes.string,
//   actionTitle: PropTypes.string,
//   actionTag: PropTypes.string,
//   actionText: PropTypes.string,
//   actionBtnTitle: PropTypes.string,
//   doc: PropTypes.any,
//   activeFarm: PropTypes.any,
//   farms: PropTypes.any,
//   content: PropTypes.any
// }

// export default FarmBoardCard
