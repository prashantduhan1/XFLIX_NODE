const joi=require("joi");
const allowedGenres = ['Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All'];


const schema=joi.object().keys({
    videoId: joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
    title:joi.string(),
    genre: joi.alternatives().try(
        joi.string().valid('Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All'),
        joi.string().pattern(/^(Education|Sports|Movies|Comedy|Lifestyle|All)(,(Education|Sports|Movies|Comedy|Lifestyle|All))*$/)),
    sortBy:joi.string().valid('releaseDate','viewCount'),
    contentRating:joi.string().valid('Anyone', '7+', '12+', '16+', '18+', 'All')

})
const validateVideoId=(req,res,next)=>{
    const { videoId }=req.params;
    const data={ videoId }
    const result=schema.validate(data);
    if(result.error)
    {
        return res.status(400).json({code:400,message:"id must be a valid mongo Id"});
    }
    next();
}
const validateVideoQuery=(req,res,next)=>{
    const { sortBy,title,genre,contentRating }=req.query;
    const data= { sortBy,title,genre,contentRating };
    
    const result=schema.validate(data);

    if(result.error)
    {
        return res.status(400).json({code:400,message:result.error.message});
    }
    next();
}
module.exports={ validateVideoId,validateVideoQuery}
