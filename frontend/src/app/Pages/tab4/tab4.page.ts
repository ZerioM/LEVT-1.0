import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  currentUser='sandra';
  newMsg='';

  @ViewChild(IonContent,{read: false, static: false}) content: IonContent


  constructor() { }

  ngOnInit() {
  }

  messages = [
    {
      user: 'sandra',
      createdAt:1554090856000,
      msg:'Hey how are you?'
    },
    {
      user: 'mario',
      createdAt:1554090856000,
      msg:'fine thanks and you?'
    },
    {
      user: 'sandra',
      createdAt:1554090856000,
      msg:'also fine?'
    }

  ];

  sendMessage(){

    //Hier kommt der Post Request hin 

    this.messages.push({
      user: 'sandra',
      createdAt: new Date().getTime(),
      msg:this.newMsg
    });

    this.newMsg='';

    setTimeout(()=>{
      this.content.scrollToBottom(200);
    });
   


  }

}
