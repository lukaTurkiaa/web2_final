import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

const connect = async ()=>{ 
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};
mongoose.connection.on("dissconected", ()=>{
    console.log("mongoDB disconnected:")
});
mongoose.connection.on("conected", ()=>{
    console.log("mongoDB connected:")
});
app.get("/users", (req,res)=>{
    res.send("hello");
});
    
//middlewears
//app.use(cors);
app.use(cookieParser());
app.use(express.json());


app.use("/auth",authRoute);
app.use("/users",usersRoute);
app.use("/hotels",hotelsRoute);
app.use("/rooms",roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.Message || "Something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        Message:errorMessage,
        stack: err.stack
    });
});

app.listen(8800,()=>{
    connect();
    console.log("Connected to Backend.")
});