import React, { useState, useEffect } from "react";
import customAxios from "../axios";
import { SuggestionVideo } from "./suggestionVideo";
import { PlaylistContainer } from "./playlistContainer";
export const SuggestionList = ({ id, playlistId, resetCom, resetDetail }) => {
  const [suggestionList, setSuggestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [page, setPage] = useState("");
  const showMore = () => {
    getApi();
  };
  const getApi = async () => {
    setMoreAvailable(true);
    try {
      const data = await customAxios.get("/search", {
        params: {
          part: "snippet",
          relatedToVideo: id,
          type: "video",
          ...(page && { pageToken: page }),
          videoDuration: "medium",
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
      setSuggestionList((prev) => [...prev, ...data.data.items]);
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  console.log("dd", suggestionList);
  function resetPayload() {
    setSuggestionList([]);
  }
  useEffect(() => {
    if (!suggestionList?.length && id) {
      getApi();
    }
  }, [id]);

  return (
    !loading && (
      <div className="suggestionList">
        {playlistId ? (
          <PlaylistContainer
            playlistId={playlistId}
            resetCom={resetCom}
            resetDetail={resetDetail}
            resetPayload={resetPayload}
          ></PlaylistContainer>
        ) : (
          ""
        )}
        {suggestionList.map(({ id, snippet }) => {
          const { videoId } = id;
          return (
            <SuggestionVideo
              key={videoId}
              resetPayload={resetPayload}
              id={videoId}
              {...snippet}
              firstClass="suggestion"
              resetCom={resetCom}
              resetDetail={resetDetail}
            ></SuggestionVideo>
          );
        })}
        {moreAvailable && suggestionList.length < 15 && (
          <div className="showMoreV">
            <button onClick={showMore}>Show more</button>
          </div>
        )}
      </div>
    )
  );
};
