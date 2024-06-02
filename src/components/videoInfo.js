import React, { useState } from "react";
import numeral from "numeral";
import moment from "moment";
import { useNavigate } from "react-router-dom";
export const VideoInfo = ({
  id,
  title,
  channelImg,
  channelTitle,
  channelId,
  views,
  uploadDate,
  firstClass,
  secondClass,
}) => {
  let tempClass = "";
  if (secondClass) {
    tempClass = "playlistHelper";
  }
  const navigate = useNavigate();
  function redirect() {
    navigate(`/channel/${channelId}/home`);
  }
  return (
    <div className={`${firstClass}videoInfo`}>
      <div onClick={redirect} className={`${firstClass}channel-Img`}>
        <img src={channelImg} className={`${firstClass}channelImgMain`}></img>
      </div>

      <div className={`${firstClass}channel-Info`}>
        <div
          onClick={() => {
            navigate(`/video/${id}`);
          }}
          className={`${firstClass}videoTitle  ${tempClass}`}
          style={{
            cursor: "pointer",
            fontWeight: "650",
            fontSize: "20px",
          }}
        >
          {console.log("tt", title)}
          {title}
        </div>

        <div className={`${firstClass}channelTitleDiv`}>
          <div
            onClick={redirect}
            className={`${firstClass}channelTitle`}
            style={{ display: "table" }}
          >
            {channelTitle}
          </div>

          <span
            style={{
              marginRight: "10px",
              fontSize: "medium",
            }}
          >
            {numeral(views).format("0.a").toUpperCase()} Views•
          </span>
          <span
            className={secondClass ? "hidden" : ""}
            style={{
              marginRight: "10px",
              fontSize: "medium",
            }}
          >
            {moment(uploadDate).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};
