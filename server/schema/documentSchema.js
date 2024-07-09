import mongoose from "mongoose";

const documentSchema=mongoose.Schema({
    _id:{
          type:String,
          reqired:true
    },
    data:{
        type:Object,
        required:true
    }
    
})


const document=mongoose.model("document",documentSchema);

export default document;