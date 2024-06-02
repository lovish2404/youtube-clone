const axios = require("axios");

const options = {
  method: "GET",
  url: "https://youtube-media-downloader.p.rapidapi.com/v2/search/videos",
  params: {
    keyword: "Rick Astley",
  },
  headers: {
    "X-RapidAPI-Key": "b798b76f04msh09d48a3f645806dp1b5f10jsn615d8e61f22f",
    "X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
