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
export class Tab4Page implements OnInit, AfterViewChecked{

 //public  currentUser: string=this.data.loggedInUser.username;
 public newMsg:string='';
 public currentTime: number = new Date().getTime();
 public image: Image;

  @ViewChild(IonContent,{read: false, static: false}) content: IonContent


  constructor(private data: DataService, private imageService: ImageService, private userService: UserService, private messagesService: MessagesService,navCtrl: NavController, private router: Router,private alertController: AlertController, private loadingController: LoadingController) {
    this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
  }

  ngOnInit() {
    this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
  
  }

  async ngAfterViewChecked(){
    if(this.currentTime <= (new Date().getTime()-3000)){
      this.currentTime = new Date().getTime();
      console.log("Checking for updates...");
      await this.messagesService.loadUserChatted(this.data.currentUserMessages,this.data.loggedInUser,this.data.url);
    } 
  }

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
    await this.userService.register(this.data.loggedInUser, this.data.url);
    await this.messagesService.loadUserChatted(this.data.currentUserMessages, this.data.loggedInUser, this.data.url);
    await this.data.dismissLoading();
  }

  async selectProfileImage(){

    const webPath = await this.getPhoto(CameraSource.Prompt);

    this.data.presentLoading();

    this.image = await this.imageService.uploadImage(webPath, null, this.data.url, this.data.loggedInUser);
    if(this.image.imageID != null){
      this.data.loggedInUser._profileImageID = this.image.imageID;
      this.data.loggedInUser.userImgSrc = this.image.imgSrc;
    } else {
      this.data.presentNotSavedToast();
    }

    this.data.dismissLoading();
    
    

  }

  private async getPhoto(source: CameraSource) {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source,
      //height, width, allowEditing
    });

    return image.webPath;
    
  }

  async deleteProfileImage(image: Image){
    let isDeleted: boolean;

    this.data.presentLoading();
    isDeleted = await this.imageService.deleteImage(image, this.data.url, this.data.loggedInUser);
    this.data.dismissLoading();

    if(isDeleted){
      this.data.loggedInUser._profileImageID = null;
      this.data.loggedInUser.userImgSrc = null;
    } else {
      this.data.presentNotSavedToast();
    }
  }

  async loadUserChat(chatUser: User){
    this.data.chatUser.userID = chatUser.userID;
    this.data.chatUser.username = chatUser.username;
    this.data.chatUser.userImgSrc = chatUser.userImgSrc;

    await this.data.presentLoading();
    await this.messagesService.loadMessages(this.data.currentMessages, this.data.url, this.data.loggedInUser, this.data.chatUser);
    await this.data.dismissLoading();

    this.router.navigateByUrl('/tabs/tab4/chat-page');
  }

}
