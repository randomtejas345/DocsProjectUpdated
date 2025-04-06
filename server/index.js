import { Server } from "socket.io";
import express from "express"
import Connection from "./src/db/index.js";
import {createServer} from "http"
import {getDocument,UpdateDocument} from "./src/controllers/document.controller.js"
import "dotenv/config"
import cors from "cors"

Connection()
.then(()=>{
  console.log("MongoDB connected successfully!!!")
})
.catch((err)=>{
  console.log("Error connecting MongoDB!!!")
});

const app=express()
// Create a basic HTTP server
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

const server = createServer(app);


const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"]
  }
});



io.on("connection", (socket) => {
  console.log("Connected");
 
 socket.on("get-document",async (documentId)=>{
        
        const data="";
        const document=await getDocument(documentId);
        // if(!document){
        //   console.log("")
        // } 
      

        socket.join(documentId);
        socket.emit("load-document",document.data);

        
        socket.on("send-changes",delta=>{
          socket.broadcast.to(documentId).emit("receive-changes",delta);
        })
        
        socket.on("save-document",async data=>{
          await UpdateDocument(documentId,data);
        })
 })



  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});





server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
