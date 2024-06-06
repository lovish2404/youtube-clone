import React from "react";
import { useState, useRef, useEffect } from "react";
import numeral from "numeral";
import { RxCross2 } from "react-icons/rx";
export const ChannelOverview = ({
  thumbnails,
  channel,
  customUrl,
  subscriberCount,
  hiddenSubscriberCount,
  videoCount,
}) => {
  const [showModal, setShowModal] = useState(false);
  const url = thumbnails?.high?.url;
  const channelTitle = channel?.title;
  const description = channel?.description;
  const ref = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (ref.current) {
      if (!ref.current.contains(event.target)) {
        setShowModal(false);
      }
    }
  }

  return (
    <div className="channelOverview">
      <div className="channelImg">
        <img src={url} alt="channelImg" />
      </div>
      <div className="channelOverview-details">
        <h2>{channelTitle}</h2>
        <div className="channelReach">
          <span
            style={{
              textTransform: "uppercase",
            }}
          >
            {customUrl}
          </span>
          {!hiddenSubscriberCount ? (
            <span>{numeral(subscriberCount).format("0.a")} subscribers‧</span>
          ) : (
            ""
          )}
          <span>{numeral(videoCount).format("0.a")} videos</span>
        </div>
        <div className="channel-des-container">
          <div className="channel-des">{description}</div>
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            {"Description >"}
          </button>
        </div>
        {showModal ? (
          <div className="fullContainerDes">
            <div className="channelDescriptionOpen" ref={ref}>
              <div style={{ display: "flex", borderBottom: "solid 2px" }}>
                <span>About</span>
                <button
                  className="crossDes"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  <RxCross2></RxCross2>
                </button>
              </div>
              <div className="toScroll">
                <div className="channelDesFull">{description}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div id="buttons">
          <button className="subButton">
            <span>Subscribe</span>
          </button>
        </div>
      </div>
    </div>
  );
};
