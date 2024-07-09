import mongoose  from "mongoose";

const Connection= async (username="myuser",password="codebypanther")=>{
    const URL=`mongodb+srv://${username}:${password}@docsproject.esrunuj.mongodb.net/?retryWrites=true&w=majority&appName=DocsProject`
    
    try{
        await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
        console.log("Database connected successfully!")
    }
    catch(error){
        console.log("Error while connecting with the databases",error)
    }
}


export default Connection