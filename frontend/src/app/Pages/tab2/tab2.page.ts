import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import { equal } from 'assert';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  showC:Boolean = false;
  divideC:Boolean = false;
  noPlace:Boolean=true;

  leisureCosts:number;
  accommondationCosts:number;
  mealsanddrinksCosts:number;
  transportCosts:number;
  otherCosts:number;
  totalCosts:number;


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

  showNoPlaceWarning(){
    if(this.data.currentJourney.places!=null){
      this.noPlace=false;
    }


  }

  safeJourney(){
    //Hier kommt die Implementierung des Speicherns der Journey 

    let inputs = document.querySelectorAll('ion-input');
    let i = 0;
    let a="";
    
      inputs.forEach(input => {

      if(input.id.toString() == "leisure"){
        this.leisureCosts=parseInt(input.value);
        console.log("Leisure Costs ="+this.leisureCosts);
      }
      if(input.id.toString() == "accommodation"){
        this.accommondationCosts=parseInt(input.value);
        console.log("AccomndationCosts ="+this.accommondationCosts);
      }

      if(input.id.toString() == "mealsanddrinks"){
        this.mealsanddrinksCosts=parseInt(input.value);
        console.log("Meals and Drink Costs ="+this.mealsanddrinksCosts);
      }

      if(input.id.toString() == "transport"){
        this.transportCosts=parseInt(input.value);
        console.log("Transport Costs ="+this.transportCosts);
      }

      if(input.id.toString() == "other"){
        this.otherCosts=parseInt(input.value);
        console.log("OtherCosts ="+this.otherCosts);
      }


    });

    this.totalCosts=this.leisureCosts+this.mealsanddrinksCosts+this.otherCosts+this.transportCosts+this.accommondationCosts;
    console.log("TotalCosts:"+ this.totalCosts)
    this.router.navigateByUrl('/tabs/tab1');
  }

  
}

