import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController, AlertController, LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

 public  currentUser: string=this.data.loggedInUser.username;
 public newMsg:string='';

  @ViewChild(IonContent,{read: false, static: false}) content: IonContent


  constructor(private data: DataService,navCtrl: NavController, private router: Router,private alertController: AlertController, private loadingController: LoadingController) { }

  ngOnInit() {
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

  sendMessage(){

    //Hier kommt der Post Request hin 

    this.messages.push({
      user: this.data.loggedInUser.username,
      createdAt: new Date().getTime(),
      msg:this.newMsg
    });

    this.newMsg='';

    setTimeout(()=>{
      this.content.scrollToBottom(200);
    });
   


  }

}
