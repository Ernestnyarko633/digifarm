/* eslint-disable */
import React from "react";
import Overlay from "../../Loading/Overlay";
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { getformattedDate } from "../../../helpers/misc";
import { AnimateSharedLayout, motion } from "framer-motion";
import Button from "../../Button";
import useAuth from "../../../context/auth";
import useStartFarm from "../../../context/start-farm";
import { useIntersection } from "react-use";
import AboutFarmManager from "../OtherSteps/AboutFarmManager";
import ChooseAcreage from "../OtherSteps/ChooseAcreage";
import Contract from "../OtherSteps/Contract";
import PaymentOption from "../OtherSteps/PaymentOption";
import Confirmation from "../OtherSteps/Confirmation";
import ReloadPage from "../../Reload";
import CooperativeName from "../OtherSteps/CooperativeName";
import Acreage from "./Acreage";

const MotionFlex = motion(Flex);

const CooperativeSteps = ({ data, history }) => {
  const { user } = useAuth();
  const {
    text,
    order,
    otherStep,
    handlePrev,
    handleBack,
    skipNextStep,
    selectedFarm,
    isSubmitting,
    handlePayment,
    handleNextStep,
    cooperativeName,
    handleCreateCooperative
  } = useStartFarm();

  const catFarms = JSON.parse(sessionStorage.getItem("farms"));

  const {
    location: { selectedType },
  } = history;

  console.log(selectedType, "king")
  const toast = useToast();

  window.onbeforeunload = function (event) {
    event.returnValue = "Unsaved data maybe lost.";
  };

  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  console.log(selectedType, "from space")

  const getSteps = (value) => {
    switch (value) {
      case 0:
        return <AboutFarmManager farm={selectedFarm} />;
      // case 1:
      //   return <ChooseAcreage farm={selectedFarm} selectedType={selectedType} />;
      case 2:
        return <CooperativeName />;
      case 3:
        return (
          <Acreage
            name={cooperativeName}
            farm={selectedFarm}
            order={data || order}
            selectedType={selectedType}
          />
        );
      case 4:
        return (
          <Contract
            farm={selectedFarm}
            {...{ user }}
            intersectionRef={intersectionRef}
          />
        );
      case 5:
        return <PaymentOption farm={selectedFarm} />;
      case 6:
        return <Confirmation farm={selectedFarm} order={data || order} />;
      default:
        return <ReloadPage />;
    }
  };

  const handleAcceptAgreement = async () => {
    try {
      if (user?.signature?.string) {
      await handleCreateCooperative(selectedType?._id) 
      } else {
        toast({
          title: "Action needed",
          description: "You need to set up a profile signature",
          status: "error",
          duration: 5000,
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Something went wrong",
        status: error?.statusCode,
        duration: 5000,
        position: "top-right",
      });
    }
    
  };

  const getForwardButtonProps = (key) => {
    switch (key) {
      case 0:
        return {
          title: "Next", width: 56, action: skipNextStep
        }
      case 4:
        return {
          title: "Accept Agreement",
          width: 56,
          action: () => handleAcceptAgreement(),
        };
      case 5:
        return {
          title: "Next",
          width: 48,
          action: (_) => handlePayment(),
        };
      case 6:
        return {
          title: "Continue to my Dashboard",
          width: 80,
          action: () => history.push("/dashboard"),
        };
      default:
        return { title: "Next", width: 56, action: handleNextStep };
    }
  };

  const { title, action, width } = getForwardButtonProps(otherStep);

  if (!catFarms && otherStep !== 4) {
    history.push("/dashboard");
  }

  return (
    <Flex
      align="center"
      justify="center"
      h={{ md: "calc(100vh - 6rem)" }}
      direction="column"
    >
      {isSubmitting && <Overlay text={text} />}

      {otherStep !== 2 && (
        <Flex
          align="center"
          justify="space-between"
          w={{ base: 82, md: 143 }}
          mx="auto"
          mt={{ base: 5, md: 12 }}
          mb={4}
          px={{ base: 2, md: 0 }}
        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="red.600"
            w="50%"
            fontWeight={700}
          >
            Farm starts :{" "}
            <Text
              d={{ base: "block", md: "inline-block" }}
              mt={{ base: -1, md: 0 }}
            >
              {getformattedDate(
                selectedFarm?.startDate || data?.product?.startDate,
                {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </Text>
          </Text>
          <Link
            href="https://gaip-info.com/multi-peril-crop-insurance"
            isExternal
            rel="noreferrer"
            _hover={{ textDecor: "none" }}
          >
            <Flex
              py={1}
              align="center"
              rounded="30px"
              w={{ md: "11rem" }}
              px={{ base: 2, md: 4 }}
              borderWidth={1}
              borderColor="cf.800"
              bg="cf.200"
              color="cf.800"
            >
              <Image
                h={4}
                src={
                  require("../../../assets/images/startfarm/insurance.png")
                    .default
                }
              />
              <Text fontSize="sm" ml={2} color="cf.800">
                Farm is insured
              </Text>
            </Flex>
          </Link>
        </Flex>
      )}

      <AnimateSharedLayout>
        <MotionFlex
          w={{ md: otherStep !== 2 && 143 }}
          h={{
            base: otherStep === 2 && "80vh",
            md: otherStep !== 2 ? 120 : "80vh",
          }}
          mx="auto"
          borderWidth={otherStep !== 2 && 1}
          borderColor="gray.200"
          align={otherStep === 2 && "center"}
          justify={otherStep === 2 && "center"}
          rounded="md"
          bgColor={otherStep !== 2 && "white"}
          overflow="hidden"
        >
          {getSteps(otherStep)}
        </MotionFlex>
      </AnimateSharedLayout>

      <Flex
        align="center"
        justify="center"
        mt={6}
        px={{ base: 4, md: 0 }}
        mb={{ base: 4, md: 0 }}
      >
        <Button
          h={12}
          width={32}
          fontSize="md"
          btntitle="Prev"
          color="gray.700"
          colorScheme="white"
          onClick={otherStep <= 0 ? handleBack : handlePrev}
          borderWidth={1}
        />
        <Button
          ml={{ base: 4, md: 6 }}
          h={12}
          fontSize={{ md: "lg" }}
          disabled={
            otherStep === 2 &&
            user?.signature?.string &&
            intersection &&
            intersection.intersectionRatio < 1
              ? true
              : false
          }
          width={width}
          btntitle={title}
          onClick={action}
        />
      </Flex>
    </Flex>
  );
};

export default CooperativeSteps;
