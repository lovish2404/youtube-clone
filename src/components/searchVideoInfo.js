import React, { useState } from "react";
import numeral from "numeral";
import moment from "moment";
import { useNavigate } from "react-router-dom";
export const SearchVideoInfo = ({
  title,
  channelImg,
  channelTitle,
  channelId,
  views,
  uploadDate,
  firstClass,
}) => {
  let TempClass = "";
  if (firstClass) {
    TempClass = firstClass;
  }
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/channel/${channelId}/home`);
  };
  return (
    <div className={`${firstClass}videoInfo`}>
      <div className={`${firstClass}channel-Info`}>
        <div
          className={`${firstClass}videoTitle`}
          style={{
            fontWeight: "650",
            fontSize: "20px",
          }}
        >
          {title}
        </div>

        <div className={`${firstClass}channelTitleDiv`}>
          <span
            style={{
              marginRight: "10px",
              fontSize: "medium",
            }}
          >
            {numeral(views).format("0.a").toUpperCase()} Views•
          </span>
          <span
            style={{
              marginRight: "10px",
              fontSize: "medium",
            }}
          >
            {moment(uploadDate).fromNow()}
          </span>
        </div>
        <div className="searchHelper">
          <div onClick={redirect} className={`${firstClass}channel-Img`}>
            <img
              src={channelImg}
              className={`${firstClass}channelImgMain`}
            ></img>
          </div>
          <div
            onClick={redirect}
            className={`${firstClass}channelTitle`}
            style={{ display: "table" }}
          >
            {channelTitle}
          </div>
        </div>
      </div>
    </div>
  );
};
