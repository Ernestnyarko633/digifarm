/* eslint-disable */
import React from "react";
import useComponent from "context/component";
import { Flex, Button, Icon } from "@chakra-ui/react";
import ModalWrapper from "./ModalWrapper";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const ShareModal = () => {
  const { isOpen, onClose, data } = useComponent();

  const { quote, title, url } = data;

  return (
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose}>
      <Flex w="100%" align="center" justify="center">
        <Flex w="100%" direction="row" justify="center" align="center">
          <Button
            mx={{ base: 4 }}
            as={FacebookShareButton}
            title={data?.title}
            url={"https://digitalfarmer.completefarmer.com" || data?.url}
            quote={data?.quote}
          >
            <Icon boxSize={10} as={FacebookIcon} />
          </Button>
          <Button
            mx={{ base: 4 }}
            as={TwitterShareButton}
            title={title || "This is a feed from complete farmer"}
            url={url}
            via={`completefarmer ${quote}`}
            related={["@completefarmer"]}
          >
            <Icon boxSize={10} as={TwitterIcon} />
          </Button>
          <Button
            mx={{ base: 4 }}
            as={LinkedinShareButton}
            title={data?.title}
            source={data?.url}
            url={data?.url}
            summary={data?.quote}
          >
            <Icon boxSize={10} as={LinkedinIcon} />
          </Button>
        </Flex>
      </Flex>
    </ModalWrapper>
  );
};

export default ShareModal;
