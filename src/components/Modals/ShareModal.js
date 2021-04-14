import React from 'react'
import useComponent from 'context/component'
import { Flex, Button, Icon } from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import {
  //FacebookShareButton,
  TwitterShareButton,
  //LinkedinShareButton,
  //FacebookIcon,
  TwitterIcon
  // LinkedinIcon
} from 'react-share'

const ShareModal = () => {
  const { isOpen, onClose, data } = useComponent()

  return (
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='xl'>
      <Flex w='100%' align='center' justify='center'>
        <Flex w='100%' direction='row' justify='center' align='center'>
          {/* <Button
            as={FacebookShareButton}
            title={data?.title}
            url={data?.url}
            quote={data?.quote}
          >
            <Icon boxSize={10} as={FacebookIcon} />
          </Button> */}
          <Button
            as={TwitterShareButton}
            title={'This is a feed from complete farmer' || data?.title}
            url={data?.url}
            via={`completefarmer ${data?.quote}`}
            related={['completefarmer']}
          >
            <Icon boxSize={10} as={TwitterIcon} />
          </Button>
          {/* <Button
            as={LinkedinShareButton}
            title={data?.actionTitle}
            source={data?.url}
            url={data?.url}
            summary={data?.quote}
          >
            <Icon boxSize={10} as={LinkedinIcon} />
          </Button> */}
        </Flex>
      </Flex>
    </ModalWrapper>
  )
}

export default ShareModal
