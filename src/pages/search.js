import React, { useEffect, useState } from "react";
import customAxios from "../axios";
import { useLocation } from "react-router-dom";
import { Loading } from "../components/loading";
import { SuggestionVideo } from "../components/suggestionVideo";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";

export const SearchPage = () => {
  const { state } = useLocation();
  const keyword = state?.searchKeyword;
  console.log(state);
  console.log(keyword);
  const infoDiv = "search";
  const [searchedVideos, setSearchedVideos] = useState([]);
  async function fetchData() {
    try {
      const data = await customAxios.get("/search", {
        params: {
          part: "snippet",
          q: keyword,
          regionCode: "US",
          order: "relevance",
          maxResults: "6",
          type: "video",
          videoDuration: "medium",
        },
      });
      console.log(data);
      setSearchedVideos(data.data.items);
    } catch (error) {}
  }
  useEffect(() => {
    if (keyword.length) {
      fetchData();
    }
  }, [keyword]);
  if (searchedVideos) {
    return (
      <>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <div className="searchList">
          {searchedVideos.map(({ id, snippet }) => {
            const { videoId } = id;
            return (
              <SuggestionVideo
                key={videoId}
                id={videoId}
                {...snippet}
                firstClass="searchList"
                infoDiv={infoDiv}
              ></SuggestionVideo>
            );
          })}
        </div>
      </>
    );
  }

  return <Loading></Loading>;
};
