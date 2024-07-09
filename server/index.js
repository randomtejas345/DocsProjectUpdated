import { Server } from "socket.io";
import http from "http";
import Connection from "./databases/db.js";

import {getDocument,UpdateDocument} from "./controller/document-controller.js"

Connection();
const PORT = 9000;

// Create a basic HTTP server
const server = http.createServer();


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Connected");
 
 socket.on("get-document",async (documentId)=>{
        
        const data="";
        const document=await getDocument(documentId);
        socket.join(documentId);
        socket.emit("load-document",document.data);

        
        socket.on("send-changes",delta=>{
          // console.log("cooonecccted");
          // console.log(delta);
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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import { Server } from "socket.io";

// const PORT=9000;

// const io=new Server(PORT,{
//     cors:{
//         origin:"http://localhost:3000",
//         methods:["GET","POST"]
//     }
// });

// io.on("connection",socket=>{
//     console.log("Connected");
// })