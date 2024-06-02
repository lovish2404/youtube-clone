import React from "react";
import moment from "moment";
import numeral from "numeral";
import ReactShowMoreText from "react-show-more-text";
export const Description = ({ viewCount, publishedAt, description }) => {
  return (
    <>
      <div className="descriptionHead">
        <div className="info-container">
          <span>{numeral(viewCount).format("0.a")} views</span>
          <span>{moment(publishedAt).fromNow()}</span>
        </div>
        <div className="descriptionText">
          <ReactShowMoreText
            lines={3}
            more="MORE"
            less="LESS"
            className="showMore"
            expanded={false}
          >
            {description}
          </ReactShowMoreText>
        </div>
      </div>
    </>
  );
};
