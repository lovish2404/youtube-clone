import React, { useState, useEffect } from "react";
import { SuggestionVideo } from "./suggestionVideo";
import { Loading } from "./loading";
import customAxios from "../axios";

export const PlaylistContainer = ({ playlistId }) => {
  const [list, setList] = useState([]);
  const [channelTitle, setChannelTitle] = useState("");
  async function fetchData() {
    try {
      const data = await customAxios.get("/playlistItems", {
        params: {
          playlistId: playlistId,
          part: "snippet,contentDetails",
          maxResults: "5",
        },
      });
      console.log(data);
      setList(data.data.items);
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
                key={id}
                id={contentDetails.videoId}
                {...snippet}
                firstClass="channelHome-"
                playlistId={playlistId}
                secondClass={"secondClass"}
              ></SuggestionVideo>
            );
          })}
        </div>
      </div>
    );
  }
};
