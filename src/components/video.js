import React, { useState } from "react";
import { useEffect } from "react";
import customAxios from "../axios";
import { useNavigate } from "react-router-dom";
import { VideoInfo } from "./videoInfo";
import moment from "moment";
export const Video = ({
  id,
  channelTitle,
  channelId,
  description,
  thumbnails,
}) => {
  const navigate = useNavigate();
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [uploadDate, setUploadDate] = useState(null);
  const [channelImg, setChannelImg] = useState("");
  const [title, setTitle] = useState(null);
  const { url } = thumbnails.high;
  const seconds = moment.duration(duration).asSeconds();
  const formattedDuration = moment.utc(seconds * 1000).format("mm:ss");
  const fetchChannel = async () => {
    try {
      const data = await customAxios.get("/channels", {
        params: { part: "snippet", id: channelId },
      });
      setChannelImg(data.data.items[0].snippet.thumbnails.medium.url);
    } catch (error) {}
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
    } catch (error) {}
  };
  const redirect = () => {
    navigate(`/video/${id}`);
  };
  useEffect(() => {
    fetchChannel();
    fetchVideoDetails();
  }, []);
  {
    return (
      <div className="videoDiv">
        <div
          onClick={redirect}
          className="imageDiv"
          style={{
            cursor: "pointer",
            position: "relative",
          }}
        >
          <img src={url} alt="thumbnail" className="thumbnail" />
          <span
            style={{
              position: "absolute",
              top: "280px",
              right: "24px",
              color: "white",
              background: "black",
            }}
          >
            {formattedDuration}
          </span>
        </div>
        <VideoInfo
          channelTitle={channelTitle}
          channelImg={channelImg}
          title={title}
          uploadDate={uploadDate}
          views={views}
          channelId={channelId}
          id={id}
          firstClass=""
        ></VideoInfo>
      </div>
    );
  }
};
