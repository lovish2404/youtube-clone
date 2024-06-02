import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import customAxios from "../axios";
import { useNavigate } from "react-router-dom";
export const PlaylistClosed = ({ itemCount, id, title, thumbnails }) => {
  const imgUrl = thumbnails?.high?.url;
  const [hiddenClass, setHiddenClass] = useState(false);
  const [firstVideo, setFirstVideo] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const navigate = useNavigate();
  const handleRedirection = () => {
    navigate(`/video/${firstVideo}`, { state: { playlistId } });
  };
  function handleHover() {
    setHiddenClass(true);
  }
  function handler() {
    setHiddenClass(false);
  }
  async function getPlaylistData() {
    try {
      const data = await customAxios.get("./playlistItems", {
        params: {
          playlistId: id,
          part: "snippet,contentDetails",
        },
      });
      setFirstVideo(data.data.items[0].snippet.resourceId.videoId);
      setPlaylistId(data.data.items[0].snippet.playlistId);
    } catch (error) {
      console.log(error.response);
    }
  }
  useEffect(() => {
    getPlaylistData();
  }, []);
  return (
    <div
      className="singlePlaylistClosed"
      onMouseOver={handleHover}
      onMouseOut={handler}
      onClick={handleRedirection}
    >
      <div className="thumbnailClosed">
        <div className={hiddenClass ? "showDiv" : "hidden"}>Play All</div>
        <img src={imgUrl} alt="playslist" />
        <span>{itemCount} Videos</span>
      </div>
      <div className="playlistClosed-Info">
        <span className="playlistClosedTitle">{title}</span>
        <span>View full Playlist</span>
      </div>
    </div>
  );
};
