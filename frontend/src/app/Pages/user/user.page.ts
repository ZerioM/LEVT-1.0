import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage{

  constructor(private data: DataService, private userService: UserService, private messagesService: MessagesService, private router: Router) {

    this.loadJSON();
   }

  async loadJSON(){
    await this.data.loadOtherUserJourneys(this.data.otherUser);
 }

 async showJourney(journeyID: number){
    
  await this.data.presentLoading();  
  await this.data.loadOneJourney(journeyID);
  await this.data.dismissLoading();
  
  this.data.contentChanged = true;

  //go To Journey Detail 
  this.router.navigateByUrl('/tabs/tab1/journey-detail');

 }

 async chatWith(){
  this.data.chatUser = this.data.otherUser;
  this.messagesService.newMessage(this.data.currentMessage, this.data.loggedInUser,this.data.chatUser);
  await this.data.presentLoading();
  await this.messagesService.loadMessages(this.data.currentMessages,this.data.url, this.data.loggedInUser,this.data.chatUser);
  await this.data.dismissLoading();
  this.router.navigateByUrl('/tabs/tab4/chat-page');
  //eigentlich navigieren zu Unterseite von tab4, wo sich chat befindet
  }

  doRefresh(event) {
    console.log('Begin async operation');
    

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.data.loadUser();
      this.data.loadUserJourneys(this.data.loggedInUser);
    }, 500);
  }
}