import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { IonContent, NavController, AlertController, LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
import { Image } from 'src/app/Interfaces/Image';
import { Capacitor, Plugins, CameraResultType, FilesystemDirectory, CameraSource } from '@capacitor/core';
import { ImageService } from 'src/app/services/image.service';
import { User } from 'src/app/Interfaces/User';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit{

 //public  currentUser: string=this.data.loggedInUser.username;
 public newMsg:string='';
 public currentTime: number = new Date().getTime();
 public image: Image;
 public showPassword: boolean = false;

  @ViewChild(IonContent,{read: false, static: false}) content: IonContent

  public interval;

  constructor(public data: DataService, public imageService: ImageService, public userService: UserService, public messagesService: MessagesService,navCtrl: NavController, private router: Router,private alertController: AlertController, private loadingController: LoadingController) {
    this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
  }

  ngOnInit() {
    this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    this.interval = setInterval(() => { 
      console.log("Checking for updates...");
      this.messagesService.loadUserChatted(this.data.currentUserMessages,this.data.loggedInUser,this.data.url);
     }, 10000);
  }

  // async ngAfterViewChecked(){
  //   if(this.currentTime <= (new Date().getTime()-10000)){
  //     this.currentTime = new Date().getTime();
  //     console.log("Checking for updates...");
  //     await this.messagesService.loadUserChatted(this.data.currentUserMessages,this.data.loggedInUser,this.data.url);
  //   } 
  // }

  //////////////////
  doRefresh(event) {
    console.log('Begin async operation');
    

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    }, 500);
  }

  async login(){
    await this.data.presentLoading();
    await this.userService.login(this.data.loggedInUser, this.data.currentBookmark, this.data.url);
    await this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
  }

  async register(){
    await this.data.presentLoading();
    await this.userService.register(this.data.loggedInUser, this.data.currentBookmark, this.data.url);
    await this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
  }

  async loadUserChat(chatUser: User){
    this.data.chatUser.userID = chatUser.userID;
    this.data.chatUser.username = chatUser.username;
    this.data.chatUser.userImgSrc = chatUser.userImgSrc;

    await this.data.presentLoading();
    await this.messagesService.loadMessages(this.data.currentMessages, this.data.url, this.data.loggedInUser, this.data.chatUser);
    await this.data.dismissLoading();

    this.data.chatOpened = true;

    this.router.navigateByUrl('/tabs/tab4/chat-page');
  }

}
