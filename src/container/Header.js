import React from "react";
import { Avatar, Box, Flex, Icon, Image, Link, Text } from "@chakra-ui/core";
import { motion } from "framer-motion";
import { Menu } from "@headlessui/react";
import { FiChevronDown, FiChevronUp, FiUser } from "react-icons/fi";
import { BiCog, BiSupport, BiHistory } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { BsBell, BsStar, BsPlus } from "react-icons/bs";

const menuLinks = [
  { name: "Profile", icon: FiUser, link: "/profile" },
  { name: "History", icon: BiHistory, link: "/history" },
  { name: "Settings", icon: BiCog, link: "/settings" },
  { name: "Help Center", icon: BiSupport, link: "/help" },
  { name: "Log out", icon: HiOutlineLogout },
];

import Logo from "../assets/images/logo.png";
import Notification from "components/Notifications";

const MotionBox = motion.custom(Box);

const Header = () => {
  return (
    // <Flex direction="column">
    <Flex
      as="header"
      gridArea="header"
      pos="fixed"
      w="100%"
      h={{ md: 20 }}
      bg="white"
      top={0}
      zIndex={50}
      borderBottomWidth={1}
      borderBottomColor="gray.300"
      px={{ md: 24 }}
      align="center"
      justify="space-between"
    >
      <Box>
        <Image src={Logo} w={{ md: 12 }} />
      </Box>

      <Flex align="center">
        <Flex align="center" mr={10}>
          <Box as="button" role="button" aria-label="Support">
            <Icon as={BsPlus} boxSize={6} />
          </Box>
          <Box as="button" role="button" aria-label="Support" ml={6}>
            <Icon as={BsStar} boxSize={5} />
          </Box>
          <Box as="button" role="button" aria-label="Notification" ml={6}>
            <Icon as={BsBell} boxSize={5} />
          </Box>
        </Flex>

        <Menu as={Box} ml={2}>
          {({ open }) => (
            <Box>
              <Menu.Button
                as={Box}
                _focus={{ outline: "none" }}
                cursor="pointer"
              >
                <Flex align="center">
                  <Avatar
                    size="sm"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                    name="User"
                  />
                  <Text ml={2}>Hi Kwasi</Text>
                  <Box>
                    <Icon
                      ml={2}
                      as={open ? FiChevronUp : FiChevronDown}
                      boxSize={6}
                    />
                  </Box>
                </Flex>
              </Menu.Button>
              {open && (
                <Menu.Items
                  static
                  as={MotionBox}
                  initial={{ opacity: 0, height: 0 }}
                  initial={{
                    opacity: 1,
                    height: "auto",
                    transition: { duration: 0.6 },
                  }}
                  exit={{ opacity: 0, height: 0 }}
                  pos="absolute"
                  bg="white"
                  w={48}
                  right={10}
                  rounded="sm"
                  mt={2}
                  color="gray.600"
                >
                  {menuLinks.map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <Link
                          py={2}
                          px={6}
                          _hover={{ textDecor: "none" }}
                          bg={active && "cf.400"}
                          color={active && "white"}
                          d="block"
                          href={item.link}
                        >
                          <Icon as={item.icon} boxSize={4} mr={2} /> {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              )}
            </Box>
          )}
        </Menu>
      </Flex>
    </Flex>
    // <Notification />
    // </Flex>
  );
};

export default Header;
