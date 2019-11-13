import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewJourneyService } from 'src/app/services/new-journey.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  showC:Boolean = false;
  divideC:Boolean = false;

  constructor(private data: NewJourneyService, private navCtrl:NavController,  private router: Router) {
    this.loadJSON();
  }

  goToAddPlace(){
    this.router.navigateByUrl('/tabs/tab2/add-place');
  }


  loadJSON(){

    this.data.loadCurrentJourney();
    this.data.loadJourneyCategories();
    this.data.loadCompanionships();
    this.data.loadTransports();
    this.data.loadActivities();
  }
  
  showCosts(){
    this.showC = !this.showC;
  }

  divideCosts(){
    this.divideC = !this.divideC;
  }

  calculateTotalCosts(){

    
  }
}

