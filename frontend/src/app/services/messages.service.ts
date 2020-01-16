import { Injectable } from '@angular/core';
import { Message } from '../Interfaces/Message';
import { Messages } from '../Interfaces/Messages';
import { User } from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {


  constructor() { }

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

  async saveMessage(url: string, message: Message){

    return message.messageID;
  }

  async loadMessages(url: string, fromUser: User, toUser: User){
    let messages: Messages;
    
    //POST request here

    return messages;
  }

}
