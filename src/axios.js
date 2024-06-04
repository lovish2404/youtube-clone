import axios from "axios";
const Options = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyDBfYvUDrOa1V1vYfnXjhL5OdZ9qqFyGEc",
    maxResults: "5",
    regionCode: "US",
  },
});

export default Options;
