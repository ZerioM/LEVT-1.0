import { Component, AfterViewChecked} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BookmarkService } from 'src/app/services/bookmark.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewChecked {

  public showBookmarkedJourneys=false;


//@ViewChild (Content) content: Content;

  constructor(private data: DataService, private bookmarkService: BookmarkService, private userService: UserService, private navCtrl:NavController, private router: Router) {

    this.loadJSON();

    if(this.data.resetTab){
      this.data.resetTab=false;
      if(this.data.settingsFromHome==false){
        this.router.navigateByUrl('/tabs/tab5');
      }
    }
  }

  ngAfterViewChecked(){
    if(this.data.reloadHomePage){
      this.data.reloadHomePage = false;
      this.data.loadTopPosts();
    }
  }

    //Daten laden
    loadJSON(){

      this.data.loadTopPosts();
      
  
   }

    async showJourney(journeyID: number){

    this.data.clickedJourney = true;
    if(this.data.loggedInUser.explorerBadgeProgress < 100 && this.data.showedExplorerJourney==false){
      this.data.loggedInUser.explorerBadgeProgress += 33;
    }
    
    await this.data.presentLoading();  
    await this.data.loadOneJourney(journeyID);
    await this.bookmarkService.bookmarkExists(this.data.currentBookmark, this.data.currentJourney, this.data.url, this.data.loggedInUser);
    await this.data.dismissLoading();
    if(this.data.currentBookmark.bookmarkID != null){
      this.data.bookmarkIcon = this.data.bookmarkSaved;
    } else {
      this.data.bookmarkIcon = this.data.bookmarkUnsaved;
    }

 
    //go To Journey Detail 
    this.router.navigateByUrl('/tabs/tab1/journey-detail');
  
   }

  smoothScrollJS(){
    let content = document.querySelector('ion-content');
    let timeInMilli = 500;
    console.log("Try to animate...");
    content.scrollToTop(timeInMilli);
  }

  goToSettings(){

    this.data.settingsFromHome=true;

    this.router.navigateByUrl('/tabs/tab1/settings');
  }

  showMyBookmarks(){

    if(this.showBookmarkedJourneys == true){
      this.data.loadBookmarkedPosts();
    } else {
      this.data.loadTopPosts();
    }
    console.log(this.showBookmarkedJourneys);
  }


  //Gamification

  closePioneerFinishToast(){


    this.data.showedPioneerFinish=true;
  }

  closeExplorerFinishToast(){


    this.data.showedExplorerFulltext=true;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.data.loadTopPosts();
    }, 500);
  }
}
