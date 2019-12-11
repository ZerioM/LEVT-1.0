import { Injectable } from '@angular/core';
import { Image } from '../Interfaces/Image';
import { DataService } from './data.service';
import { Post } from '../Interfaces/Post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {



  constructor(private http: HttpClient) { }

  newImage(post: Post) {
    let image = { imageID: null, _postID: post.postID, imgSrc: null, date: null, coordinateX: null, coordinateY: null}
    return image;
  }

 uploadImage(imageString:string, post: Post, metaData: any){
   let image:Image;
  
   image={imageID:null,_postID:post.postID,imgSrc:null,date:null,coordinateX:null, coordinateY:null}



  return image;
 }


}