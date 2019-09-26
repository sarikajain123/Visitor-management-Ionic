import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocietyApiProvider } from '../../providers/society-api/society-api';
import { VisitorDetailsPage } from '../visitor-details/visitor-details';
import { AddVisitorPage } from '../add-visitor/add-visitor';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import {URL} from '../constant'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    SocietyApiProvider
  ],
})
export class HomePage {
  fingerprintOptions: FingerprintOptions;
  allVisitors: any;
  // contact = '';
  visitor: any;
  backupAllVisitor: any;
  constructor(private httpservice: HttpServiceProvider, public fingerAuth: FingerprintAIO, public nav: NavController, public navCtrl: NavController, private SocietyApiProvider: SocietyApiProvider) {

  }


  ionViewDidLoad() {
    this.refresh();
    console.log('ionViewDidLoad HomePage');
  }

  refresh() {
    this.getAllVisitor();
    console.log('...allVisitors List....', this.allVisitors);
  }

  checkin(mob) {
    this.getVisitorByMobile(mob);
  }

  checkOut(mob) {
    let id = ''
    let requestUrl = `${URL}apihost/visitor_by_phone?visitor_phone=${mob}`;
    this.httpservice.get_Data(requestUrl, true).subscribe(data => {
     if (data[0].list[0].visitorID) {
      id = data[0].list[0].visitorID;
      let requestUrl2 = `${URL}apihost/checkout?visitorID=${id}`;
      this.httpservice.get_Data(requestUrl2, true).subscribe(data => {
        document.getElementById("contactNo").innerHTML = " ";
        alert(data[0].result);
       });
     } else {
       alert('Entered Mobile Number does not exist');
     }
    });
    // this.getVisitorByMobile(mob);
  }

  addVisitor(mob) {
    this.visitor = this.SocietyApiProvider.getVisitorByMobile(mob);
    console.log('....this.visitor....', this.visitor);
    if (this.visitor) {
      this.nav.setRoot(VisitorDetailsPage, { userProfile: this.visitor });
    }
    else {
      alert('This Mobile no is not registered..Please Add Visitor Details ');
      this.nav.setRoot(AddVisitorPage);
    }

  }


  public showFingerprintAuthDlg() {
    console.log('.......showFingerprintAuthDlg..............');
    this.fingerprintOptions = {
      clientId: 'fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      // disableBackup:true  //Only for Android(optional)
    }
    console.log('.......222222222222..............');
    // this.fingerAuth.show(this.fingerprintOptions)
    // .then((result: any) => console.log('.......fingerAuth..............\n', result))
    // .catch((error: any) => console.log('.......fingerAuth error..............\n', error));
    this.fingerAuth.isAvailable().then(result => {
      console.log('.......isAvailable..............\n', result);
      if (result === "OK") {
        this.fingerAuth.show(this.fingerprintOptions)
          .then((result: any) => console.log('.......fingerAuth..............\n', result))
          .catch((error: any) => console.log('.......fingerAuth error..............\n', error));
      }
    });
  }

  getAllVisitor() {
    let requestUrl = `${URL}apihost/all_vistors`;
    this.httpservice.get_Data(requestUrl, true).subscribe(data => {
      // console.log('...........getAllVisitor..................', data[0].list);
      this.allVisitors = data[0].list;
      this.backupAllVisitor = this.allVisitors;
    });

  }

  getVisitorByMobile(mobile) {
    let requestUrl = `${URL}apihost/visitor_by_phone?visitor_phone=${mobile}`;
    this.httpservice.get_Data(requestUrl, true).subscribe(data => {
      // console.log( '...........getVisitorByMobile..................', data[0].list[0]);
      const temp = data[0].list[0];
      if (temp) {
        this.nav.setRoot(VisitorDetailsPage, {userProfile: temp});
      }
      else {
        alert('Mobile no is not registered..Please Add Visitor Details ');
        this.nav.setRoot(AddVisitorPage);
      }

    });
    // console.log('...........mobile..................' ,mobile);
  }


  itemTapped(event, item) {
    let visitor = this.getVisitorByMobile(item.phone);
    console.log(' itemTapped home...............\n', visitor);
    if (visitor) {
      this.navCtrl.setRoot(VisitorDetailsPage, { userProfile: visitor });
    } else {
      alert('........visitor Details Not Found....');
    }
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.allVisitors = this.backupAllVisitor;

    // set val to the value of the searchbar
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.allVisitors = this.allVisitors.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.check_in.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.phone.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
