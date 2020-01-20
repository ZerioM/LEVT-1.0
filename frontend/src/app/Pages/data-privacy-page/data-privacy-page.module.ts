import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DataPrivacyPagePage } from './data-privacy-page.page';

const routes: Routes = [
  {
    path: '',
    component: DataPrivacyPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DataPrivacyPagePage]
})
export class DataPrivacyPagePageModule {}
