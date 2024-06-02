import React, { useState, useEffect } from "react";
import customAxios from "../axios";
import { SuggestionVideo } from "./suggestionVideo";
import { PlaylistContainer } from "./playlistContainer";
export const SuggestionList = ({ id, playlistId, resetCom, resetDetail }) => {
  const [suggestionList, setSuggestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("");
  const showMore = () => {
    getApi("5");
  };
  const getApi = async (num) => {
    try {
      const data = await customAxios.get("/search", {
        params: {
          part: "snippet",
          relatedToVideo: id,
          type: "video",
          ...(num && { maxResults: num }),
          ...(page && { pageToken: page }),
          videoDuration: "medium",
        },
      });
      setPage(data?.data?.nextPageToken);
      setSuggestionList((prev) => [...prev, ...data.data.items]);
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  console.log("dd", suggestionList);

  useEffect(() => {
    if (!suggestionList?.length && id) {
      getApi();
    }
  }, [id]);

  return (
    !loading && (
      <div className="suggestionList">
        {playlistId ? (
          <PlaylistContainer playlistId={playlistId}></PlaylistContainer>
        ) : (
          ""
        )}
        {suggestionList.map(({ id, snippet }) => {
          const { videoId } = id;
          return (
            <SuggestionVideo
              key={videoId}
              resetPayload={() => setSuggestionList([])}
              id={videoId}
              {...snippet}
              firstClass="suggestion"
              resetCom={resetCom}
              resetDetail={resetDetail}
            ></SuggestionVideo>
          );
        })}
        {suggestionList.length < 15 && (
          <div className="showMoreV">
            <button onClick={showMore}>Show more</button>
          </div>
        )}
      </div>
    )
  );
};
