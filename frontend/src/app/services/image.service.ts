import { Injectable, DefaultIterableDiffer } from '@angular/core';
import { Image } from '../Interfaces/Image';
import { DataService } from './data.service';
import { Post } from '../Interfaces/Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {



  constructor(private http: HttpClient) { }

  newImage(post: Post) {
    let image = { imageID: null, _postID: post.postID, imgSrc: null, date: null, coordinateX: null, coordinateY: null}
    return image;
  }

 async uploadImage(imageString:string, post: Post){
   let image:Image;
  
   image={imageID:null,_postID:post.postID,imgSrc:null,date:null,coordinateX:null, coordinateY:null}


    const blob = await fetch(imageString).then(r => r.blob());
    

    const formData = new FormData();
    formData.append('picUpload', blob);
    formData.append('data',JSON.stringify(image));

    const httpOptions= {headers:new HttpHeaders({'enctype':'multipart/form-data;'})};

    await this.http.post("https://flock-1427.students.fhstp.ac.at/backend/public/uploadImage", formData,httpOptions).toPromise().then((loadedData: Image) => {
        console.log(loadedData);
        console.log("New Image in DB inserted");
        image.imageID = loadedData.imageID;
        image.imgSrc = loadedData.imgSrc      
      }, error => {
        console.log(error);
      });

      return image;
 
  }

  async deleteImage(image: Image){
    let isDeleted;

    await this.http.post("https://flock-1427.students.fhstp.ac.at/backend/public/deleteImage", image).toPromise().then((loadedData: boolean) => {
      console.log(loadedData);
      console.log("Image in DB deleted");
      isDeleted = loadedData;      
    }, error => {
        console.log(error);
    });


    return isDeleted;
  }

  


}