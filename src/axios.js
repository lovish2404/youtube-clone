import axios from "axios";
const Options = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyBSMzP87WRDC4EAElRAKgrsq3lfXFyLSPg",
    maxResults: "3",
    regionCode: "US",
  },
});

export default Options;
