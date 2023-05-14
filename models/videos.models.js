const mongoose = require("mongoose")

const videosSchema=new mongoose.Schema({
    votes:{
        upVotes: { type: Number, default: 0 },
        downVotes: { type: Number, default: 0 }
    },
    previewImage: {
        type: String, required: true
    },
    viewCount:{
        type: Number, default:0
    },
    videoLink:{
        type:String, required: true
    },
    title:{
        type:String, required: true
    },
    genre:{
        type:String, required: true
    },
    contentRating:{
        type:String, required: true
    },
    releaseDate:{
        type:String, required: true
    }
},{
    timestamps:false
});

const videosModel=mongoose.model("xflix", videosSchema);

module.exports=videosModel;