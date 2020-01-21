import { Injectable } from '@angular/core';
import { Place } from '../Interfaces/Place';
import { Post } from '../Interfaces/Post';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';
import { User } from '../Interfaces/User';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public updatePostWorks: boolean = true;

  constructor(private http: HttpClient, private toastController: ToastController) { }

  newPost(place: Place) {
    let newPost: Post = { postID: null, _activityID:null, _placeID: place.placeID, detail: "", activityName:"", iconName:"" , placeName: place.placeName, _countryID: place._countryID, images:[] }

    return newPost;
  }

  async savePost(post: Post, url: string, loggedInUser: User){
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};

    //Abfragen, ob postID == null, dann newPost aufrufen, sonst updatePost aufrufen
    if(post.postID == null){
      await this.http.post(url+"/newPost", post, loginHeaders).toPromise().then((loadedData: Post) => {
        console.log(loadedData);
        if(loadedData == null){
          this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
          this.updatePostWorks = true;
        } else {
        console.log("New Post in DB inserted");
        post.postID = loadedData.postID;
        post.iconName = loadedData.iconName;
        this.updatePostWorks = true; 
        }     
      }, error => {
        console.log(error);
        this.updatePostWorks = false;
      });
    } else {
      await this.http.post(url+"/updatePost", post, loginHeaders).toPromise().then((loadedData: Post) => {
        console.log(loadedData);
        if(loadedData == null){
          this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
          this.updatePostWorks = false;
        } else {
        console.log("Post with ID: ");
        console.log(post.postID);
        console.log(" in DB updated");
        post.postID = loadedData.postID;
        this.updatePostWorks = true;
        }
      }, error => {
        console.log(error);
        this.updatePostWorks = false;
      });
    }

  }

  async deletePost(post: Post, url: string, loggedInUser: User){
    let isDeleted = false;
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};

    await this.http.post(url+"/deletePost", post, loginHeaders).toPromise().then((loadedData: boolean) => {
      console.log(loadedData);
      if(loadedData == null){
        this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
      } else {
      console.log("Post in DB deleted");
      isDeleted = loadedData; 
      }     
    }, error => {
        console.log(error);
    });


    return isDeleted;
  }

  async presentGeneralToast(msg: string, dur: number){
    const toast = await this.toastController.create({
      message: msg,
      duration: dur
    });
    toast.present();
  }

}
