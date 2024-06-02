import React, { useEffect, useState } from "react";
import { ChannelInfo } from "./channeInfo";
import { Description } from "./description";
import customAxios from "../axios";
export const DetailMain = ({
  channelId,
  channelTitle,
  description,
  publishedAt,
  title,
  likeCount,
  viewCount,
}) => {
  const [subscriberCount, setSubscriberCount] = useState("");
  const [hiddenSubscriberCount, sethiddenSubscriberCount] = useState("");
  const [channelImg, setChannelImg] = useState("");
  const fetchChannel = async () => {
    try {
      const data = await customAxios.get("/channels", {
        params: { id: channelId, part: "statistics,snippet" },
      });
      setChannelImg(data.data.items[0].snippet.thumbnails.medium.url);
      setSubscriberCount(data.data.items[0].statistics.subscriberCount);
      sethiddenSubscriberCount(
        data.data.items[0].statistics.hiddenSubscriberCount
      );
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchChannel();
  }, [title]);
  return (
    <>
      <div className="singleVideoDetail">
        <div className="singleVideoHead">
          <div className="vidTitleHead">{title}</div>
          <ChannelInfo
            likeCount={likeCount}
            channelImg={channelImg}
            channelId={channelId}
            channelTitle={channelTitle}
            subscriberCount={subscriberCount}
            hiddenSubscriberCount={hiddenSubscriberCount}
          ></ChannelInfo>
        </div>
        <Description
          viewCount={viewCount}
          publishedAt={publishedAt}
          description={description}
        ></Description>
      </div>
    </>
  );
};
