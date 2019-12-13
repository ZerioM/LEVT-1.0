import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserJourneyDetailPage } from './user-journey-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UserJourneyDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserJourneyDetailPage]
})
export class UserJourneyDetailPageModule {}
