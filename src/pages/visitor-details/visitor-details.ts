import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocietyApiProvider } from '../../providers/society-api/society-api';
import { HomePage } from '../home/home';

/**
 * Generated class for the VisitorDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visitor-details',
  templateUrl: 'visitor-details.html',
})
export class VisitorDetailsPage {

  // Vdata: any;
  userList: any;
  displayPic: any = '../../assets/imgs/profile.png';
  constructor(public nav: NavController, public navParams: NavParams,
    private societyApiProvider: SocietyApiProvider) {
    this.userList = navParams.get('userProfile');
    // console.log('********userList****', this.userList);
  }


  onEdit(visitorForm) {
    this.societyApiProvider.updateVisitorDetails(visitorForm);
    alert('successfully updated');
    this.nav.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorDetailsPage');
  }

  checkIn() {
    console.log('********userList****', this.userList);
  }
}
