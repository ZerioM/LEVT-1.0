import { Component } from '@angular/core';
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

  showC: Boolean = false;
  divideC: Boolean = false;
  noPlace: Boolean = true;

  //General
  journeyTitle: string;
  journeyYear:number;
  journeySeason:string;
  journeyCategorieID:number;
  journeyCompanionshipID:number;

  //Costs
  leisureCosts: number;
  accommondationCosts: number;
  mealsanddrinksCosts: number;
  transportCosts: number;
  otherCosts: number;
  totalCosts: number;

  //Journey Details
  
  journeyDetails: string;



  constructor(private data: NewJourneyService, private navCtrl: NavController, private router: Router) {
    this.loadJSON();
  }

  goToAddPlace() {
    this.router.navigateByUrl('/tabs/tab2/add-place');
  }


  loadJSON() {

    this.data.loadCurrentJourney();
    this.data.loadJourneyCategories();
    this.data.loadCompanionships();
    this.data.loadTransports();
    this.data.loadActivities();
  }

  showCosts() {
    this.showC = !this.showC;
  }

  divideCosts() {
    this.divideC = !this.divideC;
  }

  showNoPlaceWarning() {
    if (this.data.currentJourney.places != null) {
      this.noPlace = false;
    }


  }

  safeJourney() { 

    let inputs = document.querySelectorAll('ion-input');
    let textAreas = document.querySelectorAll('ion-textarea');
    let dateTimes=document.querySelectorAll('ion-datetime');
    let segments= document.querySelectorAll('ion-segment');
    //let i = 0;
    let a = "";
    

    //Segment auslesen
    segments.forEach(segment=>{
     

      if (segment.id.toString() == "season") {
        for(let i=0; i< segment.getAttribute.length;i++){
          let sb=segment.value;
          if(sb=="ion-sb-"+i){
            this.journeySeason=segment.getAttribute[i].value;
          }
          this.journeySeason = segment.value;}
          if (this.journeySeason == null) this.journeySeason ="";
          console.log("Journey Season =" + this.journeySeason);

        }

        if (segment.id.toString() == "journeyCategorie") {
          for(let i=0; i< segment.getAttribute.length;i++){
            let sb=segment.value;
            if(sb=="ion-sb-"+i){
              this.journeyCategorieID=segment.getAttribute[i].value;
            }
            this.journeyCategorieID = parseInt(segment.value);}
            if (this.journeyCategorieID == null) this.journeyCategorieID =0;
            console.log("Journey Categorie =" + this.journeyCategorieID);
  
          }

          if (segment.id.toString() == "journeyCompanionship") {
            for(let i=0; i< segment.getAttribute.length;i++){
              let sb=segment.value;
              if(sb=="ion-sb-"+i){
                this.journeyCompanionshipID=segment.getAttribute[i].value;
              }
              this.journeyCompanionshipID = parseInt(segment.value);}
              if (this.journeyCompanionshipID == null) this.journeyCompanionshipID =0;
              console.log("Journey Companionship =" + this.journeyCompanionshipID);
    
            }
           

    })


    //DateTime Auslesen
    dateTimes.forEach(dateTime=>{
     

      if (dateTime.id.toString() == "journeyYear") {
        this.journeyYear = parseInt(dateTime.value);}

        if (this.journeyYear == null) this.journeyYear =0;
        console.log("Journey Year =" + this.journeyYear);
        

    })


    //Text Area auslesen
    textAreas.forEach(textArea=>{
     

      if (textArea.id.toString() == "journeyDetails") {
        this.journeyDetails = textArea.value;}

        if (this.journeyDetails == null) this.journeyDetails ="";
        console.log("Journey Details =" + this.journeyDetails);
        

    })


    //Input Felder auslesen
    inputs.forEach(input => {
      //Costs
      if (input.id.toString() == "Leisure") {
        this.leisureCosts = parseInt(input.value);
        if (this.leisureCosts == null) this.leisureCosts = 0;
        console.log("Leisure Costs =" + this.leisureCosts);
      }
      if (input.id.toString() == "Accommodation") {
        this.accommondationCosts = parseInt(input.value);
        if (this.accommondationCosts == null) this.accommondationCosts = 0;
        console.log("AccomndationCosts =" + this.accommondationCosts);
      }

      if (input.id.toString() == "Meals and Drinks") {
        this.mealsanddrinksCosts = parseInt(input.value);
        if (this.mealsanddrinksCosts == null) this.mealsanddrinksCosts = 0;
        console.log("Meals and Drink Costs =" + this.mealsanddrinksCosts);
      }

      if (input.id.toString() == "Transport") {
        this.transportCosts = parseInt(input.value);
        if (this.transportCosts == null) this.transportCosts = 0;
        console.log("Transport Costs =" + this.transportCosts);
      }

      if (input.id.toString() == "Other") {
        this.otherCosts = parseInt(input.value);
        if (this.otherCosts == null) this.otherCosts = 0;
        console.log("OtherCosts =" + this.otherCosts);
      }

      if (input.id.toString() == "totalcosts") {
        this.totalCosts = parseInt(input.value);
        console.log("Total Costs =" + this.totalCosts);
      }
      //Journey Title
      if (input.id.toString() == "journeyName") {
        this.journeyTitle = input.value;
        console.log("journeyTitle =" + this.journeyTitle);
      }

    });

    if (this.divideC) {
      this.totalCosts = this.leisureCosts + this.mealsanddrinksCosts + this.otherCosts + this.transportCosts + this.accommondationCosts;
    }
    console.log("TotalCosts:" + this.totalCosts)

    this.data.setInputs(this.leisureCosts, this.accommondationCosts, this.transportCosts, this.mealsanddrinksCosts, this.otherCosts, this.totalCosts, this.journeyTitle, this.journeyDetails, this.journeyYear, this.journeySeason);



    this.router.navigateByUrl('/tabs/tab1');
  }


}

