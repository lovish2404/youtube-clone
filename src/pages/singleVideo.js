import React, { useState } from "react";
import { useEffect } from "react";
import customAxios from "../axios";
import { useParams, Outlet, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { SuggestionList } from "../components/suggestionList";
import { DetailMain } from "../components/detail";
import { Comments } from "../components/comments";
export const SingleVideo = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [commentData, setCommentData] = useState([]);
  console.log(state?.playlistId);
  let playlistId = "";
  playlistId = state?.playlistId;
  const [snippet, setSnippet] = useState({});
  const [statistics, setStatistics] = useState({});

  function resetDetail() {
    setSnippet([]);
    setStatistics({});
  }
  const fetchData = async () => {
    try {
      const response = await customAxios.get("/videos", {
        params: {
          part: "contentDetails,snippet,statistics",
          id: `${id}`,
        },
      });
      setSnippet(response.data.items[0].snippet);
      setStatistics(response.data.items[0].statistics);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  function resetCom() {
    setCommentData([]);
  }

  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div style={{ position: "relative" }}>
        <div className="videoPlay">
          <YouTube videoId={id} className="singleVideoMain"></YouTube>
        </div>
        {snippet.channelId ? (
          <DetailMain {...snippet} {...statistics}></DetailMain>
        ) : (
          ""
        )}
        <SuggestionList
          id={id}
          playlistId={playlistId}
          resetCom={resetCom}
          resetDetail={resetDetail}
        />
        <Comments
          id={id}
          commentData={commentData}
          setCommentData={setCommentData}
        />
      </div>
    </>
  );
};
