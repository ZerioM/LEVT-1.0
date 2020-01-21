import { Injectable } from '@angular/core';
import { User } from '../Interfaces/User';
import { Bookmark } from '../Interfaces/Bookmark';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Journeys } from 'src/app/Interfaces/Journeys';
import { DataService } from './data.service';
import { Journey } from '../Interfaces/Journey';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient, private toastController: ToastController) { }

  async setBookmark(loggedInUser: User, currentBookmark: Bookmark, currentJourney: Journey, url: string){
    currentBookmark._userID = loggedInUser.userID;
    currentBookmark._journeyID = currentJourney.journeyID;
    let postData = currentBookmark;
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};
    await this.http.post(url+"/newBookmark", postData, loginHeaders).toPromise().then((loadedData: Bookmark) => {
      if(loadedData == null){
        this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
      } else {
      currentBookmark.bookmarkID = loadedData.bookmarkID;
      console.log(currentBookmark);
      console.log("Post funktioniert");
      }
    }, error => {
      console.log(error);
    });    
  }

  async unsetBookmark(loggedInUser: User, currentBookmark: Bookmark, currentJourney: Journey, url: string){
    currentBookmark._userID = loggedInUser.userID;
    currentBookmark._journeyID = currentJourney.journeyID;
    let postData = currentBookmark;
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};
    await this.http.post(url+"/deleteBookmark", postData, loginHeaders).toPromise().then((loadedData: Bookmark) => {
      if(loadedData == null){
        this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",10000);
      } else {
      currentBookmark.bookmarkID = loadedData.bookmarkID;
      console.log(currentBookmark);
      console.log("Post funktioniert");
      }
    }, error => {
      console.log(error);
    });    
  }

  async bookmarkExists(currentBookmark: Bookmark, currentJourney: Journey, url: string, loggedInUser: User){
    currentBookmark._userID = loggedInUser.userID;
    currentBookmark._journeyID = currentJourney.journeyID;
    let postData = currentBookmark;

    console.log(loggedInUser.userID);
    console.log(currentJourney.journeyID);

    let bookmarked: boolean = false;

    await this.http.post(url+"/proveBookmarkExists", postData).toPromise().then((loadedData: Bookmark) => {
      console.log(loadedData);
      currentBookmark.bookmarkID = loadedData.bookmarkID;
      console.log(currentBookmark);
      console.log("Post funktioniert");
    }, error => {
      console.log(error);
    });
  }

  loadBookmarkedPosts(currentJourneys: Journeys, url: string, loggedInUser: User):number{

    //VIELLEICHT NOCH ÜBERPRÜFEN DURCH SESSION-KEY

    this.http.post(url+"/allBookmarkedJourneys", loggedInUser).toPromise().then( (loadedData: Journeys) => {
      if(loadedData!=null){
        console.log("Json file wurde geladen");
        console.log(loadedData);
        currentJourneys.journeys = loadedData.journeys;

        console.log(currentJourneys);
        return 1;
      }else{
        // loadTopPosts();
        // this.presentGeneralToast("We couldn`t find any results for your entered search. Please try again!",5000);
        console.log("null per http geladen");
        return 0;
        }
    }, error => {
      console.log(error);
      console.info(error);
      //errorMsg = error;
      //this.presentGeneralToast("There was a problem with the connection to the database. Please try again later!",5000);
      return 2;
    }
    );
    return 3;
  }

  async presentGeneralToast(msg: string, dur: number){
    const toast = await this.toastController.create({
      message: msg,
      duration: dur
    });
    toast.present();
  }
  
}
