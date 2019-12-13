import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-journey-detail',
  templateUrl: './user-journey-detail.page.html',
  styleUrls: ['./user-journey-detail.page.scss'],
})
export class UserJourneyDetailPage implements OnInit {

  constructor(private data: DataService, private navCtrl:NavController, private router: Router) { }

  ngOnInit() {
  }

  async showPlace(placeID: number){

    await this.data.presentLoading();
    await this.data.loadOnePlace(placeID);
    await this.data.dismissLoading();
        
      //go To Place Detail 
      this.router.navigateByUrl('/tabs/tab5/user-place-detail');
    
     }
  
     backToProfile(){
  
      this.router.navigateByUrl('/tabs/tab5');
    
     }

}
