import React from "react";
import { Box, Flex, Avatar, Image , Heading, Text} from "@chakra-ui/core";

const AnnouncementCard = ({
  bg,
  rounded,
  boxShadow,
  w,
  h,
  mr,
  ml,
  p,
  image,
  avatarSize,
  avatarBgSize,
  ...rest
}) => {
  return (
    <Box>
      <Flex justify="center">
        <Box
          {...rest}
          boxShadow={boxShadow || "0px 0px 15px 5px #ccc"}
          rounded={rounded || 15}
          bg={bg || "white"}
          w={w || "100%"}
          h={h || "100%"}
          mr={mr}
          ml={ml}
          p={8}
        >
          <Box>
            <Flex mb={4} direction="row" align="center">
              <Box>
                <Avatar bgSize={avatarBgSize} size={avatarSize} bg="gray.100" mr={5}>
                  <Image src={image} />
                </Avatar>
              </Box>
              <Box>
              <Heading as="h6" fontSize={'sm'}>
                {"Soya Bean Farm"}
              </Heading>
              <Text mb={1} fontSize="xs" color="#9b9b9b" mt={{ md: -2 }}>
                {"Agyata, Eastern Region"}
              </Text>
              <Text fontSize="xs" color="cf.400" mt={{ md: -2 }}>
                {"Coming Soon"}
              </Text>
            </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AnnouncementCard;
