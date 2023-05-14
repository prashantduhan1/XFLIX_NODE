const express=require("express");
const app=express();
const NODE_ENV=8082;
const routes=require("./routes/video.routes");
const DB_URI="mongodb+srv://prashantduhan01:Primary%40$007@cluster0.p30b1ru.mongodb.net/?retryWrites=true&w=majority";
const mongoose=require("mongoose")
require('dotenv').config();
const cors = require("cors");
const config = require('./config.json');
const port= process.env.PORT_MAIN || config.port
mongoose
.connect("mongodb+srv://prashantduhan01:Primary%40$007@cluster0.p30b1ru.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("connected to DB"))
.catch((e)=> console.log("Failed to connect to db",e));
console.log("1st step done");

app.use(cors());
app.use(express.json());
app.use("/v1/videos",routes);

app.listen(port,()=>{
    console.log("listening at PORT - ", port);
})
