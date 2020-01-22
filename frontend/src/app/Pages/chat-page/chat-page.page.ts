import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { IonContent, NavController, AlertController, LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit, AfterViewChecked{

 //public  currentUser: string=this.data.loggedInUser.username;
 public newMsg:string='';
 public currentTime: number = new Date().getTime();

  @ViewChild(IonContent,{read: false, static: false}) content: IonContent


  constructor(private data: DataService, private messagesService: MessagesService,navCtrl: NavController, private router: Router,private alertController: AlertController, private loadingController: LoadingController) {}

  ngOnInit() {
    if(this.data.chatUser.userID == null){
      this.router.navigateByUrl("/tabs/tab4");
    }
    this.data.currentMessage = this.messagesService.newMessage(this.data.loggedInUser,this.data.chatUser);
  }

  async ngAfterViewChecked(){
    if(this.currentTime <= (new Date().getTime()-10000)){
      this.currentTime = new Date().getTime();
      console.log("Checking for updates...");
      await this.messagesService.loadMessages(this.data.currentMessages,this.data.url,this.data.loggedInUser,this.data.chatUser);
    } 
    if(this.data.chatOpened){
      this.data.chatOpened = false;
      setTimeout(()=>{
        this.content.scrollToBottom(200);
      });
    }
  }

  async sendMessage(){

    //Hier kommt der Post Request hin
    //this.data.currentMessage.createdAt = new Date().getTime();

    await this.messagesService.saveMessage(this.data.url, this.data.currentMessage, this.data.loggedInUser);
    if(this.data.currentMessage.messageID != null){
      this.data.currentMessages.messages.push(this.data.currentMessage);
      this.data.currentMessage = this.messagesService.newMessage(this.data.loggedInUser,this.data.chatUser);
    } else {
      this.data.presentNotSavedToast();
    }
    

    

    setTimeout(()=>{
      this.content.scrollToBottom(200);
    });
   


  }

  doRefresh(event) {
    console.log('Begin async operation');
    

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.messagesService.loadMessages(this.data.currentMessages, this.data.url, this.data.loggedInUser, this.data.chatUser);
      this.content.scrollToBottom(200);
    }, 500);
  }

  close(){
    this.router.navigateByUrl('/tabs/tab4');
  }

  async goToUserPage(){
    await this.data.presentLoading();
    await this.data.loadOneOtherUser(this.data.chatUser);
    await this.data.loadOtherUserJourneys(this.data.otherUser);
    await this.data.dismissLoading();
    this.router.navigateByUrl('/tabs/tab1/user');
  }
    
  

}
