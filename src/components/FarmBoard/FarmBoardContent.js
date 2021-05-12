/* eslint-disable no-console */
/* eslint-disable */
/* eslint-disable no-unused-vars */
import React from "react";
import { Heading, Flex, Box, Text } from "@chakra-ui/react";
import Prismic from "prismic-javascript";
import getConfig from "utils/configs";
import FarmBoardEmptyState from "components/FarmBoard/EmptyState/FarmBoardEmptyState";
import YourFarmCard from "../Cards/YourFarmCard";
import FarmFeedCard from "components/FarmBoard/Cards/FarmFeedCard";
import NewsCard from "components/FarmBoard/Cards/NewsCard";
import WeeklyVideoCard from "components/FarmBoard/Cards/WeeklyVideoCard";
import FetchCard from "components/FetchCard/index";
import PropTypes from "prop-types";
import useApi from "context/api";

const FarmBoardContent = ({ farms }) => {
  const [activeFarmIndex, setActiveFarmIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [feeds, setFeeds] = React.useState([]);
  const [news, setNewsData] = React.useState(null);
  const [videos, setVideosData] = React.useState(null);
  const [filter, setFilter] = React.useState("all");
  const [farmName, setFarmName] = React.useState("Felix's Farm");

  const { getMyFarmFeeds } = useApi();
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig();

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN,
  });

  React.useEffect(() => {
    let mounted = true;
    if (mounted && !news && !videos) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const [res1, res2] = await Promise.all([
            Client.query(Prismic.Predicates.at("document.type", "news")),
            Client.query(
              Prismic.Predicates.at("document.type", "weekly_videos")
            ),
          ]);
          if (res1) setNewsData(res1.results);
          if (res2) setVideosData(res2.results);
        } catch (err) {
          setError("Could not fetch data");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
    return () => (mounted = false);
  }, [Client, news, videos]);

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);
      const fetchData = async () => {
        // news data
        if (news) {
          setFeeds((prev) => [...prev, ...news]);
        }

        // weekly videos
        if (videos) {
          setFeeds((prev) => [...prev, ...videos]);
        }

        const feedPromises = farms.map(async (farm) => {
          const response = await getMyFarmFeeds({
            farm: farm?.order?.product?._id,
          });
          if (response.data) {
            return response.data;
          }
          return [];
        });

        const allFeeds = await Promise.all(feedPromises);

        //combining all data now from prismic and farm feeds
        if (allFeeds && news && videos) {
          allFeeds.map((f) => setFeeds((s) => [...s, ...f]));
        }

        setLoading(false);
      };

      fetchData();
    }

    return () => (mounted = false);
  }, [news, farms, videos, getMyFarmFeeds]);

  //FIXME: larger feeds would slow down process
  const cleanedFeeds = feeds?.filter(
    (feed, index, self) =>
      self.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(feed)
      ) === index
  );

  // const mapKey = (i) => i;
  const isNotEmpty = (filter, array) => {
    let farm = false;
    let videos = false;
    let news = false;
    const _farms = array.filter(
      (item) =>
        filter === "all" &&
        farms[activeFarmIndex]?.order?.product?._id === item?.farm
    );
    const _videos = array.filter(
      (item) => filter === "weekly videos" && item?.type === "weekly_videos"
    );
    const _news = array.filter(
      (item) => filter === "news" && item?.type === "news"
    );

    if (_farms.length) farm = true;
    if (_videos.length) videos = true;
    if (_news.length) news = true;

    return {
      farm,
      videos,
      news,
    };
  };

  const renderCard = (status, content) => {
    switch (status) {
      case "news":
        return (
          <>
            {filter === "news" && (
              <NewsCard
                activeFarm={farms[activeFarmIndex]}
                content={content}
                status={status}
                timestamp={new Date(
                  content?.data?.created || new Date()
                )?.toLocaleDateString()}
              />
            )}
          </>
        );
      case "weekly_videos":
        return (
          <React.Fragment>
            {filter === "weekly videos" && (
              <WeeklyVideoCard
                activeFarm={farms[activeFarmIndex]}
                content={content}
                status={status}
                timestamp={new Date(
                  content?.data?.created || new Date()
                )?.toLocaleDateString()}
              />
            )}
          </React.Fragment>
        );
      default:
        return (
          <>
            {filter === "all" &&
              farms[activeFarmIndex]?.order?.product?._id === content?.farm && (
                <FarmFeedCard
                  activeFarm={farms[activeFarmIndex]}
                  content={content}
                  status={status}
                  timestamp={new Date(
                    content?.data?.created || new Date()
                  )?.toLocaleDateString()}
                />
              )}
          </>
        );
    }
  };

  return (
    <Flex w="100%" align="center" direction="column">
      {loading && !cleanedFeeds.length ? (
        <FetchCard
          direction="column"
          align="center"
          justify="center"
          mx="auto"
          reload={() => null}
          loading={loading}
          error={error}
          text="Stand by as we load your farm board"
        />
      ) : (
        <>
          {cleanedFeeds?.length && (
            <YourFarmCard
              filter={filter}
              farms={farms}
              setFilter={setFilter}
              activeFarmIndex={activeFarmIndex}
              setActiveFarmIndex={setActiveFarmIndex}
              farmName={farmName}
              setFarmName={setFarmName}
            />
          )}
          <Box p={{ base: 4, md: 16 }}>
            <Heading as="h3" fontSize={{ md: "xl" }} textAlign="center" mb={10}>
              {cleanedFeeds.length
                ? "See what's happening in your farm(s)"
                : ""}
            </Heading>
            {!isNotEmpty(filter, cleanedFeeds)?.farm && filter === "all" && (
              <Flex w="100%" align="center" justify="center">
                <Text color="cf.800" fontSize={{ base: "md" }}>
                  Oops, Feeds unavailable currently
                </Text>
              </Flex>
            )}
            {!isNotEmpty(filter, cleanedFeeds)?.videos &&
              filter === "weekly videos" && (
                <Flex w="100%" align="center" justify="center">
                  <Text color="cf.800" fontSize={{ base: "md" }}>
                    Oops, Videos unavailable currently
                  </Text>
                </Flex>
              )}

            {!isNotEmpty(filter, cleanedFeeds)?.news && filter === "news" && (
              <Flex w="100%" align="center" justify="center">
                <Text color="cf.800" fontSize={{ base: "md" }}>
                  Oops, News unavailable currently
                </Text>
              </Flex>
            )}

            {feeds?.length > 0 ? (
              cleanedFeeds.map((content) => {
                return <>{renderCard(content?.type, content)}</>;
              })
            ) : (
              <FarmBoardEmptyState />
            )}
          </Box>
        </>
      )}
    </Flex>
  );
};

FarmBoardContent.propTypes = {
  farms: PropTypes.any,
};

export default FarmBoardContent;
