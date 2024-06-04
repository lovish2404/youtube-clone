import React, { useEffect, useState } from "react";
import customAxios from "../axios";
import { useParams } from "react-router-dom";
import { PlaylistClosed } from "./playlistClosed";
import { Loading } from "./loading";
export const ChannelPlaylist = () => {
  const { channelId } = useParams();
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [playlistData, setPlaylistData] = useState([]);
  const [page, setPage] = useState(null);
  const showMore = () => {
    fetchData();
  };
  console.log(channelId);
  const fetchData = async () => {
    setMoreAvailable(true);
    try {
      const data = await customAxios.get("/playlists", {
        params: {
          channelId: channelId,
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
      setPlaylistData((prev) => {
        return [...prev, ...data.data.items];
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("show more", moreAvailable);

  return (
    playlistData && (
      <>
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
        {moreAvailable && (
          <div className="showMoreV">
            <button onClick={showMore}>Show more</button>
          </div>
        )}
      </>
    )
  );
};
