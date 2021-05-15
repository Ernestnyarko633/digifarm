/* eslint-disable */
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";
import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/layout";
import moment from "moment";
import { Link as ReachRouter } from "react-router-dom";
import { Button } from "../index";

const EventModal = ({ isOpen, onClose, selectedData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl">
      <ModalOverlay />
      <ModalContent rounded="lg">
        <ModalCloseButton color="cf.400" />
        <ModalBody p={{ md: 6 }}>
          <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={6}>
            <Box>
              <Image
                rounded="lg"
                src={selectedData?.data?.body[0]?.primary?.media?.url}
              />
            </Box>
            <Box px={{ md: 10 }}>
              <Heading as="h3" fontSize={{ md: "3xl" }}>
                {selectedData?.data?.title[0]?.text}
              </Heading>
              <Box
                mt={2}
                borderBottomWidth={1}
                borderBottomColor="gray.200"
                pb={4}
              >
                <Text fontSize={{ md: "lg" }}>
                  {selectedData?.data?.summary[0]?.text}
                </Text>
              </Box>
              <Box borderBottomWidth={1} borderBottomColor="gray.200" py={4}>
                <Flex align="center" justify="space-between">
                  <Text color="gray.500">
                    Date:{" "}
                    <Text as="span" color="black" fontWeight={700} ml={2}>
                      {moment(selectedData?.data?.publishing_date).format("LL")}
                    </Text>
                  </Text>

                  <Text color="gray.500">
                    Time:{" "}
                    <Text as="span" color="black" fontWeight={700} ml={2}>
                      {moment(selectedData?.data?.publishing_date).format(
                        "HH:mm"
                      )}{" "}
                      GMT
                    </Text>
                  </Text>
                </Flex>
              </Box>

              {selectedData?.data?.venue && (
                <Box borderBottomWidth={1} borderBottomColor="gray.200" py={4}>
                  <Text color="gray.500">
                    Venue:{" "}
                    <Text as="span" color="black" fontWeight={700} ml={2}>
                      Zoom
                    </Text>
                  </Text>
                </Box>
              )}

              {selectedData?.data?.href && (
                <Box my={4}>
                  <Link as={ReachRouter} to="#">
                    <Button
                      btntitle="Visit link"
                      width={{ md: 48 }}
                      fontSize={{ md: "md" }}
                      height={{ md: 12 }}
                    />
                  </Link>
                </Box>
              )}
            </Box>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
