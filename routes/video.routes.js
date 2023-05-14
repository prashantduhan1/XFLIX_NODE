const router=require("express").Router();
const { postVideos,getAllVideos,getVideoWithId,handleVotes,handleViews }=require("../controller/video.controller");
const { validateVideoId, validateVideoQuery }=require("../validator/videos.validator");

router.post("/",postVideos);
router.get("/",validateVideoQuery,getAllVideos)

router.get("/:videoId",validateVideoId,getVideoWithId)
router.patch("/:videoId/votes",validateVideoId,handleVotes)
router.patch("/:videoId/views",validateVideoId,handleViews)


module.exports=router;