import mongoose, { Schema } from "mongoose";


const documentSchema= new Schema({
    _id:{
          type:String,
          reqired:true
    },
    data:{
        type:Object,
        required:true
    }
    
},{timestamps:true})


const document=mongoose.model("document",documentSchema);

export default document;