const xflix=require("../models/videos.models");
const { ObjectId }=require("mongodb")

class ApiError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }

class VideosService{

    createNewVideo = async (data) => {
        const video=new xflix(data);
        const result=await video.save();
        return result;
    }
    findAllVideos=async ()=>{
        return await xflix.find({})
    }
    findVideoWithId=async(id)=>{
            const objectId =new  ObjectId(id);
            const result = await xflix.findOne({ _id: objectId });
            if (!result) {
              throw new ApiError(`No video found with matching id`, 404);
            } else {
              return result;
            }
        
      
   }
   updateVotes=async(vote,id)=>{
    let update;
    let listOfVideos=await xflix.findById({_id:id});
    if(!listOfVideos)
    {
      throw new ApiError(`No video found with matching id`, 404);
    }
    
    if(vote==="upVote")
    {
      update = { $inc: { 'votes.upVotes': 1 } };
    }else if(vote==="downVote")
    {
      update = { $inc: { 'votes.downVotes': 1 } };
    }
   
    const result=await xflix.updateOne({_id:id},update);
    return result;

   }
   updateViews=async(id)=>{
    let listOfVideos=await xflix.findById({_id:id});
    if(!listOfVideos)
    {
      throw new ApiError(`No video found with matching id`, 400);
    }
    const update = { $inc: { viewCount: 1 } };
    const result=await xflix.updateOne({_id:id}, update);
    return result
   }
   
}
module.exports=VideosService;