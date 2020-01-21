import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  // doRefresh(event) {
  //   console.log('Begin async operation');
    

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     event.target.complete();
  //     this.messagesService.loadMessages(this.data.currentMessages, this.data.url, this.data.loggedInUser, this.data.chatUser);
  //   }, 500);
  }

}
