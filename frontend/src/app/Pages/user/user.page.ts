import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage{

  constructor(private data: DataService, private messagesService: MessagesService, private router: Router) {

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

 chatWith(){
  this.data.chatUser = this.data.otherUser;
  this.data.currentMessage = this.messagesService.newMessage(this.data.loggedInUser,this.data.chatUser);
  this.messagesService.loadMessages(this.data.currentMessages,this.data.url, this.data.loggedInUser,this.data.chatUser);
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