import { Injectable } from '@angular/core';
import { Message } from '../Interfaces/Message';
import { Messages } from '../Interfaces/Messages';
import { User } from '../Interfaces/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserMessages } from '../Interfaces/UserMessages';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {


  constructor(private http: HttpClient, private toastController: ToastController) { }

  public newMessage(fromUser: User,toUser: User){
    let message: Message;

    message = {
      messageID: null,
      fromUserID: fromUser.userID,
      fromUsername: fromUser.username,
      toUserID: toUser.userID,
      createdAt: null,
      msg: ''
    }
  
    return message;
  }

  async saveMessage(url: string, message: Message, loggedInUser: User){
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};

    await this.http.post(url+"/saveMessage", message, loginHeaders).toPromise().then((loadedData: Message) => {
      console.log(loadedData);
      console.log("Loaded Messages from DB");
      message.messageID = loadedData.messageID;
    }, error => {
      console.log(error);
    });

    return message.messageID;
  }

  async loadMessages(messages: Messages, url: string, loggedInUser: User, chatUser: User){
    //let messages: Messages;
    let postData={
      "fromUserID": loggedInUser.userID,
      "toUserID": chatUser.userID
    }
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};

    
    await this.http.post(url+"/loadMessages", postData, loginHeaders).toPromise().then((loadedData: Messages) => {
      console.log(loadedData);
      console.log("Loaded Messages from DB");
      messages.messages = loadedData.messages;
    }, error => {
      console.log(error);
    });

    return messages;
  }

  async loadUserChatted(currentUserMessages: UserMessages, loggedInUser: User, url: string){
    const loginHeaders = {headers: new HttpHeaders({'Sessionid': loggedInUser.sessionID})};
    await this.http.post(url+"/loadUserChats", loggedInUser, loginHeaders).toPromise().then((loadedData: UserMessages) => {
      console.log(loadedData);
      if(loadedData == null){
        this.presentGeneralToast("Your session is expired. Please exit without saving, go to login page and login again!",5000);
      } else {
      console.log("Loaded Messages from DB");
      currentUserMessages.userMessages = loadedData.userMessages;
      }
    }, error => {
      console.log(error);
    });
  }

  async presentGeneralToast(msg: string, dur: number){
    const toast = await this.toastController.create({
      message: msg,
      duration: dur
    });
    toast.present();
  }

}
