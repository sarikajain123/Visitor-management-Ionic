import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitorDetailsPage } from './visitor-details';

@NgModule({
  declarations: [
    VisitorDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitorDetailsPage),
  ],
})
export class VisitorDetailsPageModule {}
