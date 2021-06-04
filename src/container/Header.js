/* eslint-disable */
import React from "react";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { Link as ReachRouter } from "react-router-dom";

import Logo1 from "assets/images/logo@1x.svg";
import Logo2 from "assets/images/logo@2x.svg";
import Logo3 from "assets/images/logo@3x.svg";

import useAuth from "context/auth";
import useApi from "context/api";
import Notifications from "components/Utils/Notifications";
import Profile from "components/Utils/Profile";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { user } = isAuthenticated();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);

  const { getNotifications, updateNotification } = useApi();

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
    }
  }, []);

  const notificationUpdate = async (id) => {
    const data = await updateNotification(id, user._id);
  };

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
      px={{ base: 4, xl: 20 }}
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
        <Notifications
          notifications={notifications}
          loading={loading}
          updateNotification={notificationUpdate}
        />

        <Profile user={user} />
      </Flex>
    </Flex>
  );
};

export default Header;
