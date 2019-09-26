import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocietyApiProvider } from '../../providers/society-api/society-api';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import {URL} from '../constant'
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  getSocietyContact:any;
  defaultImage = '../../assets/imgs/profile.png';

  constructor(private httpservice: HttpServiceProvider, public navCtrl: NavController, 
    public navParams: NavParams, private societyApiProvider:SocietyApiProvider) {
    this.getContactDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  getContactDetails(){
    let requestUrl =`${URL}apihost/all_departments`;
    this.httpservice.get_Data(requestUrl, true).subscribe(data => {
      this.getSocietyContact = data[0].list;
      console.log( this.getSocietyContact ,'\n...........getContactDetails called..................', data);
     
    });
  }

}
