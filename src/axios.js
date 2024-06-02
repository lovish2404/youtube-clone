import axios from "axios";
const Options = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyBQI7VHVgqRqfS9qhtfTuoGvDYKEkM5o4M",
    maxResults: "3",
    regionCode: "US",
  },
});

export default Options;
