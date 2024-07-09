
import  Box  from "@mui/material/Box";
import React from "react";
import { useEffect ,useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styled  from "@emotion/styled";

import { io } from "socket.io-client";

import { useParams } from "react-router-dom";

const Component= styled.div`
background: #F5F5F5;
`



const toolbarOptions=[
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  


function Editor(){
    const [socket,setSocket]=useState("");
    const [quill, setQuill]=useState("");
    const {id} =useParams();

    useEffect(()=>{
        const quillServer= new Quill("#container",{
            modules: {
                toolbar:toolbarOptions,
              },
              placeholder: 'Compose an epic...',
            theme:'snow',
        })
        quillServer.setText("Loading the document.....");
        quillServer.disable();
        setQuill(quillServer);
        // const socketServer=io("http://localhost:9000");
        // setSocket(socketServer);

        // return ()=>{
        //     socketServer.disconnect();
        // }

    },[])

    useEffect(()=>{
        const socketServer=io("http://localhost:9000");
        setSocket(socketServer);

        return ()=>{
            socketServer.disconnect();
        }
    },[]);

    useEffect(()=>{

        if(socket!==null&&quill!==null){
           
            const handleChange= (delta,oldData,source)=>{
                if(source!=="user") return;
                socket&& socket.emit("send-changes",delta);
            }

            quill&&quill.on("text-change",handleChange);

            return ()=>{
                quill&&quill.off("text-change",handleChange);
            }

        }
        //  if(!quill){console.log("Quill is not initialized");}
        //  else{

        //      quill.on("text-change",(delta,oldData,source)=>{
        //          if(source!="user") return;
        //         console.log(delta);
        //         console.log(oldData);
        //         console.log(source);
        //      })

        //   }
    },[quill,socket])

    useEffect(()=>{

        if(socket!==null&&quill!==null){
           
            const handleChange= (delta)=>{
                 quill.updateContents(delta);
            }

            socket&&socket.on("receive-changes",handleChange);

            return ()=>{
                socket&&socket.off("receive-changes",handleChange);
            }

        }

    },[quill,socket])

    useEffect(()=>{

        if(socket!==null&&quill!==null){
           
            socket&&socket.once("load-document",document=>{
                quill&&quill.setContents(document);
                quill&&quill.enable();

            })
            socket&&socket.emit("get-document",id); //fetch document
            
    
        }

    },[quill,socket,id])

    useEffect(()=>{
        if(socket!==null&&quill!==null){
            const interval=setInterval(()=>{
                socket.emit("save-document",quill.getContents())
            },2000);

            return ()=>{
                clearInterval(interval);
            }


        }
    },[socket,quill])

    return <Component>
        <Box class="container" id='container'></Box>
    </Component> 

}


export default Editor;