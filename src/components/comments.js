import React, { useEffect, useState } from "react";
import customAxios from "../axios";
import { SingleComment } from "./singleComment";
import { Loading } from "./loading";
import { useParams } from "react-router-dom";
export const Comments = ({ id, commentData, setCommentData }) => {
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState("");
  const showMore = () => {
    fetchComments("5");
  };
  const fetchComments = async (num) => {
    try {
      const data = await customAxios.get("/commentThreads", {
        params: {
          videoId: id,
          part: "snippet,replies",
          maxResults: num ? num : "20",
          ...(page && { pageToken: page }),
        },
      });

      console.log(data);
      setPage(data?.data?.nextPageToken);
      setCommentData((prev) => {
        return [...prev, ...data.data.items];
      });
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchComments();
  }, [id]);

  return (
    !loading && (
      <div className="commentHead">
        <span style={{ fontSize: "25px" }}>Comments</span>
        <div className="commentContainer">
          {commentData.map(({ snippet, id }) => {
            console.log(snippet);
            const toSend = snippet.topLevelComment.snippet;
            return <SingleComment key={id} {...toSend}></SingleComment>;
          })}
          {console.log("dds", commentData)}
          {Boolean(commentData?.length) && commentData?.length < 30 && (
            <div className="showMoreV">
              <button onClick={showMore}>Show more</button>
            </div>
          )}
        </div>
      </div>
    )
  );
};
