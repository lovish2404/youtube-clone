import React, { useState, useEffect } from "react";
import { SuggestionVideo } from "./suggestionVideo";
import { Loading } from "./loading";
import customAxios from "../axios";

export const PlaylistContainer = ({
  playlistId,
  resetPayload,
  resetCom,
  resetDetail,
}) => {
  const [list, setList] = useState([]);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [channelTitle, setChannelTitle] = useState("");
  const [page, setPage] = useState(null);
  const showMore = () => {
    fetchData();
  };
  async function fetchData() {
    setMoreAvailable(true);
    try {
      const data = await customAxios.get("/playlistItems", {
        params: {
          playlistId: playlistId,
          part: "snippet,contentDetails,status",
          ...(page && { pageToken: page }),
        },
      });
      console.log(data);
      console.log("page", page);
      if (data.data.items.length < 5) {
        setMoreAvailable(false);
      }
      if (data?.data?.nextPageToken) {
        setPage(data?.data?.nextPageToken);
      } else {
        setPage(null);
        setMoreAvailable(false);
      }

      setList((prev) => {
        return [...prev, ...data.data.items];
      });
      setChannelTitle(data.data.items[0].snippet.channelTitle);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  if (list) {
    return (
      <div className="playlistContainerHead">
        <div className="containerOptions">{channelTitle}</div>
        <div className="playlistContainerMain">
          {list.map(({ id, snippet, contentDetails }) => {
            return (
              <SuggestionVideo
                resetCom={resetCom}
                resetDetail={resetDetail}
                resetPayload={resetPayload}
                key={id}
                id={contentDetails.videoId}
                {...snippet}
                firstClass="channelHome-"
                playlistId={playlistId}
                secondClass={"secondClass"}
              ></SuggestionVideo>
            );
          })}
          {moreAvailable && (
            <div className="showMoreV">
              <button onClick={showMore}>Show more</button>
            </div>
          )}
        </div>
      </div>
    );
  }
};
