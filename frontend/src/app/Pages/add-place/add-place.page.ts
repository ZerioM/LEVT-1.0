import { Component, OnInit } from '@angular/core';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {

  constructor(private data: NewJourneyService, private navCtrl:NavController,  private router: Router) { }

  ngOnInit() {
  }

  
  goToAddPost(){
    this.router.navigateByUrl('/tabs/tab2/add-post');
  }

  
  safePlace(){
    this.router.navigateByUrl('/tabs/tab2');
  }  


}
