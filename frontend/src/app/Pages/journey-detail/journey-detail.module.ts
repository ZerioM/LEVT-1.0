import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JourneyDetailPage } from './journey-detail.page';

const routes: Routes = [
  {
    path: '',
    component: JourneyDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JourneyDetailPage]
})
export class JourneyDetailPageModule {}
