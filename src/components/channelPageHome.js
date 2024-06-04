import React, { useState } from "react";
import customAxios from "../axios";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { SuggestionVideo } from "./suggestionVideo";
export const ChannelHome = () => {
  const [uploads] = useOutletContext();
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(null);
  console.log(uploads);
  const showMore = () => {
    fetchData();
  };
  async function fetchData() {
    setMoreAvailable(true);
    try {
      const data = await customAxios.get("/playlistItems", {
        params: {
          playlistId: uploads,
          part: "snippet,contentDetails",
          ...(page && { pageToken: page }),
        },
      });
      if (data.data.items.length < 5) {
        setMoreAvailable(false);
      }
      if (data?.data?.nextPageToken) {
        setPage(data?.data?.nextPageToken);
      } else {
        setPage(null);
        setMoreAvailable(false);
      }
      setVideos((prev) => {
        return [...prev, ...data.data.items];
      });
      setVideos(data.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    videos && (
      <div className="channelHome-List">
        {videos.map(({ id, snippet, contentDetails }) => {
          return (
            <SuggestionVideo
              key={id}
              id={contentDetails.videoId}
              {...snippet}
              firstClass="channelHome-"
              playlistId=""
            ></SuggestionVideo>
          );
        })}
        {moreAvailable && videos.length < 15 && (
          <div className="showMoreV">
            <button onClick={showMore}>Show more</button>
          </div>
        )}
      </div>
    )
  );
};
