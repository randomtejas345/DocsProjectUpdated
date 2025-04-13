import Document from "../models/document.model.js";

export const getDocument = async (id) => {
  try {
    if (id !== null) {
      const document = await Document.findById(id);
      if (document) return document;
      console.log("Creating id");
      return await Document.create({ _id: id, data: "" });
    }
  } catch (err) {
    console.log("Missed try catch in async operation Haha:)");
    return null;
  }
};

export const UpdateDocument = async (id, data) => {
  try {
    return await Document.findByIdAndUpdate(id, { data });
  } catch (err) {
    console.log("Error while updating the document");
    return null;
  }
};
