import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocietyApiProvider } from '../../providers/society-api/society-api';
import { VisitorDetailsPage } from '../visitor-details/visitor-details';

/**
 * Generated class for the FlatDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flat-details',
  templateUrl: 'flat-details.html',
})
export class FlatDetailsPage {
  flatdetails: any;
  visitorsDetail: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private societyApiProvider: SocietyApiProvider) {
    // this.flatdetails=  navParams.get('item');
    this.flatdetails = this.societyApiProvider.getOwnerDetails(navParams.get('item'));
    this.visitorsDetail = this.flatdetails.visitor;
    if (this.flatdetails) {
    }
    else
      alert('...Flat Details Not Found...');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlatDetailsPage');
  }


  itemTapped(event, item) {
    let visitor = this.societyApiProvider.getVisitorByMobile(item.contact);
    console.log(' visitor...............\n', visitor);
    if (visitor) {
      this.navCtrl.setRoot(VisitorDetailsPage, { userProfile: visitor });
    }
    else {
      alert('........visitor Details Not Found');
    }

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.flatdetails.visitor = this.visitorsDetail;
  
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '' && searchBy === 'contact') {
    //   this.flatdetails.visitor = this.flatdetails.visitor.filter((item) => {
    //     return (item.contact.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
    if (val && val.trim() != '') {
      this.flatdetails.visitor = this.flatdetails.visitor.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }) 
    }
  }
}
