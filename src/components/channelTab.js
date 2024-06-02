import React from "react";
import { NavLink } from "react-router-dom";

export const ChannelTab = ({ id }) => {
  return (
    <div className="channelTab">
      <div className="channelTabHead">
        <NavLink
          className={({ isActive }) =>
            isActive ? "channelTabLink activeTab " : "channelTabLink"
          }
          to={`/channel/${id}/home`}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "channelTabLink activeTab " : "channelTabLink"
          }
          to={`/channel/${id}/playlist`}
        >
          Playlist
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "channelTabLink activeTab " : "channelTabLink"
          }
          to={`/channel/${id}/community`}
        >
          Community
        </NavLink>
      </div>
      <div className="tabDivider"></div>
    </div>
  );
};
