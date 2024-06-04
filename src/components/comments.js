import React, { useEffect, useState } from "react";
import customAxios from "../axios";
import { SingleComment } from "./singleComment";
export const Comments = ({ id, commentData, setCommentData }) => {
  const [loading, setLoading] = useState(true);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [page, setPage] = useState("");
  const showMore = () => {
    fetchComments("5");
  };
  const fetchComments = async (num) => {
    setMoreAvailable(true);
    try {
      const data = await customAxios.get("/commentThreads", {
        params: {
          videoId: id,
          part: "snippet,replies",
          maxResults: num ? num : "10",
          ...(page && { pageToken: page }),
        },
      });
      if (data.data.items.length < 5) {
        setMoreAvailable(false);
      }
      console.log(data);
      if (data?.data?.nextPageToken) {
        setPage(data?.data?.nextPageToken);
      } else {
        setPage(null);
        setMoreAvailable(false);
      }
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
          {moreAvailable && commentData?.length < 30 && (
            <div className="showMoreV">
              <button onClick={showMore}>Show more</button>
            </div>
          )}
        </div>
      </div>
    )
  );
};
