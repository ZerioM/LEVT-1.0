import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-post-detail',
  templateUrl: './user-post-detail.page.html',
  styleUrls: ['./user-post-detail.page.scss'],
})
export class UserPostDetailPage implements OnInit {

  constructor(public data: DataService, private navCtrl:NavController, private router: Router) { }

  ngOnInit() {
  }
  backToUserPlaceDetail(){

    this.router.navigateByUrl('/tabs/tab5/user-place-detail');
  
  }
}
