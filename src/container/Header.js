/* eslint-disable */
import React from "react";
import { Avatar, Box, Flex, Icon, Image, Link, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "@headlessui/react";
import { FiChevronDown, FiChevronUp, FiUser } from "react-icons/fi";
// import { BiCog, BiSupport, BiHistory } from 'react-icons/bi'
import { HiOutlineLogout } from "react-icons/hi";
import { BsBell } from "react-icons/bs";
import { Link as ReachRouter } from "react-router-dom";
import Loader from "react-loader-spinner";

import Logo1 from "assets/images/logo@1x.svg";
import Logo2 from "assets/images/logo@2x.svg";
import Logo3 from "assets/images/logo@3x.svg";

import useAuth from "context/auth";
import useApi from "../context/api";
import { FARMB } from "../theme/Icons";
import useAPICalls from "../hooks/useApiCalls";

const menuLinks = [
  { name: "Profile", icon: FiUser, link: "/profile" },
  // { name: 'History', icon: BiHistory, link: '/history' },
  // { name: 'Settings', icon: BiCog, link: '/settings' },
  // { name: 'Help Center', icon: BiSupport, link: '/help' }
  { name: "Logout", icon: HiOutlineLogout, link: "/logout" },
];

const MotionBox = motion(Box);

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { user } = isAuthenticated();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const { setFilter } = useAPICalls();

  const { getNotifications } = useApi();

  React.useEffect(() => {
    try {
      const fetchNotifications = async () => {
        setLoading(true);
        const res = await getNotifications({
          accessLevel: "DIGITAL_FARMER",
          userId: user._id,
        });
        setNotifications(res.notifications);
        setLoading(false);
      };
      fetchNotifications();
    } catch (error) {
      setError(true);
      console.log("error", error.message);
    }
  }, []);

  return (
    <Flex
      top={0}
      w="100%"
      as="header"
      pos="fixed"
      zIndex={100}
      align="center"
      bgColor="white"
      h={{ base: 14, md: 16 }}
      gridArea="header"
      justify="space-between"
      borderBottomWidth={1}
      borderBottomColor="gray.300"
      px={{ base: 4, md: 36 }}
      overflowX={{ base: "hidden", md: "visible" }}
    >
      <Link as={ReachRouter} to="/dashboard" _hover={{ textDecor: "none" }}>
        <Box as="picture">
          <Image
            h={{ base: 8, md: 10 }}
            src={Logo1}
            srcSet={`${Logo1} 300w, ${Logo2} 768w, ${Logo3} 1280w`}
          />
        </Box>
      </Link>

      <Flex align="center">
        <Menu as={Box} ml={2} userSelect="none">
          {({ open }) => (
            <>
              <Menu.Button
                as={Box}
                _focus={{ outline: "none" }}
                cursor="pointer"
                mr={{ md: 4 }}
              >
                <Icon as={BsBell} boxSize={5} />
              </Menu.Button>
              <AnimatePresence>
                {open && (
                  <Menu.Items
                    static
                    as={MotionBox}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3 },
                    }}
                    exit={{ opacity: 0, y: 50 }}
                    pos={{ base: "fixed", md: "absolute" }}
                    w={85}
                    maxH={90}
                    overflowY="scroll"
                    mt={3}
                    bg="white"
                    rounded="md"
                    borderWidth={1}
                    color="gray.600"
                    right={{ base: 5, md: 40 }}
                    _focus={{ outline: "none" }}
                    borderColor="gray.100"
                    filter="drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))"
                    fontSize="sm"
                    lineHeight="shorter"
                  >
                    <Flex
                      h={10}
                      align="center"
                      px={6}
                      borderBottomWidth={1}
                      fontWeight={800}
                      pos="fixed"
                      top={0}
                      w="100%"
                    >
                      <Icon as={BsBell} boxSize={4} mr={2} />
                      Notifications
                    </Flex>
                    <Box mt={10}>
                      <AnimatePresence>
                        {loading ? (
                          <Flex align="center" justify="center" py={10}>
                            <Loader
                              type="Rings"
                              color="#5AA250"
                              height={50}
                              width={50}
                            />
                          </Flex>
                        ) : (
                          notifications.map((item, i) => (
                            <Menu.Item
                              key={item?._id}
                              as={MotionBox}
                              // custom={i}
                              // variants={{
                              //   hidden: (i) => ({
                              //     y: -50 * i,
                              //     opacity: 0,
                              //   }),
                              //   visible: (i) => ({
                              //     y: 0,
                              //     opacity: 1,
                              //     transition: {
                              //       delay: i * 0.025,
                              //     },
                              //   }),
                              //   removed: {
                              //     y: 30 * i,
                              //   },
                              // }}
                              // initial="hidden"
                              // animate="visible"
                              exit="removed"
                            >
                              {({ active }) => (
                                <Link
                                  py={2}
                                  px={6}
                                  _hover={{
                                    textDecor: "none",
                                  }}
                                  bg={active && "cf.200"}
                                  color={active && "gray.600"}
                                  d="flex"
                                  href={
                                    item?.message?.type === "weekly_videos" ||
                                    item?.message?.type === "news"
                                      ? `/farms?${item?.message?.type}`
                                      : ""
                                  }
                                >
                                  {item?.message?.entity === "GENERIC" && (
                                    <Flex
                                      align="center"
                                      justify="center"
                                      w={8}
                                      h={8}
                                      rounded="100%"
                                      as="span"
                                      bg="cf.200"
                                    >
                                      <Icon as={FARMB} boxSize={4} />
                                    </Flex>
                                  )}
                                  <Box ml={2}>
                                    {item?.message?.entity === "GENERIC" &&
                                      item?.message?.title}
                                  </Box>
                                </Link>
                              )}
                            </Menu.Item>
                          ))
                        )}
                      </AnimatePresence>
                    </Box>
                  </Menu.Items>
                )}
              </AnimatePresence>
            </>
          )}
        </Menu>

        <Menu as={Box} ml={2} userSelect="none">
          {({ open }) => (
            <>
              <Menu.Button
                as={Box}
                _focus={{ outline: "none" }}
                cursor="pointer"
              >
                <Flex align="center">
                  <Avatar size="sm" src={user?.avatar} name={user?.firstName} />
                  <Text ml={2}>Hi {user?.firstName}</Text>
                  <Box>
                    <Icon
                      ml={2}
                      as={open ? FiChevronUp : FiChevronDown}
                      boxSize={6}
                    />
                  </Box>
                </Flex>
              </Menu.Button>
              <AnimatePresence>
                {open && (
                  <Menu.Items
                    static
                    as={MotionBox}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3 },
                    }}
                    exit={{ opacity: 0, y: 50 }}
                    pos={{ base: "fixed", md: "absolute" }}
                    w={56}
                    mt={3}
                    bg="white"
                    rounded="sm"
                    borderWidth={1}
                    color="gray.600"
                    right={{ base: 5, md: 20 }}
                    _focus={{ outline: "none" }}
                    borderColor="gray.100"
                  >
                    <AnimatePresence>
                      {menuLinks.map((item, i) => (
                        <Menu.Item
                          key={item.name}
                          as={MotionBox}
                          custom={i}
                          variants={{
                            hidden: (i) => ({
                              y: -50 * i,
                              opacity: 0,
                            }),
                            visible: (i) => ({
                              y: 0,
                              opacity: 1,
                              transition: {
                                delay: i * 0.025,
                              },
                            }),
                            removed: {
                              y: 30 * i,
                            },
                          }}
                          initial="hidden"
                          animate="visible"
                          exit="removed"
                        >
                          {({ active }) => (
                            <Link
                              py={2}
                              px={6}
                              _hover={{
                                textDecor: "none",
                              }}
                              bg={active && "cf.800"}
                              color={active && "white"}
                              d="block"
                              href={item.link}
                            >
                              <Icon as={item.icon} boxSize={4} mr={2} />{" "}
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </AnimatePresence>
                  </Menu.Items>
                )}
              </AnimatePresence>
            </>
          )}
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
