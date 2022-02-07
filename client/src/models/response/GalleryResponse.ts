import fileUpload from "express-fileupload";

export interface GalleryResponse {
  files: fileUpload.FileArray
}

export interface PhotoResponse {
  photo: {
    id: number,
    name: string,
    path: string,
    UserId: string
  }
}
export interface PhotosResponse {
  photos: [{
    id: number,
    name: string,
    path: string,
    UserId: string
  }]
}
