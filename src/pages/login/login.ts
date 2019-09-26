import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string;
  password:string;
  constructor(public nav: NavController, public platform: Platform, private AuthenticationProvider:AuthenticationProvider) {
  }

  login(){
      // this.AuthenticationProvider.login(this.username, this.password).subscribe(
      //      data => {      
      //        //Navigate to home page              
      //         this.nav.setRoot(HomePage);
      //      }
      //   )
      this.nav.setRoot(HomePage);
     }
}
