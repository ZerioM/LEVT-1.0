import { Injectable, DefaultIterableDiffer } from '@angular/core';
import { Image } from '../Interfaces/Image';
import { DataService } from './data.service';
import { Post } from '../Interfaces/Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Interfaces/User';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public updateImageWorks: boolean = true;

  constructor(private http: HttpClient, private toastController: ToastController) { }

  newImage(post: Post) {
    let image = { imageID: null, _postID: post.postID, imgSrc: null, date: null, coordinateX: null, coordinateY: null}
    return image;
  }

 async uploadImage(imageString:string, post: Post, url: string, loggedInUser: User){

   let image:Image;
  
   if(post != null){
    image={imageID:null,_postID:post.postID,imgSrc:null,date:null,coordinateX:null, coordinateY:null};
   } else {
    image={imageID:null,_postID:null,imgSrc:null,date:null,coordinateX:null, coordinateY:null};
   }

    const blob = await fetch(imageString).then(r => r.blob());

    const formData = new FormData();
    formData.append('picUpload', blob);
    formData.append('data',JSON.stringify(image));

    const httpOptions= {headers:new HttpHeaders({'enctype':'multipart/form-data', 'Sessionid': loggedInUser.sessionID})};

   if(image.imageID == null){
      await this.http.post(url+"/uploadImage", formData, httpOptions).toPromise().then((loadedData: Image) => {
        console.log(loadedData);
        if(loadedData == null){
          this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
          this.updateImageWorks = true;
        } else {
        console.log("New Image in DB inserted");
        image.imageID = loadedData.imageID;
        image.imgSrc = loadedData.imgSrc  
        this.updateImageWorks = true; 
        }   
      }, error => {
        console.log(error);
        this.updateImageWorks = false;
      });
    }else{
      await this.http.post(url+"/updateImage", formData, httpOptions).toPromise().then((loadedData: Image) => {
        console.log(loadedData);
        if(loadedData == null){
          this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
          this.updateImageWorks = false;
        } else {
        console.log("Post with ID: ");
        console.log(image.imageID);
        console.log(" in DB updated");
        image.imageID = loadedData.imageID;
        this.updateImageWorks = true;
        }
      }, error => {
        console.log(error);
        this.updateImageWorks = false;
      });
    }

    return image;
 
  }

  async deleteImage(image: Image, url: string, loggedInUser: User){
    let isDeleted;
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};

    await this.http.post(url+"/deleteImage", image, loginHeaders).toPromise().then((loadedData: boolean) => {
      console.log(loadedData);
      if(loadedData == null){
        this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
      } else {
      console.log("Image in DB deleted");
      isDeleted = loadedData;
      }      
    }, error => {
        console.log(error);
    });


    return isDeleted;
  }

  async deleteImageByID(imageID: number, url: string, loggedInUser: User){
    let isDeleted;
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};

    await this.http.post(url+"/deleteImage", imageID, loginHeaders).toPromise().then((loadedData: boolean) => {
      console.log(loadedData);
      if(loadedData == null){
        this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
      } else {
      console.log("Image in DB deleted");
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