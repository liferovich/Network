import fileUpload from "express-fileupload";

export interface GalleryResponse {
  files: fileUpload.FileArray
}
