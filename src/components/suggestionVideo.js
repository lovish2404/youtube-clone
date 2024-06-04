import React from "react";
import { useEffect, useState } from "react";
import customAxios from "../axios";
import { VideoInfo } from "./videoInfo";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { SearchVideoInfo } from "./searchVideoInfo";
export const SuggestionVideo = ({
  id,
  channelTitle,
  channelId,
  playlistId,
  thumbnails,
  firstClass,
  secondClass,
  infoDiv,
  resetPayload,
  resetCom,
  resetDetail,
}) => {
  const navigate = useNavigate();
  const [views, setViews] = useState(null);
  const [title, setTitle] = useState(null);
  const [duration, setDuration] = useState(null);
  const [uploadDate, setUploadDate] = useState(null);
  const [channelImg, setChannelImg] = useState("");
  const url = thumbnails?.high?.url;
  const seconds = moment.duration(duration).asSeconds();
  const formattedDuration = moment.utc(seconds * 1000).format("mm:ss");
  const fetchChannel = async () => {
    try {
      const data = await customAxios.get("/channels", {
        params: { part: "snippet", id: channelId },
      });
      setChannelImg(data.data.items[0].snippet.thumbnails.medium.url);
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchVideoDetails = async () => {
    try {
      const response = await customAxios.get("/videos", {
        params: {
          part: "contentDetails,snippet,statistics",
          id: id,
        },
      });
      setDuration(response.data.items[0].contentDetails.duration);
      setUploadDate(response.data.items[0].snippet.publishedAt);
      setViews(response.data.items[0].statistics.viewCount);
      setTitle(response.data.items[0].snippet.title);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChannel();
    fetchVideoDetails();
  }, []);
  function handleRedirection() {
    navigate(`/video/${id}`, { state: { playlistId } });
    if (resetPayload) {
      resetPayload();
      resetCom();
      resetDetail();
    }
  }
  {
    return (
      <div className={`${firstClass}Vid`}>
        <div
          className={firstClass == "searchList" ? "thumbnailSearch" : ""}
          onClick={handleRedirection}
          style={{
            cursor: "pointer",
            position: "relative",
            display: "block",
            width: "auto",
          }}
        >
          <img
            src={url}
            alt="thumbnail"
            style={{
              objectFit: "cover",
              height: "164px",
              width: "290px",
              borderRadius: "20px",
            }}
          />
          <span
            className={firstClass == "searchList" ? "classforSearch" : ""}
            style={{
              position: "absolute",
              top: "136px",
              left: "242px",
              color: "white",
              background: "black",
            }}
          >
            {formattedDuration}
          </span>
        </div>
        {infoDiv ? (
          <SearchVideoInfo
            channelTitle={channelTitle}
            channelImg={channelImg}
            title={title}
            uploadDate={uploadDate}
            views={views}
            id={id}
            channelId={channelId}
            firstClass={firstClass}
          ></SearchVideoInfo>
        ) : (
          <VideoInfo
            channelTitle={channelTitle}
            channelImg={channelImg}
            title={title}
            uploadDate={uploadDate}
            views={views}
            channelId={channelId}
            firstClass={firstClass}
            secondClass={secondClass}
            id={id}
          ></VideoInfo>
        )}{" "}
      </div>
    );
  }
};
