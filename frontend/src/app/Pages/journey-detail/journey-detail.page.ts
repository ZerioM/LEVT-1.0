import { AfterViewInit,Component, ElementRef,OnInit,ViewChild, Sanitizer, AfterContentInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Journey } from 'src/app/Interfaces/Journey';
import { NewJourneyService } from 'src/app/services/new-journey.service';
import * as d3 from 'd3';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { zoom } from 'd3';
//import {Geolocation}from '@ionic-native/geolocation/ngx';
//import {d3} from 'https://d3js.org/d3.v4.min.js';

//declare var google: { maps: { Map: new (arg0: any, arg1: { center: { lat: number; lng: number; }; zoom: number; }) => void; }; };

declare var google;

@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.page.html',
  styleUrls: ['./journey-detail.page.scss'],
})
export class JourneyDetailPage implements AfterViewInit, AfterViewChecked{
  
  @ViewChild('map',{read: false, static: false}) mapElement: ElementRef;
  map: any;
  marker: any;
  icon: any;

  public focusIsOut: boolean = false;

  constructor(private data: DataService, private navCtrl:NavController, private router: Router, private journeyService:NewJourneyService) {
    
   }

  ngAfterViewInit() {
    console.log("After view has loaded.");
  }

  ngAfterViewChecked() {

    if(this.data.contentChanged) {
      console.log("After view checked.");
      console.log(this.data.currentJourney);
      this.loadMap();
      this.data.contentChanged = false;
    }
  }



  loadMap() {
    let centerlat: number = 47.612328;
    let centerlng: number = 13.2;
    let zoomlvl = 6;

    let bounds = new google.maps.LatLngBounds();

    if(this.data.currentJourney.places != null){
      if(this.data.currentJourney.places.length != 0){
        let place1 = this.data.currentJourney.places[0];
        if(place1 != null && place1.coordinateX != null && place1.coordinateY != null){
          centerlat = place1.coordinateX;
          centerlng = place1.coordinateY;
          zoomlvl = 12;
        }
      }

      /* TO DO: WARUM Macht das nichts?!
      this.data.currentJourney.places.forEach(place => {
        if(place.coordinateX != null && place.coordinateY != null){
          let placeLatLng = new google.maps.LatLng(place.coordinateX,place.coordinateY);
          bounds.extend(placeLatLng);
        }
      });*/
      

      if(this.data.currentJourney.places.length > 1){

        let placesLATArray: number[] = new Array();
        let placesLNGArray: number[] = new Array();

        this.data.currentJourney.places.forEach(place => {
          placesLATArray.push(place.coordinateX);
          placesLNGArray.push(place.coordinateY);
        });

        let minLAT = Math.min.apply(null,placesLATArray);
        let maxLAT = Math.max.apply(null,placesLATArray);
        let minLNG = Math.max.apply(null,placesLNGArray);
        let maxLNG = Math.max.apply(null,placesLNGArray);

        let placesLATDiff = maxLAT - minLAT;
        let placesLNGDiff = maxLNG - minLNG;

        console.log("Places LAT Diff:");
        console.log(placesLATDiff);
        console.log("Places LNG Diff:");
        console.log(placesLNGDiff);

        let generalDiff = (placesLATDiff + placesLNGDiff)/2;

        zoomlvl = 12;

        let zoomlvlChangeRate = 1 - (35 * generalDiff);

        console.log("zoom lvl change rate:")
        console.log(zoomlvlChangeRate);

        zoomlvl = zoomlvl * zoomlvlChangeRate;

        console.log("Zoom lvl");
        console.log(zoomlvl);
      }
    }

    

    let latLng = new google.maps.LatLng(centerlat, centerlng);

    let mapOptions = {
      center: latLng,
      zoom: zoomlvl,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    if(this.data.currentJourney.places != null){
      this.data.currentJourney.places.forEach(place => {
        if(place.coordinateX != null && place.coordinateY != null){
          let placeLatLng = new google.maps.LatLng(place.coordinateX, place.coordinateY);
          if(place.thumbnailSrc != null && place.thumbnailSrc != ''){
            let marker = new google.maps.Marker({label: {color: "white", fontSize: "12px", fontWeight: "bold", text: place.placeName},position: placeLatLng, map: this.map, icon: {scaledSize: {width: 70, height: 63}, url: place.thumbnailSrc}});
          } else {
            let marker = new google.maps.Marker({label: {color: "white", fontSize: "10px", fontWeight: "bold", text: place.placeName},position: placeLatLng, map: this.map});
          }
          
        }
        });
    }
     
     
    
  }

  async bookmarken(){
    console.log("Auf Bookmark geklickt.");
    
    
    if(this.data.currentBookmark.bookmarkID == null){

      console.log("Bookmark ist false.");
      this.data.bookmarkIcon = this.data.bookmarkSaved;

      await this.data.setBookmark()
      if(this.data.currentBookmark.bookmarkID != null){
        console.log("Bookmark gesetzt.");
        
      } else {
        console.log("Bookmark setzen hat nicht funktioniert.");
        this.data.bookmarkIcon = this.data.bookmarkUnsaved;
        this.data.presentNotSavedToast();
      }

    } else {

      console.log("Bookmark ist true");
      this.data.bookmarkIcon = this.data.bookmarkUnsaved;

      await this.data.unsetBookmark()
      if(this.data.currentBookmark.bookmarkID == null){
        console.log("Bookmark entfernt.");
        
      } else {
        console.log("Bookmark entfernen hat nicht funktioniert.");
        this.data.bookmarkIcon = this.data.bookmarkSaved;
        this.data.presentNotSavedToast();
      }
      
    }


  }

  async showPlace(placeID: number){

    await this.data.presentLoading();
    await this.data.loadOnePlace(placeID);
    await this.data.dismissLoading();
      
    //go To Journey Detail 
    this.router.navigateByUrl('/tabs/tab1/place-detail');
  
  }

  backToHomepage(){

    this.router.navigateByUrl('/tabs/tab1');
  
  }


  async editJourney(){

    this.data.fromEditJourney=true;
    this.data.fromNewJourney=false;

    await this.data.loadJourneyWithChildren(this.data.newJourney,this.data.currentJourney.journeyID);

    console.log("New Journey bei Edit");
    console.log(this.data.newJourney)

    this.router.navigateByUrl('tabs/tab2');


  }
 

// /* ------------------------------------- */
// /* -------- Kosten Visualisierung ------ */
// /* ------------------------------------- */

//    svg:any;
//    var svg = d3.select("body")
// 	.append("svg")
// 	.append("g")

// svg.append("g")
// 	.attr("class", "slices");
// svg.append("g")
// 	.attr("class", "labelName");
// svg.append("g")
// 	.attr("class", "labelValue");
// svg.append("g")
// 	.attr("class", "lines");

// var width = 960,
//     height = 450,
// 	radius = Math.min(width, height) / 2;

// var pie = d3.pie()
// 	.sort(null)
// 	.value(function(d) {
// 		return d.value;
// 	});

// var arc = d3.arc()
// 	.outerRadius(radius * 0.8)
// 	.innerRadius(radius * 0.4);

// var outerArc = d3.arc()
// 	.innerRadius(radius * 0.9)
// 	.outerRadius(radius * 0.9);

// var legendRectSize = (radius * 0.05);
// var legendSpacing = radius * 0.02;


// var div = d3.select("body").append("div").attr("class", "toolTip");

// svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var colorRange = d3.scaleOrdinal(d3.schemeCategory10);
// var color = d3.scaleOrdinal()
// 	.range(["#415f4b", "#5e847a", "#7ba9a9", "#d68900", "#8c7436"]);


// data = [1000,200, 250,400, 70]; 
  
// var valeur_autre = data.slice(8);
// console.log(valeur_autre);
// var autre = valeur_autre.reduce((a, b) => a + b, 0);
// var autre2 = (Math.floor(autre * 100) / 100).toFixed(2);



// type_objets = ["Accommodation", "Transport", "Leisure", "Meals & Drinks", "Others"];



// datasetOption1 = [
// 		{label:type_objets[0], value:data[0]}, 
//         {label:type_objets[1], value:data[1]}, 
//         {label:type_objets[2], value:data[2]},
//         {label:type_objets[3], value:data[3]},
//         {label:type_objets[4], value:data[4]},
//         ];


// d3.selectAll("input")
// 	.on("change", selectDataset);
	
// function selectDataset()
// {
//   change(datasetOption1);
// 	var value = this.value;
//   //var value = d3.select('input[name="dataset"]:checked').node().value;
	
// 	if (value == "option1")
// 	{
// 		change(datasetOption1);
// 	}
// 	else if (value == "option2")
// 	{
// 		change(datasetOption2);
// 	}
// }
	
// // Handmade legend
// svg.append("rect").attr("x",330).attr("y",100).attr("width", 20).attr("height", 20).style("fill", "#415f4b")
// svg.append("rect").attr("x",330).attr("y",130).attr("width", 20).attr("height", 20).style("fill", "#5e847a")
// svg.append("rect").attr("x",330).attr("y",160).attr("width", 20).attr("height", 20).style("fill", "#7ba9a9")
// svg.append("rect").attr("x",330).attr("y",190).attr("width", 20).attr("height", 20).style("fill", "#d68900")
// svg.append("rect").attr("x",330).attr("y",220).attr("width", 20).attr("height", 20).style("fill", "#8c7436")
// svg.append("text").attr("x", 360).attr("y", 110).text("Accommodation").style("font-size", "15px").attr("alignment-baseline","middle")
// svg.append("text").attr("x", 360).attr("y", 140).text("Transport").style("font-size", "15px").attr("alignment-baseline","middle")
// svg.append("text").attr("x", 360).attr("y", 170).text("Leisure").style("font-size", "15px").attr("alignment-baseline","middle")
// svg.append("text").attr("x", 360).attr("y", 200).text("Meals & Drinks").style("font-size", "15px").attr("alignment-baseline","middle")
// svg.append("text").attr("x", 360).attr("y", 230).text("Others").style("font-size", "15px").attr("alignment-baseline","middle")

// function change(data) {

// 	/* ------- PIE SLICES -------*/ 
// 	var slice = svg.select(".slices").selectAll("path.slice")
//         .data(pie(data), function(d){ return d.data.label });

//     slice.enter()
//         .insert("path")
//         .style("fill", function(d) { return color(d.data.label); })
//         .attr("class", "slice");

//     slice
//         .transition().duration(1000)
//         .attrTween("d", function(d) {
//             this._current = this._current || d;
//             var interpolate = d3.interpolate(this._current, d);
//             this._current = interpolate(0);
//             return function(t) {
//                 return arc(interpolate(t));
//             };
//         })
//     slice
//         .on("mousemove", function(d){
//             div.style("left", d3.event.pageX+10+"px");
//             div.style("top", d3.event.pageY-25+"px");
//             div.style("display", "inline-block");
//             div.html((d.data.label)+"<br>"+(d.data.value)+"€");
//         }); // Tooltip
//     slice
//         .on("mouseout", function(d){
//             div.style("display", "none");
//         });

//     slice.exit()
//         .remove();
	
// /*--------- soll Gesamtkosten in der Mitte machen	--------- */	
// var totalCosts = svg.selectAll()
// 				.append('g')
// 				. attr('class', 'totalCosts')
// 				.attr('transform', function(d, i) {
//             		var height = legendRectSize + legendSpacing;
//             		var offset =  height * color.domain().length / 2;
//             		var horz = -3 * legendRectSize;
//             		var vert = i * height - offset;
//             		return 'translate(' + horz + ',' + vert + ')';
//         });

// totalCosts.append('text')
// 	.attr('x', legendRectSize + legendSpacing)
// 	.attr('y', legendRectSize - legendSpacing)
// 	.text(function(d) {return '1.500€';});
	

// /*--------- macht Legende in der Mitte	--------- */ 
// var legend = svg.selectAll('.legend')
//         .data(color.domain())
//         .enter()
//         .append('g')
//         .attr('class', 'legend')
//         .attr('transform', function(d, i) {
//             var height = legendRectSize + legendSpacing;
//             var offset =  height * color.domain().length / 2;
//             var horz = -3 * legendRectSize;
//             var vert = i * height - offset;
//             return 'translate(' + horz + ',' + vert + ')';
//         });

//     legend.append('rect')
//         .attr('width', legendRectSize)
//         .attr('height', legendRectSize)
//         .style('fill', color)
//         .style('stroke', color);

//     legend.append('text')
//         .attr('x', legendRectSize + legendSpacing)
//         .attr('y', legendRectSize - legendSpacing)
//         .text(function(d) { return d; });

   
//     /* ------- TEXT LABELS -------*/ 

//     var text = svg.select(".labelName").selectAll("text")
//         .data(pie(data), function(d){ return d.data.label });

//     text.enter()
//         .append("text")
//         .attr("dy", ".35em")
//         .text(function(d) {
//             return (d.data.label+": "+d.value+"€");
//         });

//     function midAngle(d){
//         return d.startAngle + (d.endAngle - d.startAngle)/2;
//     }

//     text
//         .transition().duration(1000)
//         .attrTween("transform", function(d) {
//             this._current = this._current || d;
//             var interpolate = d3.interpolate(this._current, d);
//             this._current = interpolate(0);
//             return function(t) {
//                 var d2 = interpolate(t);
//                 var pos = outerArc.centroid(d2);
//                 pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
//                 return "translate("+ pos +")";
//             };
//         })
//         .styleTween("text-anchor", function(d){
//             this._current = this._current || d;
//             var interpolate = d3.interpolate(this._current, d);
//             this._current = interpolate(0);
//             return function(t) {
//                 var d2 = interpolate(t);
//                 return midAngle(d2) < Math.PI ? "start":"end";
//             };
//         })
//         .text(function(d) {
//             return (d.value+"€"); // Label in €
//         });


//     text.exit()
//         .remove();

//     /* ------- SLICE TO TEXT POLYLINES -------*/ 

//     var polyline = svg.select(".lines").selectAll("polyline")
//         .data(pie(data), function(d){ return d.data.label });

//     polyline.enter()
//         .append("polyline");

//     polyline.transition().duration(1000)
//         .attrTween("points", function(d){
//             this._current = this._current || d;
//             var interpolate = d3.interpolate(this._current, d);
//             this._current = interpolate(0);
//             return function(t) {
//                 var d2 = interpolate(t);
//                 var pos = outerArc.centroid(d2);
//                 pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
//                 return [arc.centroid(d2), outerArc.centroid(d2), pos];
//             };
//         });

//     polyline.exit()
//         .remove();
// }; 

}
