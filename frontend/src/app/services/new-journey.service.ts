import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Journey } from '../Interfaces/Journey';
import { JourneyCategories } from '../Interfaces/JourneyCategories';
import { JourneyCategory } from '../Interfaces/JourneyCategory';
import { Companionships } from '../Interfaces/Companionships';
import { Transports } from '../Interfaces/Companionships copy';

@Injectable({
  providedIn: 'root'
})
export class NewJourneyService {

  public currentJourney:Journey={journeyID:null,name:"",username:"",userImgSrc:"",bookmarks:null,season:"",year:null,duration:null,journeyCategory:"",companionship:"",detail:"",totalCosts: null,accommodationCosts:null,activityCosts:null,transportCosts:null,foodCosts:null,otherCosts:null,places:[],thumbnailSrc:"", plane:true, car:false, bus:false, train:false,ship:false,motorBike:false,campingTrailer:false,hiking:false,bicycle:false}

  public journeyCategories:JourneyCategories={journeyCategories:[]};
  public companionships:Companionships={companionships:[]};
  public transports:Transports={transports:[]};
  

  constructor(private http: HttpClient) { }


  loadCurrentJourney(){
    //ladet das JSON File mit den Testdaten aus den assets
        this.http.get("/assets/placesTest.json").subscribe( (loadedData: Journey)=> {
          if(loadedData!=null){
            console.log("Json file wurde geladen");
            //console.log(JSON.stringify(loadedData));
            this.currentJourney=loadedData;
    
            console.log("currentJourney wurde überschrieben");
  
           // console.log(loadedData);
    
            console.log(this.currentJourney);
          }else{
    
            console.log("null per http geladen");
          }
        });
    
        
    
      }

      loadJourneyCategories(){
        //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
            this.http.get("http://levt.test/allJourneyCategories").subscribe( (loadedData: JourneyCategories)=> {
              if(loadedData!=null){
                console.log("Json file wurde geladen");
                //console.log(JSON.stringify(loadedData));
                this.journeyCategories=loadedData;
        
                console.log("journeyCategories wurden überschrieben");
      
                //console.log(loadedData);
        
                console.log(this.journeyCategories);
              }else{
        
                console.log("null per http geladen");
              }
            });
        
            
        
          }


          loadCompanionships(){
            //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
                this.http.get("http://levt.test/allCompanionships").subscribe( (loadedData: Companionships)=> {
                  if(loadedData!=null){
                    console.log("Json file wurde geladen");
                    //console.log(JSON.stringify(loadedData));
                    this.companionships=loadedData;
            
                    console.log("Companionships wurden überschrieben");
          
                    //console.log(loadedData);
            
                    console.log(this.companionships);
                  }else{
            
                    console.log("null per http geladen");
                  }
                });
            
                
            
              }

              loadTransports(){
                //"/assets/journeyCategoriesTest.json" --> ladet das JSON File mit den Testdaten aus den assets
                    this.http.get("/assets/journeyTransportTest.json").subscribe( (loadedData: Transports)=> {
                      if(loadedData!=null){
                        console.log("Json file wurde geladen");
                        //console.log(JSON.stringify(loadedData));
                        this.transports=loadedData;
                
                        console.log("Transports wurden überschrieben");
              
                        //console.log(loadedData);
                
                        console.log(this.transports);
                      }else{
                
                        console.log("null per http geladen");
                      }
                    });
                
                    
                
                  }
}
