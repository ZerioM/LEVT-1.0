import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-privacy-page',
  templateUrl: './data-privacy-page.page.html',
  styleUrls: ['./data-privacy-page.page.scss'],
})
export class DataPrivacyPagePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  backToSettings(){
    this.router.navigateByUrl('/tabs/tab1/settings');
  }

}
