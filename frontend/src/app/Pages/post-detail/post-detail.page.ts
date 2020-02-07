import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  constructor(public data: DataService, private navCtrl:NavController, private router: Router) { }

  ngOnInit() {
  }

  backToPlaceDetail(){

    this.router.navigateByUrl('/tabs/tab1/place-detail');
  
  }

  async goToUserPage(){
    await this.data.goToUserPage();
    await this.data.dismissLoading();
    this.router.navigateByUrl('/tabs/tab1/user');
  }

}
