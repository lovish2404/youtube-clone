import React, { useState } from "react";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
export const ChannelInfo = ({
  likeCount,
  channelImg,
  channelTitle,
  subscriberCount,
  channelId,
  hiddenSubscriberCount,
}) => {
  const navigate = useNavigate();
  const [buttonVal, setButtonVal] = useState(false);
  const [likeChange, setLikeChange] = useState(likeCount);
  const [isLiked, setiSLiked] = useState(false);
  const [isDisliked, setiSdisliked] = useState(false);
  console.log(likeCount);
  console.log(likeChange);
  console.log(numeral(likeCount).format("0.a"));
  const handleSub = () => {
    setButtonVal(!buttonVal);
  };
  const likeIncrease = () => {
    let newLike = parseInt(likeCount) + 1;
    setLikeChange(newLike);
  };

  const handleLike = () => {
    if (!isLiked) {
      likeIncrease();
    } else {
      setLikeChange(likeCount);
    }
    setiSLiked(!isLiked);
    setiSdisliked(false);
  };
  const handleDislike = () => {
    if (isLiked) {
      setLikeChange(likeCount);
    }
    setiSLiked(false);
    setiSdisliked(!isDisliked);
  };
  const redirect = () => {
    navigate(`/channel/${channelId}/home`);
  };
  let styles = {
    subs: {
      background: buttonVal ? "red" : "",
      color: buttonVal ? "white" : "",
    },
    likeStyle: {
      color: isLiked ? "#336699" : "",
    },
    dislikeStyle: {
      color: isDisliked ? "#336699" : "",
    },
  };
  return (
    <>
      <div className="channelInfoHead">
        <div className="channelImageHead" onClick={redirect}>
          <img src={channelImg} alt="channelImg" />
        </div>
        <div className="channelTitleHead">
          <div
            id="titleSpan"
            onClick={redirect}
            style={{ textDecoration: "none", color: "black" }}
          >
            {channelTitle}
          </div>

          {hiddenSubscriberCount ? (
            <span></span>
          ) : (
            <span id="subsSpan">
              {numeral(subscriberCount).format("0.a").toUpperCase()} subscribers
            </span>
          )}
        </div>
        <button className="subButton" onClick={handleSub} style={styles.subs}>
          <span>{buttonVal ? "Subscribed" : "Subscribe"}</span>
        </button>
        <div className="likeAndDislike">
          <button className="likeButton" onClick={handleLike}>
            <AiFillLike style={styles.likeStyle}></AiFillLike>
            {numeral(likeChange).format("0.a")}
          </button>
          <button className="dislikeButton" onClick={handleDislike}>
            <AiFillDislike style={styles.dislikeStyle}></AiFillDislike>
          </button>
        </div>
      </div>
    </>
  );
};
