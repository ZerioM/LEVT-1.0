import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Interfaces/User';
import { ToastController } from '@ionic/angular';
import { Md5 } from 'ts-md5';
import { Bookmark } from '../Interfaces/Bookmark';
import { BoolObj } from '../Interfaces/BoolObj';

import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //login
  public wantsToRegister=false;
  public wantsToLogin = false;
  public userLoggedOut = true;
  public userRecentlyLoggedInCreateNewJourney = false;
  public userRecentlyLoggedInOrOutLoadUserJourneys = false;
  public loginAtTab2OrTab5 = false;
  public wasOnSettingsPage = false;

  //ForgotPW
  public wantsToResetPw:boolean = false;
  
  //register
  public secondPw: string;
  public passwordIsTheSame: boolean = true;
  public emailFormatIsCorrect: boolean = true;
  public usernameAvailable: boolean = true;
  public emailAvailable: boolean = true;

  


  constructor(private storage: Storage, private http: HttpClient, public toastController: ToastController) { }

  newUser(){
  let newUser:User={userID:null, username:null,_profileImageID:null, userImgSrc:null,password:null,emailAddress:null,birthday:null, _countryOfResidenceID:null,sessionID:null,explorerBadgeProgress:null,pioneerBadgeProgress:null,age:null,countryName:null, gamificationPoints:null, pwClear:null,email_verified_at:null}

  return newUser;

  }

  setHttpHeaders(loggedInUser: User, loginHeaders){
    loginHeaders = {
      headers: new HttpHeaders({
        'Sessionid': loggedInUser.sessionID,
        'Userid': loggedInUser.userID.toString()
      })
    }
  }

  async logout(loggedInUser: User, currentBookmark: Bookmark, url: string){
    this.userLoggedOut = true;
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};

    await this.http.post(url+"/logout", loggedInUser, loginHeaders).toPromise().then((loadedData: User) => {
      if(loadedData.userID == null && loadedData.sessionID == null){

        console.log("Logout hat funktioniert.");
      } else {
        console.log("Logout hat nicht funktioniert.");
        this.presentGeneralToast("Logout did not work, please try again!",5000);
      }
    }, error => {
      console.log(error);
      
    });

    loggedInUser.userID = null;
    loggedInUser.username = null;
    loggedInUser._profileImageID = null;
    loggedInUser.password = null;
    loggedInUser.emailAddress = null;
    loggedInUser.birthday = null;
    loggedInUser._countryOfResidenceID = null;
    loggedInUser.sessionID = null;
    loggedInUser.explorerBadgeProgress = null;
    loggedInUser.pioneerBadgeProgress = null;
    loggedInUser.gamificationPoints = null;
    loggedInUser.age = null;
    loggedInUser.countryName = null;
    loggedInUser.userImgSrc = null;
    loggedInUser.pwClear = null;
    loggedInUser.email_verified_at=null;

    this.storage.set("myUser", loggedInUser);

    currentBookmark._userID = null;

    this.userRecentlyLoggedInOrOutLoadUserJourneys = true;
    this.wantsToLogin = false;
  }

  async login(loggedInUser: User, currentBookmark: Bookmark,url: string){

    //loggedInUser.password = Md5.hashStr(loggedInUser.pwClear).toString();  
    loggedInUser.password = loggedInUser.pwClear;

    loggedInUser.pwClear = "";

    this.secondPw = '';
    
    await this.http.post(url+"/loginUser", loggedInUser).toPromise().then((loadedData: User) => {
      if(loadedData.userID != null && loadedData.sessionID != null){
        loggedInUser.userID = loadedData.userID;
        loggedInUser._profileImageID = loadedData._profileImageID;
        loggedInUser.emailAddress = loadedData.emailAddress;
        loggedInUser.birthday = loadedData.birthday;
        loggedInUser._countryOfResidenceID = loadedData._countryOfResidenceID;
        loggedInUser.sessionID = loadedData.sessionID;
        loggedInUser.explorerBadgeProgress = loadedData.explorerBadgeProgress;
        loggedInUser.pioneerBadgeProgress = loadedData.pioneerBadgeProgress;
        loggedInUser.gamificationPoints = loadedData.gamificationPoints;
        loggedInUser.age = loadedData.age;
        loggedInUser.countryName = loadedData.countryName;
        loggedInUser.userImgSrc = loadedData.userImgSrc;
        loggedInUser.email_verified_at=loadedData.email_verified_at;
        

        console.log("Login hat funktioniert.");
      } else {
        console.log("Login hat nicht funktioniert.");
      }
    }, error => {
      console.log(error);
      
    });

    loggedInUser.password = '';

    this.storage.set("myUser", loggedInUser);

    currentBookmark._userID = loggedInUser.userID;

    this.userRecentlyLoggedInCreateNewJourney = true;
    this.userRecentlyLoggedInOrOutLoadUserJourneys = true;

    this.wantsToLogin = false;
  }

  userLoggedIn(loggedInUser: User){
    if(loggedInUser.userID != null && loggedInUser.sessionID != null)
    {
      return true;
    }
    return false;
  }

  goToResetPw(){
    this.wantsToResetPw = true;
    this.wantsToLogin = false;
  }

  backToLogin(){
    this.wantsToResetPw = false;
    this.wantsToLogin = true;
  }

  resetPassword(loggedInUser: User, url: string){
    //POST REQUEST HERE
  }


  //Registrierung

  async register(loggedInUser: User, url:string){

    //loggedInUser.password = Md5.hashStr(loggedInUser.pwClear).toString();  
    loggedInUser.password = loggedInUser.pwClear;

    loggedInUser.pwClear = "";

    this.secondPw = '';

    loggedInUser.gamificationPoints = 100;

    if(this.passwordIsTheSame){
      if(this.emailFormatIsCorrect){
        if(this.usernameAvailable){
          if(this.emailAvailable){
            await this.http.post(url+"/registerUser", loggedInUser).toPromise().then((loadedData: User) => {
              if(loadedData.userID != null && loadedData.sessionID != null){
                loggedInUser.userID = loadedData.userID;
                loggedInUser.sessionID = loadedData.sessionID;
        
                console.log("Login hat funktioniert.");
              } else {
                console.log("Login hat nicht funktioniert.");
              }
            }, error => {
              console.log(error);
              
            });
          
          
          } else {
            this.presentGeneralToast("This email is used by another user.",5000);
          }
        } else {
          this.presentGeneralToast("This username is already used.",5000);
        }
      } else {
        this.presentGeneralToast("The email format is not correct. Please check and try again!",5000);
      }

    } else {
      this.presentGeneralToast("The two password phrases aren't identical. Please check and try again!",5000);
    }

    loggedInUser.password = '';

    this.userRecentlyLoggedInCreateNewJourney = true;
    this.wantsToRegister = false;
    this.wantsToLogin=false;
  }

  async checkUsername(loggedInUser: User, url: string){
    //POST REQUEST IF UNIQUE

    await this.http.post(url+"/checkUsername", loggedInUser).toPromise().then((loadedData: BoolObj) => {
        console.log(loadedData);
        this.usernameAvailable = loadedData.free;
        console.log(this.usernameAvailable);
        console.log("Checked Username.");

    }, error => {
      console.log(error);
      
    });
  }

  async checkEmailAvailable(loggedInUser: User, url: string){
    await this.http.post(url+"/checkEmail", loggedInUser).toPromise().then((loadedData: BoolObj) => {
      console.log(loadedData);
      this.emailAvailable = loadedData.free;
      console.log(this.emailAvailable);
      console.log("Checked Email.");
    }, error => {
      console.log(error);
      
    });
  }

  checkPassword(loggedInUser: User){
    if(this.secondPw == loggedInUser.pwClear){
      this.passwordIsTheSame = true;
    } else {
      this.passwordIsTheSame = false;
    }
  }

  checkEmail(loggedInUser: User){
    

    if(loggedInUser.emailAddress == ''){
      this.emailFormatIsCorrect = true;
      return;
    }
    let regex = /^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(regex.test(loggedInUser.emailAddress)){
      this.emailFormatIsCorrect = true;
      console.log("Email is in correct format");
    } else {
      this.emailFormatIsCorrect = false;
      console.log("Email is not in correct format");
    }

    //POST REQUEST IF UNIQUE
    
    
  }

  goToRegistration(){
    this.wantsToRegister = true;
  }

  async presentGeneralToast(msg: string, dur: number){
    const toast = await this.toastController.create({
      message: msg,
      duration: dur
    });
    toast.present();
  }
}
