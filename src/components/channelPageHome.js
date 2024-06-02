import React, { useState } from "react";
import customAxios from "../axios";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { SuggestionVideo } from "./suggestionVideo";
export const ChannelHome = () => {
  const [uploads] = useOutletContext();
  const [videos, setVideos] = useState([]);
  console.log(uploads);
  async function fetchData() {
    try {
      const data = await customAxios.get("/playlistItems", {
        params: {
          playlistId: uploads,
          part: "snippet,contentDetails",
          maxResults: "5",
        },
      });
      console.log(data);
      setVideos(data.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
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
    </div>
  );
};
