/* eslint-disable */
import React from "react";
import { Flex, Image, Link } from "@chakra-ui/react";
import { Link as ReachRouter } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import Logo from "assets/images/logo.svg";

import useAuth from "context/auth";
import useApi from "context/api";
import Notifications from "components/Utils/Notifications";
import Profile from "components/Utils/Profile";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { user } = isAuthenticated();
  const { getNotifications, updateNotification } = useApi();

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery("notifications", () =>
    getNotifications({
      accessLevel: "DIGITAL_FARMER",
      userId: user._id,
    })
  );

  console.log("data", data);

  const mutation = useMutation((id) => updateNotification(id, user._id), {
    onSuccess: () => queryClient.invalidateQueries("notifications"),
  });

  return (
    <Flex
      top={0}
      w="100%"
      as="header"
      pos="fixed"
      zIndex={100}
      align="center"
      bgColor="white"
      h={{ base: 14, md: 16, xl: 20 }}
      gridArea="header"
      justify="space-between"
      borderBottomWidth={1}
      borderBottomColor="gray.300"
      px={{ base: 4, xl: 20 }}
      overflowX={{ base: "hidden", md: "visible" }}
    >
      <Link as={ReachRouter} to="/dashboard" _hover={{ textDecor: "none" }}>
        <Image h={{ base: 8, md: 10 }} src={Logo} />
      </Link>

      <Flex align="center">
        <Notifications
          notifications={data?.notifications}
          loading={isLoading}
          mutation={mutation}
        />

        <Profile user={user} />
      </Flex>
    </Flex>
  );
};

export default Header;
