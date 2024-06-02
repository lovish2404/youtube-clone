import React, { useEffect } from "react";
import { useState } from "react";
import customAxios from "../axios";
import { useParams, Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { useGlobalContext } from "../context";
import { Sidebar } from "../components/sidebar";
import { ChannelOverview } from "../components/channelOverview";
import { Loading } from "../components/loading";
import { ChannelTab } from "../components/channelTab";
export const Channel = () => {
  const [loader, setLoader] = useState(true);
  const [channelImgUrl, setChannelImgUrl] = useState("");
  const { channelId } = useParams();
  const [brandingSettings, setBrandingSettings] = useState({});
  const [snippet, setSnippet] = useState({});
  const [statistics, setStatistics] = useState({});
  const [uploads, setUploads] = useState("");
  const fetchChannelDetails = async () => {
    try {
      const response = await customAxios.get("/channels", {
        params: {
          id: channelId,
          part: "brandingSettings,contentDetails,contentOwnerDetails,id,localizations,snippet,statistics,status,topicDetails",
        },
      });

      const { snippet, brandingSettings, statistics, contentDetails } =
        response.data.items[0];
      setChannelImgUrl(brandingSettings.image.bannerExternalUrl);
      setBrandingSettings(brandingSettings);
      setStatistics(statistics);
      setSnippet(snippet);
      setUploads(contentDetails.relatedPlaylists.uploads);
      console.log(contentDetails.relatedPlaylists.uploads);
    } catch (error) {
      console.log(error.response);
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchChannelDetails();
  }, []);
  if (loader) {
    return (
      <>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Loading />
      </>
    );
  }
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="channelOwnerDetails">
        <div className="channelBanner">
          <img src={channelImgUrl} alt="channelImg" />
        </div>
        <ChannelOverview
          {...brandingSettings}
          {...snippet}
          {...statistics}
        ></ChannelOverview>
        <ChannelTab id={channelId}></ChannelTab>
        {uploads ? <Outlet context={[uploads]}></Outlet> : <div>HELLLO</div>}
      </div>
    </>
  );
};
