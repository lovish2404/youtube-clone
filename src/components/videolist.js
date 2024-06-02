import React, { useEffect, useState } from "react";
import customAxios from "../axios";
import { useGlobalContext } from "../context";
import { Loading } from "./loading";
import { Video } from "./video";

export const VideoList = ({ searchFilter }) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("");
  const { videoList, setVideoList } = useGlobalContext();
  const getApi = async (num) => {
    try {
      const data = await customAxios.get("/search", {
        params: {
          part: "snippet",
          chart: "mostPopular",
          type: "video",
          videoDuration: "medium",
          ...(num && { maxResults: num }),
          ...(page && { pageToken: page }),
          q: searchFilter,
        },
      });
      setPage(data?.data?.nextPageToken);
      setVideoList((prev) => {
        return [...prev, ...data.data.items];
      });
    } catch (error) {}
    setLoading(false);
  };
  const showMore = () => {
    getApi("3");
  };
  useEffect(() => {
    getApi();
  }, []);
  if (loading) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }
  return (
    <>
      <section className="center">
        {videoList.length > 0 &&
          videoList.map(({ id, snippet }) => {
            const { videoId } = id;
            return <Video key={videoId} id={videoId} {...snippet}></Video>;
          })}
      </section>
      <div className="showMoreV">
        <button onClick={showMore}>Show more</button>
      </div>
    </>
  );
};
