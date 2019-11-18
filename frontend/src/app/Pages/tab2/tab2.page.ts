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
  journeyCategoryID:number;
  journeyCompanionshipID:number;
  journeyDuration: number;

  //Costs
  leisureCosts: number;
  accommodationCosts: number;
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
    if (!this.showC) this.totalCosts = null;
  }

  divideCosts() {
    this.divideC = !this.divideC;
  }

  showNoPlaceWarning() {
    if (this.data.currentJourney.places != null) {
      this.noPlace = false;
    }


  }

  saveJourney() { 

    let inputs = document.querySelectorAll('ion-input');
    let textAreas = document.querySelectorAll('ion-textarea');
    let dateTimes=document.querySelectorAll('ion-datetime');
    let segments= document.querySelectorAll('ion-segment');
    //let i = 0;
    let a = "";
    

    //Segment auslesen
    segments.forEach(segment=>{
     

      if (segment.id.toString() == "seasons") {
        for(let i=0; i< segment.getAttribute.length;i++){
          let sb=segment.value;
          if(sb=="ion-sb-"+i){
            this.journeySeason=segment.getAttribute[i].value;
          }
          this.journeySeason = segment.value;}
          console.log("Journey Season =" + this.journeySeason);

        }

        if (segment.id.toString() == "journeyCategory") {
          for(let i=0; i< segment.getAttribute.length;i++){
            let sb=segment.value;
            if(sb=="ion-sb-"+i){
              this.journeyCategoryID=segment.getAttribute[i].value;
            }
            this.journeyCategoryID = parseInt(segment.value);}
            console.log("Journey Category =" + this.journeyCategoryID);
  
          }

          if (segment.id.toString() == "journeyCompanionship") {
            for(let i=0; i< segment.getAttribute.length;i++){
              let sb=segment.value;
              if(sb=="ion-sb-"+i){
                this.journeyCompanionshipID=segment.getAttribute[i].value;
              }
              this.journeyCompanionshipID = parseInt(segment.value);}
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
        console.log("Leisure Costs =" + this.leisureCosts);
      }
      if (input.id.toString() == "Accommodation") {
        this.accommodationCosts = parseInt(input.value);
        console.log("AccomndationCosts =" + this.accommodationCosts);
      }

      if (input.id.toString() == "Meals and Drinks") {
        this.mealsanddrinksCosts = parseInt(input.value);
        console.log("Meals and Drink Costs =" + this.mealsanddrinksCosts);
      }

      if (input.id.toString() == "Transport") {
        this.transportCosts = parseInt(input.value);
        console.log("Transport Costs = " + this.transportCosts);
      }

      if (input.id.toString() == "Other") {
        this.otherCosts = parseInt(input.value);
        console.log("OtherCosts = " + this.otherCosts);
      }

      if (input.id.toString() == "totalcosts") {
        this.totalCosts = parseInt(input.value);
        console.log("Total Costs = " + this.totalCosts);
      }
      //Journey Title
      if (input.id.toString() == "journeyName") {
        this.journeyTitle = input.value;
        console.log("journeyTitle = " + this.journeyTitle);
      }
      //journeyDuration
      if (input.id.toString() == "journeyDuration") {
        this.journeyDuration = parseInt(input.value);
        console.log("journeyDuration = " + this.journeyDuration);
      }


    });

    if (this.divideC) {
      this.totalCosts = this.leisureCosts + this.mealsanddrinksCosts + this.otherCosts + this.transportCosts + this.accommodationCosts;
    } else {
      this.leisureCosts =null;
      this.mealsanddrinksCosts =null;
      this.otherCosts =null;
      this.transportCosts =null;
      this.accommodationCosts =null;

    }
    console.log("TotalCosts:" + this.totalCosts)

    this.data.setInputs(this.leisureCosts, this.accommodationCosts, this.transportCosts, this.mealsanddrinksCosts, this.otherCosts, this.totalCosts, this.journeyTitle, this.journeyDetails, this.journeyYear, this.journeySeason, this.journeyCompanionshipID, this.journeyCategoryID, this.journeyDuration);



    this.router.navigateByUrl('/tabs/tab1');
  }


}

