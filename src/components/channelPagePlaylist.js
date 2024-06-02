import React, { useEffect, useState } from "react";
import customAxios from "../axios";
import { useParams } from "react-router-dom";
import { PlaylistClosed } from "./playlistClosed";
import { Loading } from "./loading";
export const ChannelPlaylist = () => {
  const { channelId } = useParams();
  const [playlistData, setPlaylistData] = useState([]);
  console.log(channelId);
  const fetchData = async () => {
    try {
      const data = await customAxios.get("/playlists", {
        params: {
          channelId: channelId,
          part: "snippet,contentDetails",
          maxResults: "3",
        },
      });
      setPlaylistData(data.data.items);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (playlistData) {
    return (
      <div className="playlistClosedDiv">
        {playlistData.map(({ contentDetails, snippet, id }) => {
          return (
            <PlaylistClosed
              key={id}
              {...snippet}
              {...contentDetails}
              id={id}
            ></PlaylistClosed>
          );
        })}
      </div>
    );
  }
  return <Loading></Loading>;
};
