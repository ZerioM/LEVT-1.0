import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces/User';
import { ToastController } from '@ionic/angular';
import { Md5 } from 'ts-md5';
import { Bookmark } from '../Interfaces/Bookmark';

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

  constructor(private http: HttpClient, public toastController: ToastController) { }

  newUser(){
  let newUser:User={userID:null, username:null,_profileImageID:null, userImgSrc:null,password:null,emailAddress:null,birthday:null, _countryOfResidenceID:null,sessionID:null,explorerBadgeProgress:null,pioneerBadgeProgress:null,age:null,countryName:null, gamificationPoints:null, pwClear:null}

  return newUser;

  }

  logout(loggedInUser: User, currentBookmark: Bookmark){
    this.userLoggedOut = true;

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

    currentBookmark._userID = null;

    this.userRecentlyLoggedInOrOutLoadUserJourneys = true;
  }

  async login(loggedInUser: User, currentBookmark: Bookmark,url: string){

    // loggedInUser.pwHash = Md5.hashStr(loggedInUser.pwClear).toString();  

    // loggedInUser.pwClear = "";
    
    // await this.http.post(this.url+"/login", loggedInUser).toPromise().then((loadedData: User) => {
    //   if(loadedData.userID != null){
    //     loggedInUser.userID = loadedData.userID;
    //     console.log("Login hat funktioniert.");
    //     this.userLoggedIn = true;
    //   } else {
    //     console.log("Login hat nicht funktioniert.");
    //   }
    // }, error => {
    //   console.log(error);
      
    // });

    loggedInUser.userID = 21;
    loggedInUser.username = "lola33";
    loggedInUser._profileImageID = null;
    loggedInUser.password = null;
    loggedInUser.emailAddress = "lola@gmail.com";
    loggedInUser.birthday = new Date("2001-09-04");
    loggedInUser._countryOfResidenceID = "DE";
    loggedInUser.sessionID = "fsdfsadfsadfsdfsd";
    loggedInUser.explorerBadgeProgress = 0;
    loggedInUser.pioneerBadgeProgress = 0;
    loggedInUser.gamificationPoints = 0;

    loggedInUser.age = 18;
    loggedInUser.countryName = "Germany";
    loggedInUser.userImgSrc = "";
    loggedInUser.pwClear = null;

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
    if(this.passwordIsTheSame){
      if(this.emailFormatIsCorrect){



      } else {
        this.presentGeneralToast("The email format is not correct. Please check and try again!",5000);
      }

    } else {
      this.presentGeneralToast("The two password phrases aren't identical. Please check and try again!",5000);
    }

    this.wantsToRegister = false;
    this.wantsToLogin=false;
  }

  checkUsername(loggedInUser: User){
    //POST REQUEST IF UNIQUE
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
