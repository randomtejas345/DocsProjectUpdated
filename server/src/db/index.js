import mongoose  from "mongoose";

const Connection= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        // await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
        console.log("Database connected successfully!")
    }
    catch(error){
        console.log("Error while connecting with the databases",error)
    }
}


export default Connection