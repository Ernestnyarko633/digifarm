import React from "react";
import { Flex, Image, Box, Text, Heading, Link, Icon } from "@chakra-ui/core";
import Background from "assets/images/bgx2.png";
import Header from "container/Header";
import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";

const Banner = () => {
  document.title = "Complete Farmer Digital Farmer | Coming Soon";
  return (
    <Flex w="100vw" h="100vh">
      <Box>
        <Header />
      </Box>
      <Image w="100%" h="100%" fit="cover" src={Background} />
      <Box pos="absolute" top={100} w="100%" h="50%">
        <Flex w="100%" justify="center" align="center">
          <Flex
            direction="column"
            justify="center"
            w={{ md: "70%", xl: "50%" }}
            align="center"
            p={{ md: 5 }}
          >
            <Heading
              textAlign="center"
              as="h3"
              mt={{ md: 5 }}
              color="#022D2B"
              fontSize={{ base: "2xl", md: "3xl", xl: "6xl" }}
              dangerouslySetInnerHTML={{ __html: "Coming Soon" }}
            />

            <Text
              textAlign="center"
              my={{ md: 5 }}
              fontSize={{ base: "md", md: "lg", xl: "xl" }}
              dangerouslySetInnerHTML={{
                __html:
                  "Please wait patiently as we set up our farms to enable you farm the revolutionized way and make profit from the comfort of your home.",
              }}
            />
          </Flex>
        </Flex>
      </Box>

      <Box
        pos="absolute"
        w="100%"
        bottom={0}
        h={{ md: "100px", xl: "60px" }}
        justify="space-between"
        align="center"
      >
        <Flex
          w="100%"
          py={{ base: 5, md: 0 }}
          h="100%"
          direction={{ base: "column", xl: "row" }}
          justify="space-between"
          align="center"
        >
          <Flex
            w="80%"
            px={{ md: 20 }}
            h="100%"
            justify="flex-start"
            align="center"
            direction={{ base: "column", xl: "row" }}
            pt={{ md: 5, xl: 0 }}
     
          >
            <Box w="100%">
              <Text
                fontSize={{ base: "sm", md: "lg" }}
              >{`©2021 Completefarmer. All rights reserved`}</Text>
            </Box>
            <Flex
              w={{base: '50%', xl:"100%"}}
           
              justify={{ xl: "flex-end" }}
              align={{ xl: "center" }}
            >
              <Link
                m={{ xl: 10 }}
                href="https://www.completefarmer.com/terms-and-conditions"
              >
                <Flex>
                  <Text
                    fontSize={{ base: "sm", md: "lg" }}
                  >{`Terms & Conditions`}</Text>
                </Flex>
              </Link>

              <Link
                m={{ xl: 5 }}
                href="https://www.completefarmer.com/privacy-policy"
              >
                <Flex>
                  <Text
                    fontSize={{ base: "sm", md: "lg" }}
                  >{`Privacy Policy`}</Text>
                </Flex>
              </Link>
            </Flex>
          </Flex>
          <Flex
            w={{ base: "40%", md: "30%" }}
            px={{ md: 20 }}
            pt={{ base: 5, md: 0 }}
            h="100%"
            align="center"
            justify={{ base: "space-between", md: "flex-end" }}
            direction="row"
          >
            <Box
              m={{ md: 5 }}
              as={Link}
              href="https://www.instagram.com/completefarmer"
            >
              <Icon as={AiOutlineInstagram} boxSize={8} />
            </Box>
            <Box
              m={{ md: 5 }}
              as={Link}
              href="https://web.facebook.com/CompleteFarmer/"
            >
              <Icon as={AiFillFacebook} boxSize={8} />
            </Box>
            <Box
              m={{ md: 5 }}
              as={Link}
              href="https://www.linkedin.com/CompleteFarmer/"
            >
              <Icon as={AiFillLinkedin} boxSize={8} />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Banner;
