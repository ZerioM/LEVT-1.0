import { Component, OnInit } from '@angular/core';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {

  constructor(private journeyService: NewJourneyService, private data: DataService, private navCtrl: NavController, private router: Router) {
    
  
  }

  ngOnInit() {
  }

  
  goToAddPost(){
    this.router.navigateByUrl('/tabs/tab2/add-post');
  }

  
  savePlace(){
    console.log("Place saved");
    this.router.navigateByUrl('/tabs/tab2');
  }  


}
