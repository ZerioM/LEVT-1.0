import { Injectable } from '@angular/core';
import { Place } from '../Interfaces/Place';
import { Post } from '../Interfaces/Post';
import { HttpClient } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  newPost(place: Place) {
    let newPost: Post = { postID: null, _activityID:null, _placeID: place.placeID, detail: "", activityName:"", place: place, images:[] }

    return newPost;
  }

  async savePost(post: Post){

    //Abfragen, ob postID == null, dann newPost aufrufen, sonst updatePost aufrufen
    if(post.postID == null){
      await this.http.post("http://levt.test/newPost", post).toPromise().then((loadedData: Post) => {
        console.log(loadedData);
        console.log("New Post in DB inserted");
        post = loadedData;      
      }, error => {
        console.log(error);
      });
    } else {
      await this.http.post("http://levt.test/updatePost", post).toPromise().then((loadedData: Post) => {
        console.log(loadedData);
        console.log("Post with ID: ");
        console.log(post.postID);
        console.log(" in DB updated");
        post = loadedData;
      }, error => {
        console.log(error);
      });
    }
    
    return post;
  }


}
