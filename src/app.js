import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Liked } from "./pages/liked";
import { Home } from "./pages/home";
import { Music } from "./pages/Music";
import { Subscribed } from "./pages/Subscribed";
import { SingleVideo } from "./pages/singleVideo";
import { Channel } from "./pages/channel";
import { ChannelHome } from "./components/channelPageHome";
import { ChannelPlaylist } from "./components/channelPagePlaylist";
import { ChannelCommunity } from "./components/channelPageCommunity";
import { SearchPage } from "./pages/search";
import { Gaming } from "./pages/gaming";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/liked",
    element: <Liked></Liked>,
  },
  {
    path: "/subs",
    element: <Subscribed></Subscribed>,
  },
  {
    path: "/music",
    element: <Music></Music>,
  },
  {
    path: "/video/:id",
    element: <SingleVideo></SingleVideo>,
  },
  {
    path: "/gaming",
    element: <Gaming></Gaming>,
  },
  {
    path: "/channel/:channelId",
    element: <Channel></Channel>,
    children: [
      {
        path: "/channel/:channelId/home",
        element: <ChannelHome></ChannelHome>,
      },
      {
        path: "/channel/:channelId/playlist",
        element: <ChannelPlaylist></ChannelPlaylist>,
      },
      {
        path: "/channel/:channelId/community",
        element: <ChannelCommunity></ChannelCommunity>,
      },
    ],
  },
  {
    path: "/search",
    element: <SearchPage></SearchPage>,
  },
]);
export const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
