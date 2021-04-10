import React from 'react'
import useComponent from 'context/component'
import { Flex, Button, Icon } from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share'

const ShareModal = () => {
  const { isOpen, onClose, data } = useComponent()

  return (
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='3xl'>
      <Flex w='100%' align='center' justify='center'>
        <Flex w='30%' direction='row' justify='space-between' align='center'>
          <Button
            as={FacebookShareButton}
            title={data?.actionTitle}
            url={window.location.href}
            quote={data?.doc.data.headline[0].text}
          >
            <Icon boxSize={10} as={FacebookIcon} />
          </Button>
          <Button
            as={TwitterShareButton}
            title={data?.actionTitle}
            url={window.location.href}
            via={data?.doc.data.headline[0].text}
          >
            <Icon boxSize={10} as={TwitterIcon} />
          </Button>
          <Button
            as={LinkedinShareButton}
            title={data?.actionTitle}
            source={window.location.href}
            url={window.location.href}
            summary={data?.doc.data.headline[0].text}
          >
            <Icon boxSize={10} as={LinkedinIcon} />
          </Button>
        </Flex>
      </Flex>
    </ModalWrapper>
  )
}

export default ShareModal
