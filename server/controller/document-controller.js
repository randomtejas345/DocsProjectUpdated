import Document from "../schema/documentSchema.js"


export const getDocument=async (id)=>{
    if(id!==null){
         const document= await Document.findById(id);
         if(document) return document;

         return await Document.create({_id:id,data:""})
    }
}


export const UpdateDocument=async (id,data)=>{
    return await Document.findByIdAndUpdate(id,{data})
}