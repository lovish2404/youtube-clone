import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
export const SingleComment = ({
  authorChannelId,
  authorDisplayName,
  authorProfileImageUrl,
  likeCount,
  publishedAt,
  textOriginal,
}) => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/channel/${authorChannelId}/home`);
  };
  return (
    <div className="singleCommentContainer">
      <div className="authorImg" onClick={redirect}>
        <img src={authorProfileImageUrl} alt="author" />
      </div>
      <div className="authorMain">
        <div className="authorDetails">
          <div onClick={redirect} style={{ cursor: "pointer" }}>
            {authorDisplayName}
          </div>
          <span>{moment(publishedAt).fromNow()}</span>
        </div>
        <div className="authorComment">
          <span>{textOriginal}</span>
        </div>
        <div className="authorReach">
          <button className="commentLikeButton">
            <AiOutlineLike></AiOutlineLike>
            {numeral(likeCount).format("0.a")}
          </button>
          <button className="commentDislikeButton">
            <AiOutlineDislike></AiOutlineDislike>
          </button>
        </div>
      </div>
    </div>
  );
};
