import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.page.html',
  styleUrls: ['./journey-detail.page.scss'],
})
export class JourneyDetailPage implements OnInit {

  public bookmarkUnsaved:string="assets/icon/bookmark_unsaved_icon.svg";
  public bookmarkSaved:string="assets/icon/bookmark_saved_icon.svg";

  public bookmarkIcon:string="assets/icon/bookmark_unsaved_icon.svg"

  constructor(private data: DataService, private navCtrl:NavController, private router: Router) { }

  ngOnInit() {
  }

  bookmarken(){

    if(this.bookmarkIcon==this.bookmarkUnsaved){
      this.bookmarkIcon=this.bookmarkSaved;
    }else{
      this.bookmarkIcon=this.bookmarkUnsaved;
    }


  }

}
