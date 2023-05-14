const Videos = require("../models/videos.models");
const VideosService = require("../service/videos.service");
const VideosServiceInstance = new VideosService();

const postVideos = async (req, res) => {
  try {
    console.log(req.body)
    const newVideo = new Videos(req.body);
    const result = await VideosServiceInstance.createNewVideo(newVideo);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(req.body);
  }
};
const getAllVideos = async (req, res) => {
  const { sortBy } = req.query;
  const { title, contentRating, genres } = req.query;
  try {
    let videos = await VideosServiceInstance.findAllVideos();
    if (sortBy) {
      if (req.query.sortBy == "viewCount") {
        videos = videos.sort((a, b) => {
          return a.viewCount - b.viewCount;
        });
      } else if (req.query.sortBy === "releaseDate") {
        function parseDate(dateStr) {
          const parts = dateStr.split(" ");
          const month = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].indexOf(parts[1]);
          const year = parseInt(parts[2]);
          const day = parseInt(parts[0]);
          return new Date(year, month, day);
        }
        videos = videos.sort(
          (a, b) => parseDate(b.releaseDate) - parseDate(a.releaseDate)
        );
      }
    }
    if (title || contentRating || genres) {
      let videoList1 = [...videos];
      if (title) {
        videoList1 = videoList1.filter((a) =>
          a.title.toLowerCase().includes(title.toLowerCase())
        );
      }
      if (contentRating) {
        videoList1 = videoList1.filter(
          (a) => a.contentRating === contentRating
        );
      }
      if (genres) {
        if (genres != "All") {
          videoList1 = videoList1.filter((a) =>
            genres.split(",").includes(a.genre)
          );
        } else videoList1 = [...videoList1];
      }
      videos = [...videoList1];
    }

    res.status(200).send({ videos: videos });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};
const getVideoWithId = async (req, res) => {
  let { videoId } = req.params;
  try {
    let video = await VideosServiceInstance.findVideoWithId(videoId);
    res.status(200).json(video);
  } catch (e) {
    res
      .status(e.statusCode)
      .json({
        message: "No video found with matching id",
        code: e.statusCode,
        stack: e.message,
      });
  }
};
const handleVotes = async (req, res) => {
  console.log(req.body);
  const { vote, change } = req.body;
  const { videoId } = req.params;

  try {
    let result = await VideosServiceInstance.updateVotes(vote, videoId);
    if (result) {
      res.status(204).end();
    }
  } catch (e) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
const handleViews = async (req, res) => {
  try {
    const { videoId } = req.params;
    let result = await VideosServiceInstance.updateViews(videoId);
    if (result) {
      res.status(204).end();
    }
  } catch (e) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
module.exports = {
  postVideos,
  getAllVideos,
  getVideoWithId,
  handleVotes,
  handleViews,
};
