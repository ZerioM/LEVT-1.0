import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { IonContent, NavController, AlertController, LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, AfterViewChecked{

 //public  currentUser: string=this.data.loggedInUser.username;
 public newMsg:string='';
 public currentTime: number = new Date().getTime();

  @ViewChild(IonContent,{read: false, static: false}) content: IonContent


  constructor(private data: DataService, private messagesService: MessagesService,navCtrl: NavController, private router: Router,private alertController: AlertController, private loadingController: LoadingController) {}

  ngOnInit() {

    this.data.currentMessage = this.messagesService.newMessage(this.data.loggedInUser,this.data.chatUser);

    this.data.currentMessages.messages.push({
        messageID: null,
        fromUserID: this.data.loggedInUser.userID,
        fromUsername: this.data.loggedInUser.username,
        toUserID: this.data.chatUser.userID,
        createdAt: 1554090856000,
        msg: 'Hab dich lieb'
    });
    this.data.currentMessages.messages.push({
      messageID: null,
      fromUserID: this.data.chatUser.userID,
      fromUsername: this.data.chatUser.username,
      toUserID: this.data.loggedInUser.userID,
      createdAt: 1554090856000,
      msg:'Ich dich auch'
    });
    this.data.currentMessages.messages.push({
      messageID: null,
      fromUserID: this.data.loggedInUser.userID,
      fromUsername: this.data.loggedInUser.username,
      toUserID: this.data.chatUser.userID,
      createdAt:1554090856000,
      msg:'<3 <3 <3'
    });
  }

  async ngAfterViewChecked(){
    if(this.currentTime <= (new Date().getTime()-3000)){
      this.currentTime = new Date().getTime();
      console.log("Checking for updates...");
      //this.data.currentMessages = await this.messagesService.loadMessages(this.data.url,this.data.loggedInUser,this.data.chatUser);
    } 
  }

  messages = [
    {
      user: this.data.loggedInUser.username,
      createdAt:1554090856000,
      msg:'Hab dich lieb'
    },
    {
      user: this.data.chatUser.username,
      createdAt:1554090856000,
      msg:'Ich dich auch'
    },
    {
      user: this.data.loggedInUser.username,
      createdAt:1554090856000,
      msg:'<3 <3 <3'
    }

  ];

  async sendMessage(){

    //Hier kommt der Post Request hin
    this.data.currentMessage.createdAt = new Date().getTime();

    this.data.currentMessage.messageID = await this.messagesService.saveMessage(this.data.url,this.data.currentMessage);
    if(this.data.currentMessage.messageID != null){
      //hier Nachricht in Liste pushen, wenn Backend funktioniert
    }
    this.data.currentMessages.messages.push(this.data.currentMessage);

    this.data.currentMessage = this.messagesService.newMessage(this.data.loggedInUser,this.data.chatUser);

    setTimeout(()=>{
      this.content.scrollToBottom(200);
    });
   


  }

  //////////////////
  doRefresh(event) {
    console.log('Begin async operation');
    

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.data.loadTopPosts();
    }, 500);
  }

}
